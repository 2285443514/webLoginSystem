package com.zxy.webfinal.controller;

import com.google.gson.Gson;
import com.zxy.webfinal.entity.Data;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.lang.reflect.Method;

abstract class BaseServlet extends HttpServlet {
    protected String json;
    protected Gson gson;
    protected Data data;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html; charset=UTF-8");

        json = readJSONData(request);
        //将json字符串转为java对象
        gson = new Gson();
        data = gson.fromJson(json, Data.class);
        try {
            Method method = this.getClass().getDeclaredMethod(data.getAction(), HttpServletRequest.class, HttpServletResponse.class);
            method.invoke(this, request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected String readJSONData(HttpServletRequest request) {
        StringBuilder json = new StringBuilder();
        String lineString = null;
        try {
            BufferedReader reader = request.getReader();
            while ((lineString = reader.readLine()) != null) {
                json.append(lineString);
            }
        } catch (Exception e) {
            System.out.println(e.toString());
        }
        return json.toString();
    }
}
