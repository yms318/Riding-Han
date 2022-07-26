package com.tis.naverapi;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jdom.JDOMException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import ultigpx.GPXExporter;
import ultigpx.Track;
import ultigpx.TrackSegment;
import ultigpx.Waypoint;
import ultigpx.Group;

/**
 * Servlet implementation class Directions
 */
@WebServlet("/map/Directions")
public class Directions extends HttpServlet {
   private static final long serialVersionUID = 1L;
       
    public Directions() {
        super();
    }

   /**
    * @see HttpServlet#doPost(HttpServletRequest req, HttpServletResponse res)
    */
   protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
      res.setContentType("text/json; charset=UTF-8");
      
      PrintWriter out=res.getWriter();
      String gpxfile=req.getParameter("gpxfile");
      String startx=req.getParameter("startx");
      String starty=req.getParameter("starty");
      String endx=req.getParameter("endx");
      String endy=req.getParameter("endy");
      MapPoint start=new MapPoint(Double.parseDouble(startx),Double.parseDouble(starty));
      MapPoint end=new MapPoint(Double.parseDouble(endx),Double.parseDouble(endy));
      
      APIDirections directions=new APIDirections();
      String strDirection=directions.getDirection(start,end);
      // System.out.println(strDirection);
      
      JSONParser parser = new JSONParser();
      Track track=new Track();
      TrackSegment tseg=new TrackSegment();
      try {
         Object obj = parser.parse(strDirection);
         JSONObject jsonObject = (JSONObject) obj;
         JSONObject route = (JSONObject) jsonObject.get("route");
         JSONArray tra = (JSONArray) route.get("traavoidcaronly");
         
         JSONArray path =null;
         for (int i = 0; i < tra.size(); i++) {
            JSONObject result = (JSONObject) tra.get(i);
            path= (JSONArray) result.get("path");
         }
         for (int i = 0; i < path.size(); i++) {
            JSONArray result = (JSONArray) path.get(i);
            Waypoint wp= new Waypoint("","",Double.parseDouble(result.get(1).toString()),
                           Double.parseDouble(result.get(0).toString()),0,0);
            tseg.add(wp);
         }
      } catch (ParseException e) {
         e.printStackTrace();
      }
      track.add(tseg);
      double distance=tseg.getDistance();
      Group gp=new Group();
      gp.addTrack(track);
      
      try {
         String file=this.getServletContext().getRealPath("/asset/gpx");
         java.io.File dir=new java.io.File(file);
         if(!dir.exists()){
            dir.mkdirs();//업로드 디렉토리가 없다면 생성하기
         }
         System.out.println(file);
         GPXExporter.exportToGPX(gp, file+"/"+gpxfile);
      } catch (JDOMException e) {
         // TODO Auto-generated catch block
         e.printStackTrace();
      } catch (IOException e) {
         // TODO Auto-generated catch block/
         e.printStackTrace();
      }
      out.println(""+distance);
      out.close();
   }
}