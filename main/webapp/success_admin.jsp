<%@ page import="java.util.ArrayList" %>
<%@ page import="com.zxy.webfinal.entity.User" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <title>登陆成功</title>
    <link rel="stylesheet" type="text/css" href="static/css/body.css">
    <link rel="stylesheet" type="text/css" href="static/css/success.css">
    <link rel="shortcut icon" href="static/images/favicon.ico" type="image/x-icon"/>
    <script src="static/js/user.js"></script>
</head>

<body>
<div class="operate">
    <div class="info"><span>管理员登录成功</span><br/><span id="mail">${sessionScope.user.mail}</span></div>
    <div class="options">
        <div class="option">修改密码</div>
        <div class="option admin">管理用户</div>
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
<div class="admin-user">
    <div class="toolbar">
        <div class="close">×</div>
    </div>
    <div class="table">
        <table>
            <tr>
                <th>用户id</th>
                <th>邮箱</th>
                <th>密码</th>
                <th>操作</th>
            </tr>
            <%
                ArrayList<User> users = (ArrayList<User>) session.getAttribute("users");
                for (User user : users) {
            %>
            <tr>
                <td><%=user.getId()%>
                </td>
                <td><%=user.getMail()%>
                </td>
                <td><%=user.getPassword()%>
                </td>
                <td>
                    <button class=".change-user" onclick=changeUser("<%=user.getMail()%>","<%=user.getPassword()%>")>修改
                    </button>
                    <button class=".delete-user" onclick=deleteUser("<%=user.getMail()%>")>删除
                    </button>
                </td>
            </tr>
            <%
                }
            %>
        </table>
    </div>
    <button class="add" onclick="addUser()">添加用户</button>
</div>
<div class="user change-user">
    <div class="toolbar">
        <div class="close">×</div>
    </div>
    <form method="post" action="changeServlet" id="changeForm">
        <input type="text" name="mail" placeholder="邮箱">
        <input type="text" name="password" placeholder="密码">
        <span class="error"></span>
        <input type="button" value="确定" class="change-submit">
    </form>
</div>
<div class="user add-user">
    <div class="toolbar">
        <div class="close">×</div>
    </div>
    <form method="post" action="addServlet" id="addForm">
        <input type="text" name="mail" placeholder="邮箱">
        <input type="text" name="password" placeholder="密码">
        <span class="error"></span>
        <input type="button" value="确定" class="add-submit">
    </form>
</div>
<script src="static/js/success_admin.js"></script>
</body>

</html>