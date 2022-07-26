package com.tis.plan.model;

import java.sql.Date;

import lombok.Data;

@Data
public class Plan_InfoVO {
	private Integer plan_info_no;
	private String plan_code;
	private Integer user_no;
	private Date plan_join;
	private Date plan_quit;
	private Integer share_ornot;
	
	private String nickName;
	
}
