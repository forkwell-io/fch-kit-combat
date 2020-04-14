package com.example.eurekaapp;

import androidx.appcompat.app.AppCompatActivity;
import okhttp3.FormBody;
import okhttp3.OkHttpClient;
//import okhttp3.Request;
import okhttp3.RequestBody;
//import okhttp3.Response;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.RequestQueue;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.JsonObject;
import com.koushikdutta.async.future.FutureCallback;
import com.koushikdutta.ion.Ion;

import org.json.JSONException;
import org.json.JSONObject;

public class LoginActivity extends AppCompatActivity {

    SharedPreferences sp;

    EditText etEmail, etPassword;
    TextView tvRegister;
    Button btnLogin;

    final String loginURL = "http://128.199.175.144:1337/auth/local";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        sp = getSharedPreferences("eureka", MODE_PRIVATE);

        etEmail = (EditText) findViewById(R.id.emailField);
        etPassword = (EditText) findViewById(R.id.passwordField);
        btnLogin = (Button) findViewById(R.id.loginButton);
        tvRegister = (TextView) findViewById(R.id.registerHereButton);

        tvRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent i = new Intent(LoginActivity.this, RegisterActivity.class);
                startActivity(i);
                finish();
            }
        });

//        Handle login
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
//                Get login credentials
                final String email = etEmail.getText().toString();
                String password = etPassword.getText().toString();

                // Instantiate the RequestQueue.
                RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
                JSONObject object = new JSONObject();
                try {
                    // input API parameters
                    object.put("identifier",email);
                    object.put("password",password);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                // Request a JSON response from the provided URL
                JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, loginURL, object,
                        new Response.Listener<JSONObject>() {
                            @Override
                            public void onResponse(JSONObject response) {
                                try {
                                    JSONObject user = (JSONObject) response.get("user");
                                    String id = (String) user.get("id");
                                    String firstName = (String) user.get("firstName");
                                    String lastName = (String) user.get("lastName");
                                    String phoneNo = (String) user.get("phoneNo");
                                    sp.edit().putString("id", id).apply();
                                    sp.edit().putString("firstName", firstName).apply();
                                    sp.edit().putString("lastName", lastName).apply();
                                    sp.edit().putString("email", email).apply();
                                    sp.edit().putString("phone", phoneNo).apply();
                                    sp.edit().putBoolean("logged",true).apply();
//                                    Redirect to MainActivity
                                    Intent i = new Intent(LoginActivity.this, MainActivity.class);
                                    startActivity(i);
                                    finish();
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            }
                        }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(LoginActivity.this, "Invalid attempt. Try again", Toast.LENGTH_SHORT).show();
                    }
                });
                // Add the request to the RequestQueue.
                requestQueue.add(jsonObjectRequest);
            }
        });
    }
}

