package com.tis.place.domain;

import lombok.Data;

@Data
public class DirectionViewVO {
	private int direction_no;
	private String title;
	private int place_from;
	private String from_title;
	private int place_to;
	private String to_title;
	private double distance;
	private String gpxfile;
	
}
