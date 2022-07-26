package com.tis.board.model;

import java.io.Serializable;
import java.sql.Timestamp;

import com.tis.user.model.MemberVO;

import lombok.Data;

@Data
public class ReplyVO implements Serializable {
   
   
   private Integer reply_idx;
   private String reply_content;
   private String reply_wname; 
   private java.sql.Date wdate;
   private Integer board_idx_fk;
   private String reply_id;
   
	public Integer getReply_idx() {
		return reply_idx;
	}
	
	public void setReply_idx(Integer reply_idx) {
		this.reply_idx = reply_idx;
	}
	
	public String getReply_content() {
		return reply_content;
	}
	
	public void setReply_content(String reply_content) {
		this.reply_content = reply_content;
	}
	
	public String getReply_wname() {
		return reply_wname;
	}
	
	public void setReply_wname(String reply_wname) {
		this.reply_wname = reply_wname;
	}
	
	public java.sql.Date getWdate() {
		return wdate;
	}
	
	public void setWdate(java.sql.Date wdate) {
		this.wdate = wdate;
	}
	
	public Integer getBoard_idx_fk() {
		return board_idx_fk;
	}
	
	public void setBoard_idx_fk(Integer board_idx_fk) {
		this.board_idx_fk = board_idx_fk;
	}
	
	public String getReply_id() {
		return reply_id;
	}
	
	public void setReply_id(String reply_id) {
		this.reply_id = reply_id;
	}   
   
}////////////////////////////////////////