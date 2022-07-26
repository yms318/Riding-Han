package com.tis.place.domain;

import lombok.Data;

@Data
public class DirectionVO {
	private int direction_no;
	private String title;
	private int place_from;
	private int place_to;
	private double distance;
	private String gpxfile;
	private int d_user_no;
	
	public int getDirection_no() {
		return direction_no;
	}
	public void setDirection_no(int direction_no) {
		this.direction_no = direction_no;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public int getPlace_from() {
		return place_from;
	}
	public void setPlace_from(int place_from) {
		this.place_from = place_from;
	}
	public int getPlace_to() {
		return place_to;
	}
	public void setPlace_to(int place_to) {
		this.place_to = place_to;
	}
	public double getDistance() {
		return distance;
	}
	public void setDistance(double distance) {
		this.distance = distance;
	}
	public String getGpxfile() {
		return gpxfile;
	}
	public void setGpxfile(String gpxfile) {
		this.gpxfile = gpxfile;
	}
	public int getD_user_no() {
		return d_user_no;
	}
	public void setD_user_no(int d_user_no) {
		this.d_user_no = d_user_no;
	}

	
}
