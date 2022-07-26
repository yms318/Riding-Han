package com.tis.plan.model;

import java.sql.Date;

import lombok.Data;

@Data
public class PlanVO {
	private Integer plan_no;
	private Integer user_no;
	private String plan_title;
	private String plan_about;
	private int place_no;
	private int direction_no;
	private Date plan_wdate;
	private String plan_wdateStr;
	private String plan_code;
	
	private String place_title;
	private String direction_title;	
	private int share_ornot;
	
	public Integer getPlan_no() {
		return plan_no;
	}
	public void setPlan_no(Integer plan_no) {
		this.plan_no = plan_no;
	}
	public Integer getUser_no() {
		return user_no;
	}
	public void setUser_no(Integer user_no) {
		this.user_no = user_no;
	}
	public String getPlan_title() {
		return plan_title;
	}
	public void setPlan_title(String plan_title) {
		this.plan_title = plan_title;
	}
	public String getPlan_about() {
		return plan_about;
	}
	public void setPlan_about(String plan_about) {
		this.plan_about = plan_about;
	}
	public int getPlace_no() {
		return place_no;
	}
	public void setPlace_no(int place_no) {
		this.place_no = place_no;
	}
	public int getDirection_no() {
		return direction_no;
	}
	public void setDirection_no(int direction_no) {
		this.direction_no = direction_no;
	}
	public Date getPlan_wdate() {
		return plan_wdate;
	}
	public void setPlan_wdate(Date plan_wdate) {
		this.plan_wdate = plan_wdate;
	}
	public String getPlan_wdateStr() {
		return plan_wdateStr;
	}
	public void setPlan_wdateStr(String plan_wdateStr) {
		this.plan_wdateStr = plan_wdateStr;
	}
	public String getPlan_code() {
		return plan_code;
	}
	public void setPlan_code(String plan_code) {
		this.plan_code = plan_code;
	}
	public String getPlace_title() {
		return place_title;
	}
	public void setPlace_title(String place_title) {
		this.place_title = place_title;
	}
	public String getDirection_title() {
		return direction_title;
	}
	public void setDirection_title(String direction_title) {
		this.direction_title = direction_title;
	}
	public int getShare_ornot() {
		return share_ornot;
	}
	public void setShare_ornot(int share_ornot) {
		this.share_ornot = share_ornot;
	}
			
}
