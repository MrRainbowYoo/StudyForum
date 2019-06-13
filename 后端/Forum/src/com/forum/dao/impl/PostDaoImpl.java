package com.forum.dao.impl;

import com.forum.dao.PostDao;
import com.forum.dao.ReplyDao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.forum.dao.UserDao;
import com.forum.servlet.AddVisitServlet;
import com.forum.util.JDBCUtil;
import com.google.gson.JsonObject;
import com.sun.javafx.scene.paint.GradientUtils.Parser;

import javafx.beans.binding.IntegerBinding;

public class PostDaoImpl implements PostDao {
	public int getPostID(String account){
		int PostID = 0;
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = JDBCUtil.getConn();
			String sql = "select * from postList where account = ?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, account);
			rs = ps.executeQuery();
			while(rs.next()) {
				if(rs.isLast()) {
					PostID = rs.getInt("postID")+1;
				}
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			JDBCUtil.release(conn, ps, rs);
		}
		return PostID;
	}
	
	public Boolean savePost(String account,int postID,String title,String context,String topic,String time){
		Boolean flag = false;
		Connection conn = null;
		PreparedStatement ps = null;
		try {
			conn = JDBCUtil.getConn();
			String sql = "insert into postList(account,postID,title,context,topic,dlike,dnlike,visit,time) values(?,?,?,?,?,?,?,?,?);";
			ps = conn.prepareStatement(sql);
			ps.setString(1, account);
			ps.setInt(2, postID);
			ps.setString(3, title);
			ps.setString(4, context);
			ps.setString(5, topic);
			ps.setInt(6, 0);
			ps.setInt(7, 0);
			ps.setInt(8, 0);
			ps.setString(9, time);
			ps.executeUpdate();
			flag = true;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			JDBCUtil.release(conn, ps);
		}
		return flag;
	}
	
	public String getPostList() {
		UserDao userDao = new UserDaoImpl();
		ReplyDao replyDao = new ReplyDaoImpl();
		String msg = "[";
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = JDBCUtil.getConn();
			String sql = "select * from postList order by time desc";
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			while(rs.next()) {
				JsonObject post = new JsonObject();
				String account = rs.getString("account");
				String userName = userDao.getName(account);
				String imgpath = userDao.getImg(account);
				int postID = rs.getInt("postID");
				int replyNum = replyDao.getReplyNum(account, postID);
				post.addProperty("account", account);
				post.addProperty("userName", userName);
				post.addProperty("imgpath", imgpath);
				post.addProperty("postID", postID);
				post.addProperty("replyNum", replyNum);
				post.addProperty("topic", rs.getString("topic"));
				post.addProperty("context", rs.getString("context"));
				post.addProperty("time", rs.getString("time"));
				post.addProperty("title", rs.getString("title"));
				post.addProperty("dlike", rs.getInt("dlike"));
				post.addProperty("dnlike", rs.getInt("dnlike"));
				post.addProperty("visit", rs.getInt("visit"));
				if(rs.isLast()) {
					msg = msg+post.toString();
				}
				else {
					msg = msg+post.toString()+",";
				}
				
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			JDBCUtil.release(conn, ps, rs);
		}
		msg = msg+"]";
		return msg;
	}

	@Override
	public String getPost(int postID, String account) {
		UserDao userDao = new UserDaoImpl();
		JsonObject msg = new JsonObject();
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = JDBCUtil.getConn();
			String sql = "select * from postList where account = ? and postID = ? order by postID desc";
			ps = conn.prepareStatement(sql);
			ps.setString(1, account);
			ps.setInt(2, postID);
			rs = ps.executeQuery();
			if(rs.next()) {
				String userName = userDao.getName(account);
				String imgpath = userDao.getImg(account);
				msg.addProperty("userName", userName);
				msg.addProperty("imgpath", imgpath);
				msg.addProperty("topic", rs.getString("topic"));
				msg.addProperty("context", rs.getString("context"));
				msg.addProperty("time", rs.getString("time"));
				msg.addProperty("title", rs.getString("title"));
				msg.addProperty("dlike", rs.getInt("dlike"));
				msg.addProperty("dnlike", rs.getInt("dnlike"));
				msg.addProperty("visit", rs.getInt("visit"));
				
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			JDBCUtil.release(conn, ps, rs);
		}
		return msg.toString();
	}
	
	public String getMyPost(String account) {
		UserDao userDao = new UserDaoImpl();
		String msg = "[";
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = JDBCUtil.getConn();
			String sql = "select * from postList where account = ?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, account);
			rs = ps.executeQuery();
			while(rs.next()) {
				JsonObject post = new JsonObject();
				String userName = userDao.getName(account);
				String imgpath = userDao.getImg(account);
				post.addProperty("account", account);
				post.addProperty("userName", userName);
				post.addProperty("imgpath", imgpath);
				post.addProperty("postID", rs.getInt("postID"));
				post.addProperty("topic", rs.getString("topic"));
				post.addProperty("context", rs.getString("context"));
				post.addProperty("time", rs.getString("time"));
				post.addProperty("title", rs.getString("title"));
				post.addProperty("dlike", rs.getInt("dlike"));
				post.addProperty("dnlike", rs.getInt("dnlike"));
				post.addProperty("visit", rs.getInt("visit"));
				if(rs.isLast()) {
					msg = msg+post.toString();
				}
				else {
					msg = msg+post.toString()+",";
				}
				
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			JDBCUtil.release(conn, ps, rs);
		}
		msg = msg+"]";
		return msg;
	}
	
	public void addVisit(String account,int postID) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = JDBCUtil.getConn();
			String sql = "select * from postList where account = ? and postID = ?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, account);
			ps.setInt(2, postID);
			rs = ps.executeQuery();
			if(rs.next()) {
				int visit = rs.getInt("visit")+1;
				sql = "update postList set visit = ? where account = ? and postID = ?";
				ps = conn.prepareStatement(sql);
				ps.setInt(1, visit);
				ps.setString(2, account);
				ps.setInt(3, postID);
				ps.executeUpdate();
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			JDBCUtil.release(conn, ps);
		}
	}
	
	public int addLike(String account,int postID) {
		int dlike = 0;
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = JDBCUtil.getConn();
			String sql = "select * from postList where account = ? and postID = ?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, account);
			ps.setInt(2, postID);
			rs = ps.executeQuery();
			if(rs.next()) {
				dlike = rs.getInt("dlike")+1;
				sql = "update postList set dlike = ? where account = ? and postID = ?";
				ps = conn.prepareStatement(sql);
				ps.setInt(1, dlike);
				ps.setString(2, account);
				ps.setInt(3, postID);
				ps.executeUpdate();
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			JDBCUtil.release(conn, ps);
		}
		return dlike;
	}
	
}
