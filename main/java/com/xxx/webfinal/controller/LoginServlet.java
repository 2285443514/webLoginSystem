package com.zxy.webfinal.controller;

import com.zxy.webfinal.entity.User;
import com.zxy.webfinal.service.UserDataService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet("/loginServlet")
public class LoginServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.sendRedirect("index.jsp");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");

        User user = new User();
        user.setMail(request.getParameter("mail"));
        try {
            if (UserDataService.queryAdmin(user.getMail(), "123456") > 0) {
                ArrayList<User> users = UserDataService.allUser();
                request.getSession().setAttribute("user", user);
                request.getSession().setAttribute("users", users);
                request.getRequestDispatcher("success_admin.jsp").forward(request, response);
            } else if (UserDataService.queryUser(user.getMail(), "123456") > 0){
                request.getSession().setAttribute("user", user);
                request.getRequestDispatcher("success.jsp").forward(request, response);
            } else {
                response.sendRedirect("index.jsp");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}