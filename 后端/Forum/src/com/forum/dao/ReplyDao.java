package com.forum.dao;

public interface ReplyDao {
	int getReplyID(String account,int postID);
	Boolean saveReply(String account,int postID,int replyID,String context,String time,String owner);
	String getReplyList(String account,int postID);
	String getMyReply(String account);
	int getReplyNum(String account,int postID);
}
