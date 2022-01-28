package com.zxy.webfinal.entity;

public class Data {
    private int id;
    private String mail;
    private String password;
    private String code;
    private String newPassword;
    private String newMail;
    private String CAPTCHA;
    private String action;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getCAPTCHA() {
        return CAPTCHA;
    }

    public void setCAPTCHA(String CAPTCHA) {
        this.CAPTCHA = CAPTCHA;
    }

    public String getNewMail() {
        return newMail;
    }
    public void setNewMail(String newMail) {
        this.newMail = newMail;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }
}
