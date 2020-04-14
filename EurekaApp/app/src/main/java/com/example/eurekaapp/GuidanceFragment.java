package com.example.eurekaapp;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;

public class GuidanceFragment extends Fragment implements View.OnClickListener {

    Button button;
    SharedPreferences sp;
    String id;

    final String url = "http://128.199.175.144:1337/users";
    final String BUTTON_TXT_POSITIVE = "I HAVE NOT BEEN TESTED POSITIVE FOR COVID-19";
    final String BUTTON_TXT_NEGATIVE = "I HAVE BEEN TESTED POSITIVE FOR COVID-19";

    @Nullable
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        View rootView =inflater.inflate(R.layout.fragment_guidance, container, false);

        return inflater.inflate(R.layout.fragment_guidance,container,false);
    }

    @Override
    public void onActivityCreated(Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);

        button = (Button) getActivity().findViewById(R.id.guidanceButton);
        button.setOnClickListener(this);

        sp = this.getActivity().getSharedPreferences("eureka", Context.MODE_PRIVATE);
        id = sp.getString("id", "null");

        RequestQueue requestQueue = Volley.newRequestQueue(getActivity().getApplicationContext());
        JSONObject object = new JSONObject();
        try {
            // input API parameters
            object.put("","");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        // Request a JSON response from the provided URL
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, url+"/"+id, object,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            Boolean isUnderObservation = (Boolean) response.get("underObservation");
                            Boolean isCovidPositive = (Boolean) response.get("isCovidPositive");
                            if(isCovidPositive) {
                                button.setText(BUTTON_TXT_POSITIVE);
                            } else {
                                button.setText(BUTTON_TXT_NEGATIVE);
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getActivity(), "Invalid attempt. Try again", Toast.LENGTH_SHORT).show();
            }
        });
        // Add the request to the RequestQueue.
        requestQueue.add(jsonObjectRequest);

    }
    public void onClick(final View v) { //check for what button is pressed
        switch (v.getId()) {
            case R.id.guidanceButton:
                if(button.getText() == BUTTON_TXT_POSITIVE){
                    declareUserNegative();
                } else {
                    declareUserPositive();
                }
                break;
        }
    }

    private void declareUserPositive() {
        RequestQueue requestQueue = Volley.newRequestQueue(getActivity().getApplicationContext());

        JSONObject object = new JSONObject();
        try {
            // input API parameters
            object.put("underObservation","true");
            object.put("isCovidPositive","true");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        // Request a JSON response from the provided URL
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.PUT, url+"/"+id, object,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            button.setText(BUTTON_TXT_POSITIVE);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getActivity(), "Invalid attempt. Try again", Toast.LENGTH_SHORT).show();
            }
        });
        // Add the request to the RequestQueue.
        requestQueue.add(jsonObjectRequest);
    }

    private void declareUserNegative() {
        RequestQueue requestQueue = Volley.newRequestQueue(getActivity().getApplicationContext());

        JSONObject object = new JSONObject();
        try {
            // input API parameters
            object.put("isCovidPositive","false");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        // Request a JSON response from the provided URL
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.PUT, url+"/"+id, object,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            button.setText(BUTTON_TXT_NEGATIVE);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getActivity(), "Invalid attempt. Try again", Toast.LENGTH_SHORT).show();
            }
        });
        // Add the request to the RequestQueue.
        requestQueue.add(jsonObjectRequest);
    }
}
