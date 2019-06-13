package com.forum.dao;

public interface PostDao {
	int getPostID(String account);
	Boolean savePost(String account,int postID,String title,String context,String topic,String time);
	String getPostList();
	String getPost(int postID,String account);
	String getMyPost(String account);
	void addVisit(String account,int postID);
	int addLike(String account,int postID);
}
