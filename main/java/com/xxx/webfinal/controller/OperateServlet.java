package com.zxy.webfinal.controller;

import com.zxy.webfinal.service.UserDataService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/operateServlet")
public class OperateServlet extends BaseServlet {

    protected void add(HttpServletRequest request, HttpServletResponse response) throws IOException, SQLException {
        int status = UserDataService.queryUser(data.getMail(), data.getPassword());
        if (status != 0) {
            response.getWriter().write("0");
        } else {
            UserDataService.addUser(data.getMail(), data.getPassword());
            response.getWriter().write("1");
        }
    }

    protected void change(HttpServletRequest request, HttpServletResponse response) throws IOException, SQLException {
        if (data.getMail().equals(data.getNewMail())) {
            UserDataService.changeUser(data.getMail(), data.getMail(), data.getPassword());
            response.getWriter().write("1");
        } else {
            int status = UserDataService.queryUser(data.getNewMail(), data.getPassword());
            if (status != 0) {
                response.getWriter().write("0");
            } else {
                UserDataService.changeUser(data.getMail(), data.getNewMail(), data.getPassword());
                response.getWriter().write("1");
            }
        }
    }

    protected void delete(HttpServletRequest request, HttpServletResponse response) throws IOException, SQLException {
        int status = UserDataService.queryUser(data.getMail(), null);
        if (status == 0) {
            response.getWriter().write("0");
        } else {
            UserDataService.deleteUser(data.getMail());
            response.getWriter().write("1");
        }
    }

    protected void changePassword(HttpServletRequest request, HttpServletResponse response) throws IOException, SQLException {
        if (UserDataService.queryUser(data.getMail(), data.getPassword()) == 2) {
            UserDataService.changeUser(data.getMail(), data.getMail(), data.getNewPassword());
            response.getWriter().write("1");
        } else if (UserDataService.queryAdmin(data.getMail(), data.getPassword()) == 2) {
            UserDataService.changeAdmin(data.getMail(), data.getMail(), data.getNewPassword());
            response.getWriter().write("1");
        } else {
            response.getWriter().write("0");
        }
    }
}