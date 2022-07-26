package com.tis.chat.model;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class Chat_MemberVO {
	private Integer chat_member_no;
	private String room_code;
	private Integer user_no;
	private java.sql.Date chat_jtime;
	private Integer plan_no;
	
	private String nickName;
	private String user_img;	
}
