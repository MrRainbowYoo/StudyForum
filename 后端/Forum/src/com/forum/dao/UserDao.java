package com.forum.dao;

//用户表访问

public interface UserDao {
	String login(String account,String password);
	
	String regist(String account,String password);
	
	String getName(String account);
	String getImg(String account);
	String UpdateName(String account,String userName);
	String UpdatePassword(String account,String OldPassword,String NewPassword);
	String UpdateImg(String account,String imgpath);
}
