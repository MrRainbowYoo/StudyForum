package com.forum.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.forum.dao.UserDao;
import com.forum.util.JDBCUtil;
import com.google.gson.JsonObject;

public class UserDaoImpl implements UserDao {

	@Override
	public String login(String account,String password) {
		// TODO Auto-generated method stub
		JsonObject msg = new JsonObject();
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = JDBCUtil.getConn();
			String sql = "select * from user where account = ? and password = ?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, account);
			ps.setString(2, password);
			rs = ps.executeQuery();
			if(rs.next()) {
				msg.addProperty("userName", rs.getString("userName"));
				msg.addProperty("imgpath", "http://120.79.15.252/"+rs.getString("imgpath"));
				
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			JDBCUtil.release(conn, ps, rs);
		}
		return msg.toString();
	}
	
	@Override
	public String regist(String account,String password) {
		String msg = "-1";
		String userName = "user_"+account;
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		if(account!=null&&password!=null)
		{
			try {
				
				conn = JDBCUtil.getConn();
				String sql = "select * from user where account = ?";
				ps = conn.prepareStatement(sql);
				ps.setString(1, account);
				rs = ps.executeQuery();
				if(rs.next()) {
					msg="0";
				}
				else {
					sql = "insert into user(account,userName,password,imgpath) values(?,?,?,?);";
					ps = conn.prepareStatement(sql);
					ps.setString(1, account);
					ps.setString(2, userName);
					ps.setString(3, password);
					ps.setString(4, "img/default/default.png");
					
					ps.executeUpdate();
					msg="1";
				}
				ps.close();
				conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}finally {
				JDBCUtil.release(conn, ps, rs);
			}
		}
		return msg;
	}
	
	public String getName(String account) {
		String userName = "";
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = JDBCUtil.getConn();
			String sql = "select * from user where account = ?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, account);
			rs = ps.executeQuery();
			if(rs.next()) {
				userName = rs.getString("userName");
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			JDBCUtil.release(conn, ps, rs);
		}
		return userName;
	}

	public String getImg(String account) {
		String imgpath = "";
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = JDBCUtil.getConn();
			String sql = "select * from user where account = ?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, account);
			rs = ps.executeQuery();
			if(rs.next()) {
				imgpath = "http://120.79.15.252/"+rs.getString("imgpath");
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			JDBCUtil.release(conn, ps, rs);
		}
		return imgpath;
	}
	
	public String UpdateName(String account,String userName) {
		String msg = "-1";
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = JDBCUtil.getConn();
			String sql = "update user set userName = ? where account = ?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, userName);
			ps.setString(2, account);
			ps.executeUpdate();
			msg = "1";
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			JDBCUtil.release(conn, ps);
		}
		return msg;
	}
	
	public String UpdatePassword(String account,String OldPassword,String NewPassword){
		String msg = "-1";
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = JDBCUtil.getConn();
			
			String sql = "select * from user where account = ? and password = ?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, account);
			ps.setString(2, OldPassword);
			rs = ps.executeQuery();
			if(rs.next()) {
				conn = JDBCUtil.getConn();
				sql = "update user set password = ? where account = ?";
				ps = conn.prepareStatement(sql);
				ps.setString(1, NewPassword);
				ps.setString(2, account);
				ps.executeUpdate();
				msg = "1";
			}
			else {
				msg = "0";
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			JDBCUtil.release(conn, ps, rs);
		}
		return msg;
	}
	
	public String UpdateImg(String account,String imgpath) {
		String msg = "-1";
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = JDBCUtil.getConn();
			String sql = "update user set imgpath = ? where account = ?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, imgpath);
			ps.setString(2, account);
			ps.executeUpdate();
			msg ="http://120.79.15.252/"+imgpath;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			JDBCUtil.release(conn, ps);
		}
		return msg;
	}
	
}
