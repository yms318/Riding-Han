package com.tis.naverapi;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class SearchPlaces
 */
@WebServlet("/SearchPlaces")
public class SearchPlaces extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public SearchPlaces() {
        super();
    }

	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		res.setContentType("text/json; charset=UTF-8");
		
		PrintWriter out=res.getWriter();
		//1. �??��?��?�� ?��?��?�� �? 받기(?��?��?���?, 중심 좌표)
		String place=req.getParameter("place");
		
		String lng=req.getParameter("lng");
		String lat=req.getParameter("lat");
		// System.out.println("place: "+place);
		
		//2. ?��?��?�� 체크(? ?��?���? ?��?�� ?���? 고�??...)
		
		APISearchPlaces splaces=new APISearchPlaces();
		String strPlaces=splaces.listPlaces(place, lng, lat);
		// System.out.println(strPlaces);
		out.println(strPlaces);
		out.close();
	}
}
