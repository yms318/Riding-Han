package com.tis.chat.model;

import lombok.Data;

@Data
public class ChatVO {
	private Integer chat_no;
	private String chat_title;
	private String chat_text;
	private java.sql.Date chat_wtime;
	private String chat_img;
	private Integer chat_user_no;
	private String room_code;
	private String chat_info;
	
	private String nickName;
	private String user_img;
	public Integer getChat_no() {
		return chat_no;
	}
	public void setChat_no(Integer chat_no) {
		this.chat_no = chat_no;
	}
	public String getChat_title() {
		return chat_title;
	}
	public void setChat_title(String chat_title) {
		this.chat_title = chat_title;
	}
	public String getChat_text() {
		return chat_text;
	}
	public void setChat_text(String chat_text) {
		this.chat_text = chat_text;
	}
	public java.sql.Date getChat_wtime() {
		return chat_wtime;
	}
	public void setChat_wtime(java.sql.Date chat_wtime) {
		this.chat_wtime = chat_wtime;
	}
	public String getChat_img() {
		return chat_img;
	}
	public void setChat_img(String chat_img) {
		this.chat_img = chat_img;
	}
	public Integer getChat_user_no() {
		return chat_user_no;
	}
	public void setChat_user_no(Integer chat_user_no) {
		this.chat_user_no = chat_user_no;
	}
	public String getRoom_code() {
		return room_code;
	}
	public void setRoom_code(String room_code) {
		this.room_code = room_code;
	}
	public String getChat_info() {
		return chat_info;
	}
	public void setChat_info(String chat_info) {
		this.chat_info = chat_info;
	}
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public String getUser_img() {
		return user_img;
	}
	public void setUser_img(String user_img) {
		this.user_img = user_img;
	}
	
	
}
