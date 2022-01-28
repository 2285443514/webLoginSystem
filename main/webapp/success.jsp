<%@ page contentType="text/html;charset=UTF-8" %>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <title>登陆成功</title>
    <link rel="stylesheet" type="text/css" href="static/css/body.css">
    <link rel="stylesheet" type="text/css" href="static/css/success.css">
    <link rel="shortcut icon" href="static/images/favicon.ico" type="image/x-icon"/>
    <script src="static/js/user.js"></script>
    <style>
        @keyframes big {
            0% {
                transform: translateX(-40vw) translateY(-3vh) scale(0.1);
                opacity: .5;
            }
            100% {
                transform: none;
                opacity: 1;
            }
        }

        @keyframes small {
            0% {
                transform: none;
                opacity: 1;
            }
            100% {
                transform: translateX(-40vw) translateY(-3vh) scale(0.1);
                opacity: 0;
            }
        }
    </style>
</head>

<body>
<div class="operate">
    <div class="info"><span>用户登陆成功</span><br/><span id="mail">${sessionScope.user.mail}</span></div>
    <div class="options">
        <div class="option">修改密码</div>
        <a href="logoutServlet">
            <div class="option">退出登录</div>
        </a>
    </div>
</div>
<div class="change-password">
    <div class="toolbar">
        <div class="close">×</div>
    </div>
    <form method="post" action="changePasswordServlet" id="changePasswordForm">
        <input type="password" name="old" placeholder="原密码">
        <input type="password" name="new" placeholder="新密码">
        <input type="password" name="confirm" placeholder="确认密码">
        <span class="error"> </span>
        <input type="button" value="提交" class="password-submit">
    </form>
</div>
<script src="static/js/success.js"></script>
</body>

</html>