package com.forum.servlet;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Enumeration;

import javax.security.auth.login.AccountException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.forum.dao.UserDao;
import com.forum.dao.impl.UserDaoImpl;
import com.google.gson.*;
import com.sun.accessibility.internal.resources.accessibility;
import com.sun.swing.internal.plaf.basic.resources.basic;

/**
 * Servlet implementation class RegistServlet
 */
@WebServlet("/Regist")
public class RegistServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RegistServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		
		response.setContentType("text/html;charset=utf-8");
        response.addHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "x-requested-with");
        response.addHeader("Access-Control-Max-Age", "1800");//30 min
		
//		String account = request.getParameter("account");
//		String password = request.getParameter("pwd");
//		Enumeration<String> names = request.getParameterNames();
//		while(names.hasMoreElements()) {
//			String name = (String)names.nextElement();
//			String value = request.getParameter(name);
//			System.out.println(name+"="+value);
//		}
        try {
        	InputStreamReader insr = new InputStreamReader(request.getInputStream(),"utf-8");
    		//读取服务器的响应内容并显示
    		String result = "";
    		int respInt = insr.read();
    		while(respInt != -1){
    			result += (char)respInt;
    			respInt = insr.read();
    		}
    		JsonParser parser = new JsonParser();
    		JsonObject jo = parser.parse(result).getAsJsonObject();
    		String account = jo.get("account").getAsString();
    		String password = jo.get("pwd").getAsString();
    		
    		UserDao dao = new UserDaoImpl();
    		String res = dao.regist(account,password);
    		response.getWriter().write(res);
		} catch (Exception e) {
			// TODO: handle exception
			response.getWriter().write("-1");
		}
        
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
