package com.zxy.webfinal.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.Filter;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(urlPatterns = {"/success.jsp","/success_admin.jsp"},filterName = "myFilter")
public class MyFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        response.sendRedirect("index.jsp");
    }

}
