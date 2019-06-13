package com.forum.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.forum.dao.ReplyDao;
import com.forum.dao.UserDao;
import com.forum.util.JDBCUtil;
import com.google.gson.JsonObject;

public class ReplyDaoImpl implements ReplyDao {

	@Override
	public int getReplyID(String account, int postID) {
		// TODO Auto-generated method stub
		int replyID = 0;
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = JDBCUtil.getConn();
			String sql = "select * from replyList where account = ? and postID = ?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, account);
			ps.setInt(2, postID);
			rs = ps.executeQuery();
			while(rs.next()) {
				if(rs.isLast()) {
					replyID = rs.getInt("replyID")+1;
				}
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			JDBCUtil.release(conn, ps, rs);
		}
		return replyID;
	}

	@Override
	public Boolean saveReply(String account, int postID, int replyID, String context, String time, String owner) {
		// TODO Auto-generated method stub
		Boolean flag = false;
		Connection conn = null;
		PreparedStatement ps = null;
		try {
			conn = JDBCUtil.getConn();
			String sql = "insert into replyList(account,postID,replyID,context,time,owner) values(?,?,?,?,?,?);";
			ps = conn.prepareStatement(sql);
			ps.setString(1, account);
			ps.setInt(2, postID);
			ps.setInt(3, replyID);
			ps.setString(4, context);
			ps.setString(5, time);
			ps.setString(6, owner);
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
	
	public String getReplyList(String account,int postID) {
		UserDao userDao = new UserDaoImpl();
		String msg = "[";
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = JDBCUtil.getConn();
			String sql = "select * from replyList where account = ? and postID = ? order by replyID";
			ps = conn.prepareStatement(sql);
			ps.setString(1, account);
			ps.setInt(2, postID);
			rs = ps.executeQuery();
			while(rs.next()) {
				JsonObject reply = new JsonObject();
				String owner = rs.getString("owner");
				String userName = userDao.getName(owner);
				String imgpath = userDao.getImg(owner);
				reply.addProperty("replyID", rs.getInt("replyID"));
				reply.addProperty("owner", owner);
				reply.addProperty("userName", userName);
				reply.addProperty("imgpath", imgpath);
				reply.addProperty("context", rs.getString("context"));
				reply.addProperty("time", rs.getString("time"));
				if(rs.isLast()) {
					msg = msg+reply.toString();
				}
				else {
					msg = msg+reply.toString()+",";
				}
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			JDBCUtil.release(conn, ps, rs);
		}
		msg = msg+"]";
		return msg.toString();
	}
	
	public String getMyReply(String account) {
		UserDao userDao = new UserDaoImpl();
		String msg = "[";
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = JDBCUtil.getConn();
			String sql = "select * from replyList where account = ? order by time desc";
			ps = conn.prepareStatement(sql);
			ps.setString(1, account);
			rs = ps.executeQuery();
			while(rs.next()) {
				JsonObject reply = new JsonObject();
				String owner = rs.getString("owner");
				String userName = userDao.getName(owner);
				String imgpath = userDao.getImg(owner);
				reply.addProperty("replyID", rs.getInt("replyID"));
				reply.addProperty("owner", owner);
				reply.addProperty("userName", userName);
				reply.addProperty("postID", rs.getString("postID"));
				reply.addProperty("imgpath", imgpath);
				reply.addProperty("context", rs.getString("context"));
				reply.addProperty("time", rs.getString("time"));
				if(rs.isLast()) {
					msg = msg+reply.toString();
				}
				else {
					msg = msg+reply.toString()+",";
				}
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			JDBCUtil.release(conn, ps, rs);
		}
		msg = msg+"]";
		return msg.toString();
	}
	
	public int getReplyNum(String account,int postID) {
		int num = 0;
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = JDBCUtil.getConn();
			String sql = "select * from replyList where account = ? and postID = ? order by replyID";
			ps = conn.prepareStatement(sql);
			ps.setString(1, account);
			ps.setInt(2, postID);
			rs = ps.executeQuery();
			rs.last();
			num = rs.getRow();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			JDBCUtil.release(conn, ps, rs);
		}
		return num;
	}

}
