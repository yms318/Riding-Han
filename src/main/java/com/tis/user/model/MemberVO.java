package com.tis.user.model;

import java.io.Serializable;

import lombok.Data;

@Data
public class MemberVO implements Serializable {

	
	private int user_no;
	private String user_id;
	private String pwd;
	private String user_name;
	private String nickName;
	private int state;
	private java.sql.Timestamp joinDate;
	private String user_img;
	
	public int getUser_no() {
		return user_no;
	}
	public void setUser_no(int user_no) {
		this.user_no = user_no;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public java.sql.Timestamp getJoinDate() {
		return joinDate;
	}
	public void setJoinDate(java.sql.Timestamp joinDate) {
		this.joinDate = joinDate;
	}
	public String getUser_img() {
		return user_img;
	}
	public void setUser_img(String user_img) {
		this.user_img = user_img;
	}

	
	
}