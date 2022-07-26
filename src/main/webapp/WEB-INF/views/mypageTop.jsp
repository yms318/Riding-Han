<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8" import="com.tis.ridinghan.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
   String myctx = request.getContextPath();
%>
<div id="container">
   <div class="inner4">
      <div class="group-left">
         <a class="micon" style="display:block" href="<%=myctx%>/mypage">마이페이지</a>
         <p style="color: #72787F">환영합니다
         <b style="color: #337AF2">${user.nickName}</b>님
         </p>
         <!-- '성정민'에 회원 이름 나오도록 -->
         <hr />
         <p class="mtxt_blue">계정</p>
         <a href="<%=myctx%>/mypage/myInfo" class="txt_black">회원정보수정</a>
         <p class="txt_blue">나의 여행</p>
         <a href="<%=myctx%>/mypage/myPlace" class="txt_black">내가 등록한 장소</a> 
         <a href="<%=myctx%>/mypage/myDirection" class="txt_black">내가 등록한 경로</a>
         <a href="<%=myctx%>/mypage/planList" class="txt_black">라이딩플랜 관리</a> 
      </div>
