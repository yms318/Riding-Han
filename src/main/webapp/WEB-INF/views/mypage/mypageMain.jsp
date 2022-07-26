<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String myctx = request.getContextPath();
%>
<c:import url="/top" />
<c:import url="/mypageTop" />

<!-- 마이페이지 기본화면 -->
<div class="mgroup-right">
	<div style="text-align: center">
		<a class="photo" style="background-image: url(asset/images/face.png);"></a><br />
		<p class="txt01">${user.nickName}님 환영합니다</p>
		<p class="txt02">정보, 개인정보 보호 및 보안 설정을 관리하여<br />나에게 맞는 방식으로<br /> 
		달려라 한강을 사용할 수 있습니다.</p>
			</div>
		</div>
	</div>
</div>


<%-- <c:import url="/foot"/> --%>




