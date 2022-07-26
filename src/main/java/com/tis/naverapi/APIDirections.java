package com.tis.naverapi;

// NAVER MAPS Directions Sample
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;


public class APIDirections {
	MapPoint startPoint;
	MapPoint endPoint;
	
	private String clientId = "n2rwg8ji5r";
	private String clientSecret = "bltnRabY5nXSCd6pxFNR3raV6j5SyTE39ozWFI92";
	
	public APIDirections() {
		super();
	}
	
	public APIDirections(MapPoint startPoint, MapPoint endPoint) {
		super();
		this.startPoint = startPoint;
		this.endPoint = endPoint;
	}

	public String getDirection(MapPoint start, MapPoint end) {
		
		try {
			String apiURL = "https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?"
					+"start="+start.lng+","+start.lat+",start_pos"
					+"&goal="+end.lng+","+end.lat+",end_pos&option=traavoidcaronly&cartype=6";
			URL url = new URL(apiURL);
			HttpURLConnection con = (HttpURLConnection) url.openConnection();
			con.setRequestMethod("GET");
			con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
			con.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);
			int responseCode = con.getResponseCode();
			BufferedReader br;
			if (responseCode == 200) { // ?��?�� ?���?
				br = new BufferedReader(new InputStreamReader(con.getInputStream(),"UTF-8"));
			} else { // ?��?�� 발생
				br = new BufferedReader(new InputStreamReader(con.getErrorStream(),"UTF-8"));
			}
			String inputLine;
			StringBuffer response = new StringBuffer();
			while ((inputLine = br.readLine()) != null) {
				response.append(inputLine);
			}
			br.close();
			return response.toString();
		} catch (Exception e) {
			System.out.println(e);
		}
		return null;
	}
}