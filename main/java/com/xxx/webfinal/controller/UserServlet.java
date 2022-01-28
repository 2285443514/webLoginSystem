package com.zxy.webfinal.controller;

import com.zxy.webfinal.service.UserDataService;
import com.zxy.webfinal.util.MyMail;

import javax.mail.MessagingException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.sql.SQLException;
import java.util.Date;
import java.util.Random;

import static com.google.code.kaptcha.Constants.KAPTCHA_SESSION_KEY;

@WebServlet("/userServlet")
public class UserServlet extends BaseServlet {

    protected void checkPassword(HttpServletRequest request, HttpServletResponse response) throws IOException, SQLException {
        String CAPTCHA = (String) request.getSession().getAttribute(KAPTCHA_SESSION_KEY);
        request.getSession().removeAttribute(KAPTCHA_SESSION_KEY);

        if (CAPTCHA == null || !CAPTCHA.equalsIgnoreCase(data.getCAPTCHA())) {
            response.getWriter().write("-1");
        } else {
            String status = "0";
            status = String.valueOf(UserDataService.queryUser(data.getMail(), data.getPassword()));
            if (status.equals("0")) {
                status = String.valueOf(UserDataService.queryAdmin(data.getMail(), data.getPassword()));
            }
            response.getWriter().write(status);
        }
    }

    protected void makeCode(HttpServletRequest request, HttpServletResponse response) throws SQLException, MessagingException, GeneralSecurityException {
        Random rand = new Random();
        StringBuilder code;
        code = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            code.append(rand.nextInt(10));
        }

        MyMail.sendMail(data.getMail(), code.toString());
        request.getSession().setAttribute("code", code.toString());
        request.getSession().setAttribute("codeExpire", new Date().getTime());
    }

    protected void checkCode(HttpServletRequest request, HttpServletResponse response) throws IOException, SQLException {

        if (data.getCode().equals((String) request.getSession().getAttribute("code"))
                && new Date().getTime() - (Long) request.getSession().getAttribute("codeExpire") < 60000) {
            Date sysdate = new Date();
            if (sysdate.getTime() - (Long) request.getSession().getAttribute("codeExpire") < 60000) {
                int status = UserDataService.queryUser(data.getMail(), null);
                if (status == 0) {
                    UserDataService.addUser(data.getMail(), "123456"); //默认密码
                }
                response.getWriter().write("1");
                return;
            }
        }
        response.getWriter().write("0");
    }

    protected void register(HttpServletRequest request, HttpServletResponse response) throws IOException, SQLException {
        int status = UserDataService.queryUser(data.getMail(), data.getPassword());
        if (status == 0) {
            if (data.getCode().equals((String) request.getSession().getAttribute("code"))
                    && new Date().getTime() - (Long) request.getSession().getAttribute("codeExpire") < 60000) {
                UserDataService.addUser(data.getMail(), data.getPassword());
                response.getWriter().write("1");
            } else {
                response.getWriter().write("0");
            }
        } else {
            response.getWriter().write("2");
        }
    }

    protected void forget(HttpServletRequest request, HttpServletResponse response) throws IOException, SQLException {
        int status = UserDataService.queryUser(data.getMail(), data.getPassword());
        if (status > 0) {
            if (data.getCode().equals((String) request.getSession().getAttribute("code"))
                    && new Date().getTime() - (Long) request.getSession().getAttribute("codeExpire") < 60000) {
                UserDataService.changeUser(data.getMail(), data.getMail(), data.getPassword());
                response.getWriter().write("1");
            } else {
                response.getWriter().write("0");
            }
        } else {
            response.getWriter().write("2");
        }
    }
}