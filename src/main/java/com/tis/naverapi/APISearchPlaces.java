package com.tis.naverapi;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;

public class APISearchPlaces {
	private String clientId = "n2rwg8ji5r";
	private String clientSecret = "bltnRabY5nXSCd6pxFNR3raV6j5SyTE39ozWFI92";
	
	 public String listPlaces(String findPlace, String lng, String lat) {
	     try {
	        
	    	 String query = URLEncoder.encode(findPlace, "UTF-8");
	    	 //System.out.println(query);
	         String apiURL = "https://naveropenapi.apigw.ntruss.com/map-place/v1/search?query=" + query
	        		 		+ "&coordinate="+lng+","+lat;
	         URL url = new URL(apiURL);
	         HttpURLConnection con = (HttpURLConnection)url.openConnection();
	         con.setRequestMethod("GET");
	         con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
	         con.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);
	         int responseCode = con.getResponseCode();
	         BufferedReader br;
	         if(responseCode==200) { // ?��?�� ?���?
	             br = new BufferedReader(new InputStreamReader(con.getInputStream(),"UTF-8"));
	         } else {  // ?��?�� 발생
	             br = new BufferedReader(new InputStreamReader(con.getErrorStream(),"UTF-8"));
	         }
	         String inputLine;
	         StringBuffer response = new StringBuffer();
	         while ((inputLine = br.readLine()) != null) {
	             response.append(inputLine);
	         }
	         br.close();
	         // System.out.println(response.toString());
	         return response.toString();
	     } catch (Exception e) {
	         System.out.println(e);
	     }
		return null;
	 }
}
