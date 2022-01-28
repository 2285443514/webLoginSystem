package com.zxy.webfinal.service;

import com.zxy.webfinal.entity.User;

import java.sql.*;
import java.util.ArrayList;

public class UserDataService {
    public static final String DRIVER = "oracle.jdbc.OracleDriver";
    public static final String URL = "jdbc:oracle:thin:@localhost:1521:orcl";
    public static final String USERNAME = "system";
    public static final String PASSWORD = "123456";

    static {
        try {
            Class.forName(DRIVER);
        } catch (ClassNotFoundException e) {
            System.err.println("加载数据库失败！");
        }
    }

    public static Connection getConnection() {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
        } catch (SQLException e) {
            System.err.println("获取数据库连接失败！" + e.getMessage());
        }
        return conn;
    }

    public static void close(Connection conn, Statement stmt, ResultSet rs) {
        try {
            if (rs != null) {
                rs.close();
            }

            if (stmt != null) {
                stmt.close();
            }

            if (conn != null) {
                conn.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void addUser(String mail, String password) throws SQLException {
        Connection connection = getConnection();
        String sql = "insert into WEBUSERS values (SEQ_USER.nextval,?,?)";
        PreparedStatement statement = connection.prepareStatement(sql);
        statement.setString(1, mail);
        statement.setString(2, password);
        statement.executeUpdate();
        close(connection, statement, null);
    }

    public static void changeUser(String mail, String newMail, String password) throws SQLException {
        Connection connection = getConnection();
        String sql = "update WEBUSERS set MAIL=?,PASSWORD=? where MAIL=?";
        PreparedStatement statement = connection.prepareStatement(sql);
        statement.setString(1, newMail);
        statement.setString(2, password);
        statement.setString(3, mail);
        statement.executeUpdate();
        close(connection, statement, null);
    }

    public static void changeAdmin(String mail, String newMail, String password) throws SQLException {
        Connection connection = getConnection();
        String sql = "update WEBADMIN set MAIL=?,PASSWORD=? where MAIL=?";
        PreparedStatement statement = connection.prepareStatement(sql);
        statement.setString(1, newMail);
        statement.setString(2, password);
        statement.setString(3, mail);
        statement.executeUpdate();
        close(connection, statement, null);
    }

    public static void deleteUser(String mail) throws SQLException {
        Connection connection = getConnection();
        String sql = "delete from WEBUSERS where MAIL=?";
        PreparedStatement statement = connection.prepareStatement(sql);
        statement.setString(1, mail);
        statement.executeUpdate();
        close(connection, statement, null);
    }

    public static ArrayList<User> allUser() throws SQLException {
        Connection connection = getConnection();
        String sql = "select * from WEBUSERS order by ID";
        PreparedStatement statement = connection.prepareStatement(sql);
        ResultSet resultSet = statement.executeQuery(sql);
        ArrayList<User> users = new ArrayList<>();
        while (resultSet.next()) {
            int id = resultSet.getInt(1);
            String mail = resultSet.getString(2);
            String password = resultSet.getString(3);
            User user = new User(id, mail, password);
            users.add(user);
        }
        return users;
    }


    // 查询用户，返回0代表邮箱不存在，返回1代表存在但密码错误，返回2代表密码正确。
    public static int queryUser(String mail, String password) throws SQLException {
        Connection connection = getConnection();
        String sql = "select * from WEBUSERS where MAIL=?";
        PreparedStatement statement = connection.prepareStatement(sql);
        statement.setString(1, mail);
        ResultSet resultSet = statement.executeQuery();
        if (resultSet.next()) {
            String rPassword = resultSet.getString(3);
            close(connection, statement, resultSet);
            if (rPassword.equals(password)) {
                return 2;
            } else {
                return 1;
            }
        } else {
            close(connection, statement, resultSet);
            return 0;
        }
    }

    public static int queryAdmin(String mail, String password) throws SQLException {
        Connection connection = getConnection();
        String sql = "select * from WEBADMIN where MAIL=?";
        PreparedStatement statement = connection.prepareStatement(sql);
        statement.setString(1, mail);
        ResultSet resultSet = statement.executeQuery();
        if (resultSet.next()) {
            String rPassword = resultSet.getString(3);
            close(connection, statement, resultSet);
            if (rPassword.equals(password)) {
                return 2;
            } else {
                return 1;
            }
        } else {
            close(connection, statement, resultSet);
            return 0;
        }
    }
}

