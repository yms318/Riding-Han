<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8" import="com.tis.ridinghan.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
   String myctx = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="ko">

<meta http-equiv="content-type" content="text/html;charset=UTF-8" />

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
   content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
<link rel="exerd icon" href="<%=myctx%>/asset/images/favicon.ico">
<title>LetsRun</title>
<meta name="description" content="ridinghan">
<meta name="keywords" content="ridinghan">

<!--자바스크립트 / CSS-->
<link href="<%=myctx%>/asset/css/style.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<script src="<%=myctx%>/asset/js/jquery.min.js"></script>
<script src="<%=myctx%>/asset/js/common.js"></script>
<script src="<%=myctx%>/asset/js/custom.js"></script>


<!--부트스트랩-->
<link rel="stylesheet" href="<%=myctx%>/asset/css/bootstrap.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

</head>
<script>
$(function(){
   $('.menu_first').click(function(){
        var submenu = $('>.menu_second',this)
   
        if(submenu.is(":visible")){
           submenu.slideUp(100)
          $('>.li_pack',this)
             .css('border','none')
             .css('margin','0')
        }else{
          submenu.slideDown(100)
          $('>.li_pack',this)
              .css('border-bottom','1.5px #fff solid')
              .css('margin-bottom','20px')
        }
   })
})
</script>

<body>
   <!-- ===== wrap ====== -->
   <div id="wrap" class="index">

      <!-- ===== header ====== -->
      <header id="header2">
         <div class="inner2">
            <h1 class="logo">
               <a href="<%=myctx%>/index"></a>
            </h1>
            <div class="utill2">
               <a href="<%=myctx%>/map" target="_self" class="sup">지도보기</a> <a
                  href="<%=myctx%>/chat" target="_self" class="doc">채팅</a>
            </div>
            <div class="lang2">
               <c:if test="${user eq null}">
                  <a href="<%=myctx%>/signup" target="_self" class="sup">회원가입</a>
                  <a href="<%=myctx%>/login" class="_self">로그인</a>
               </c:if>
               <c:if test="${user ne null}">
                  <a href="<%=myctx%>/mypage" target="_self" class="sup">마이페이지</a>
                  <a href="<%=myctx%>/logout" class="_self">로그아웃</a>
               </c:if>
            </div>
         </div>
      </header>
      <!-- ===== /header ====== -->
      <div id="gnbWrap">
         <ul id="gnb">
            <li class="active" data-menuanchor="intro"><a href="index">HOME</a></li>
            <li data-menuanchor="index01"><a href="index.html#index01">START
                  RIDING</a></li>
            <li data-menuanchor="index02"><a href="index.html#index02">MY
                  TRAVEL</a></li>
            <li data-menuanchor="index05"><a href="index.html#index05">CAMPAIGN</a></li>
         </ul>
      </div>

      <div class="bt-mn">
         <a href="#none"><i></i><i></i><i></i><span>메뉴</span></a>
      </div>

      <!-- ===== lm ====== -->
      <div id="lm">
         <div class="inner">

            <div class="hd" style="z-index:10">
               <a href="#none" class="close">닫기</a>
            </div>

            <div class="menu">
               <em>Menu</em>
               <ul>

                  <li class="menu_first">
                     <div class="li_pack">
                        <p>지도보기</p>
                        <i class="material-icons menu_icon"> expand_more </i>
                     </div>
                     <ul class="menu_second">
                        <li><a href="<%=myctx%>/map">라이딩 검색</a></li>
                        <li><a href="<%=myctx%>/map/placeList">등록된 장소</a></li>
                        <li><a href="<%=myctx%>/map/directionList">등록된 라이딩</a></li>
                     </ul>
                  </li>

                  <li class="menu_first">
                     <div class="li_pack">
                        <p>커뮤니티</p>
                        <i class="material-icons menu_icon"> expand_more </i>
                     </div>
                     <ul class="menu_second">
                        <li><a href="<%=myctx%>/plan">라이딩 플랜</a></li>
                        <li><a href="<%=myctx%>/chat">채팅</a></li>
                        <li><a href="index.html#index05">캠페인</a></li>
                     </ul>
                  </li>

                  <li class="menu_first">
                     <div class="li_pack">
                        <p>마이페이지</p>
                        <i class="material-icons menu_icon"> expand_more </i>
                     </div>
                     <ul class="menu_second">
                        <li><a href="<%=myctx%>/mypage/myInfo">회원정보수정</a></li>
                        <li><a href="<%=myctx%>/mypage/myPlace">내가 등록한 장소</a></li>
                        <li><a href="<%=myctx%>/mypage/myDirection">나의 라이딩</a></li>
                        <li><a href="<%=myctx%>/mypage/planList">라이딩플랜 관리</a></li>
                     </ul>
                  </li>

                  <li class="menu_first">
                     <div class="li_pack">
                        <p>고객지원</p>
                        <i class="material-icons menu_icon"> expand_more </i>
                     </div>
                     <ul class="menu_second">
                        <li><a href="<%=myctx%>/board">Q&A게시판</a></li>
                        <li><a href="<%=myctx%>/policy">개인정보정책</a></li>
                        <li><a href="<%=myctx%>/service">서비스약관</a></li>
                     </ul>
                  </li>

               </ul>
            </div>
         </div>
      </div>
      <!-- ===== /lm ====== -->