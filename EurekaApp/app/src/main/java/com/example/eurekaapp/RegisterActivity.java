package com.example.eurekaapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class RegisterActivity extends AppCompatActivity {

    SharedPreferences sp;

    TextView tvLoginHere;
    EditText etFirstName, etLastName, etRegisterEmail, etNumber, etRegisterPassword;
    CheckBox chkObservation, chkPositive;
    Button btnRegister;

    final String loginURL = "http://128.199.175.144:1337/auth/local/register";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        sp = getSharedPreferences("eureka", MODE_PRIVATE);

        etFirstName = (EditText) findViewById(R.id.firstNameField);
        etLastName = (EditText) findViewById(R.id.lastNameField);
        etRegisterEmail = (EditText) findViewById(R.id.registerEmailField);
        etNumber = (EditText) findViewById(R.id.numberField);
        etRegisterPassword = (EditText) findViewById(R.id.registerPasswordField);
        chkObservation = (CheckBox) findViewById(R.id.observationField);
        chkPositive = (CheckBox) findViewById(R.id.positiveCheck);
        btnRegister = (Button) findViewById(R.id.registerButton);
        tvLoginHere = (TextView) findViewById(R.id.loginHereButton);

        tvLoginHere.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent i = new Intent(RegisterActivity.this, LoginActivity.class);
                startActivity(i);
                finish();
            }
        });

//        Register handle
        btnRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Get register credentials
                String firstName = etFirstName.getText().toString();
                String lastName = etLastName.getText().toString();
                String email = etRegisterEmail.getText().toString();
                Integer phoneNo = Integer.parseInt(etNumber.getText().toString());
                String password = etRegisterPassword.getText().toString();
                Boolean isUnderObservation = chkObservation.isChecked();
                Boolean isCovidPositive = chkPositive.isChecked();

                // Instantiate the RequestQueue.
                RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
                JSONObject object = new JSONObject();
                try {
                    // input API parameters
                    object.put("username",email);
                    object.put("email",email);
                    object.put("password",password);
                    object.put("firstName",firstName);
                    object.put("lastName",lastName);
                    object.put("phoneNo",phoneNo);
                    object.put("underObservation",isUnderObservation);
                    object.put("isCovidPositive",isCovidPositive);
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
                                    String email = (String) user.get("email");
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
                                    Intent i = new Intent(RegisterActivity.this, MainActivity.class);
                                    startActivity(i);
                                    finish();
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            }
                        }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(RegisterActivity.this, "Invalid attempt. Try again", Toast.LENGTH_SHORT).show();
                    }
                });
                // Add the request to the RequestQueue.
                requestQueue.add(jsonObjectRequest);
            }
        });
    }
}
