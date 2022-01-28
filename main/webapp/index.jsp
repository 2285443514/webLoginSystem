<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html lang="zh-cn">

<head>
    <title>登录界面</title>
    <link rel="stylesheet" type="text/css" href="static/css/body.css">
    <link rel="stylesheet" type="text/css" href="static/css/main.css">
    <link rel="shortcut icon" href="static/images/favicon.ico" type="image/x-icon"/>
    <script src="static/js/user.js"></script>
</head>

<body>
<div class="logo">
    <div class="img"></div>
</div>
<div class="frame">
    <div class="login-wrapper">
        <div class="login">
            <div class="wrapper">
                <div class="change-wrapper">
                    <div class="change">
                        <div class="change-password"></div>
                        密码登录
                    </div>
                    <div class="change">
                        <div class="change-code"></div>
                        验证码登录
                    </div>
                </div>
                <div class="field-wrapper">
                    <div class="field-scroll">
                        <form name="passwordForm" method="POST" action="loginServlet" id="passwordForm">
                            <div class="field">
                                <input type="text" name="mail" placeholder="邮箱">
                                <input type="password" name="password" placeholder="密码">
                                <input class="CAPTCHA" type="text" name="CAPTCHA" placeholder="验证码">
                                <img ID="CAPTCHA" src="kaptcha.jpg" alt="验证码">
                            </div>
                        </form>
                        <form name="codeForm" method="POST" action="loginServlet" id="codeForm">
                            <div class="field">
                                <input type="text" name="mail" placeholder="邮箱">
                                <input class="code" type="text" name="code" placeholder="验证码">
                                <div class="code-button">发送验证码</div>
                            </div>
                        </form>
                    </div>
                </div>
                <span class="error"></span>
                <a href="javascript:void(0)" class="password-submit">登录</a>
                <a href="javascript:void(0)" class="code-submit">登录/注册</a>
                <div class="gray-button register-button">注册</div>
                <div class="gray-button forget-button">忘记密码</div>
            </div>
        </div>
    </div>
    <div class="change-line"></div>
    <div class="register-wrapper">
        <div class="register">
            <div class="wrapper">
                <div class="field-wrapper">
                    <form name="registerForm" method="POST" action="loginServlet" id="registerForm">
                        <div class="field">
                            <input type="text" name="mail" placeholder="邮箱">
                            <input class="code" type="text" name="code" placeholder="验证码">
                            <div class="code-button">发送验证码</div>
                            <input type="password" name="password" placeholder="密码">
                            <input type="password" name="confirm" placeholder="确认密码">
                        </div>
                    </form>
                </div>
                <span class="error"></span>
                <a href="javascript:void(0)" class="register-submit">注册</a>
                <div class="gray-button return-button">返回</div>
            </div>
        </div>
    </div>
    <div class="register-wrapper forget-wrapper">
        <div class="register forget">
            <div class="wrapper">
                <div class="field-wrapper">
                    <form name="forgetForm" method="POST" action="loginServlet" id="forgetForm">
                        <div class="field">
                            <input type="text" name="mail" placeholder="邮箱">
                            <input class="code" type="text" name="code" placeholder="验证码">
                            <div class="code-button">发送验证码</div>
                            <input type="password" name="password" placeholder="新密码">
                            <input type="password" name="confirm" placeholder="确认密码">
                        </div>
                    </form>
                </div>
                <span class="error"></span>
                <a href="javascript:void(0)" class="forget-submit">确定</a>
                <div class="gray-button return-button">返回</div>
            </div>
        </div>
    </div>
</div>
<div class="loading-wrapper">
    <div class="loading">
        <span>Loading<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></span>
        <div class="base">
            <div class="cube"></div>
            <div class="cube"></div>
            <div class="cube"></div>
            <div class="cube"></div>
            <div class="cube"></div>
            <div class="cube"></div>
            <div class="cube"></div>
            <div class="cube"></div>
            <div class="cube"></div>
        </div>
    </div>
</div>
<div class="wrong-wrapper">
    <div class="wrong">
        <div class="line1-wrapper">
            <div class="line1"></div>
        </div>
        <div class="line2-wrapper">
            <div class="line2"></div>
        </div>
    </div>
</div>
<div class="correct-wrapper">
    <div class="correct">
        <div class="line1-wrapper">
            <div class="line1"></div>
        </div>
        <div class="line2-wrapper">
            <div class="line2"></div>
        </div>
    </div>
</div>
<div class="banner-wrapper">
    <div class="banner">
        <div class="img" style="background: linear-gradient(90deg, #ff0000, #a50000) "></div>
        <div class="img big" style="background: linear-gradient(90deg, #ffff00, #ffa500) "></div>
        <div class="img" style="background: linear-gradient(90deg, #00ff00, #00a500) "></div>
        <div class="img" style="background: linear-gradient(90deg, #00ffff, #00a5ff) "></div>
        <div class="img" style="background: linear-gradient(90deg, #0000ff, #0000a5) "></div>
        <div class="img" style="background: linear-gradient(90deg, #ff00ff, #a500ff) "></div>
    </div>
</div>
<script src="static/js/login.js"></script>
<script src="static/js/banner.js"></script>
</body>

</html>