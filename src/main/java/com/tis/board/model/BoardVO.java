package com.tis.board.model;

import java.io.Serializable;

import lombok.Data;

@Data
public class BoardVO implements Serializable {
    
	private int board_idx;
	private String board_title;
	private int board_user_no;
	private String board_pwd;
	private String board_content;
	private java.sql.Date board_wdate;
	//private String bimage;
	//private String board_img;
	private String user_id;
	private String user_nick; 
	private String originFilename;
	private String filename;
	private long filesize;
	private int readnum;
	private int refer;
	private int lev;
	private int sunbun;
	private int isFile;      
    //24시간 이내 글을위한 프로퍼티
    private int newImg;

	public int getBoard_idx() {
		return board_idx;
	}

	public void setBoard_idx(int board_idx) {
		this.board_idx = board_idx;
	}

	public String getBoard_title() {
		return board_title;
	}

	public void setBoard_title(String board_title) {
		this.board_title = board_title;
	}

	public int getBoard_user_no() {
		return board_user_no;
	}

	public void setBoard_user_no(int board_user_no) {
		this.board_user_no = board_user_no;
	}

	public String getBoard_pwd() {
		return board_pwd;
	}

	public void setBoard_pwd(String board_pwd) {
		this.board_pwd = board_pwd;
	}

	public String getBoard_content() {
		return board_content;
	}

	public void setBoard_content(String board_content) {
		this.board_content = board_content;
	}

	public java.sql.Date getBoard_wdate() {
		return board_wdate;
	}

	public void setBoard_wdate(java.sql.Date board_wdate) {
		this.board_wdate = board_wdate;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getUser_nick() {
		return user_nick;
	}

	public void setUser_nick(String user_nick) {
		this.user_nick = user_nick;
	}

	public String getOriginFilename() {
		return originFilename;
	}

	public void setOriginFilename(String originFilename) {
		this.originFilename = originFilename;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public long getFilesize() {
		return filesize;
	}

	public void setFilesize(long filesize) {
		this.filesize = filesize;
	}

	public int getReadnum() {
		return readnum;
	}

	public void setReadnum(int readnum) {
		this.readnum = readnum;
	}

	public int getRefer() {
		return refer;
	}

	public void setRefer(int refer) {
		this.refer = refer;
	}

	public int getLev() {
		return lev;
	}

	public void setLev(int lev) {
		this.lev = lev;
	}

	public int getSunbun() {
		return sunbun;
	}

	public void setSunbun(int sunbun) {
		this.sunbun = sunbun;
	}

	public int getIsFile() {
		return isFile;
	}

	public void setIsFile(int isFile) {
		this.isFile = isFile;
	}

	public int getNewImg() {
		return newImg;
	}

	public void setNewImg(int newImg) {
		this.newImg = newImg;
	}

	

   
}