package com.tis.place.domain;

import lombok.Data;

@Data
public class PlaceVO {
	
	private int place_no;
	private String title;
	private double latitude;
	private double longitude;
	private String road_address;
	private String jibun_address;
	private int p_user_no;
	
	public void setP_user_no(int user_no) {
		// TODO Auto-generated method stub
		
	}
	public int getPlace_no() {
		return place_no;
	}

	public void setPlace_no(int place_no) {
		this.place_no = place_no;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public String getRoad_address() {
		return road_address;
	}

	public void setRoad_address(String road_address) {
		this.road_address = road_address;
	}

	public String getJibun_address() {
		return jibun_address;
	}

	public void setJibun_address(String jibun_address) {
		this.jibun_address = jibun_address;
	}

	public int getP_user_no() {
		return p_user_no;
	}
	
}
