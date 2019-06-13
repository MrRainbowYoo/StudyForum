package com.forum.servlet;

import java.io.IOException;
import java.io.InputStreamReader;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.forum.dao.PostDao;
import com.forum.dao.impl.PostDaoImpl;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * Servlet implementation class GetPostServlet
 */
@WebServlet("/GetPost")
public class GetPostServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetPostServlet() {
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
    		int postID = jo.get("postID").getAsInt();
//    		context.replace("\"", "\\\"");
//    		context.replace("'", "\'");
    		PostDao postDao = new PostDaoImpl();
    		String res = postDao.getPost(postID,account);
    		System.out.println(res);
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
