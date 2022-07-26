<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String myctx = request.getContextPath();
%>
<c:import url="/top" />
<c:import url="/mypageTop" />

		<div class="mgroup-right">
			<!-- 진행중인 여행 -->
			<h6 class="mtitle">라이딩 플랜 관리</h6>
			<div class="group-box2">
				<a href="해당 그룹 화면으로 jsp이동 새창으로뜸" target="_blank">
					<div class="profile2" href="${chat.chat_url}">
						<img src="../asset/images/chat/${chat.chat_image}">
					</div>
					<div class="group-txt2">
						<p class="mtxt_black">진행중인 여행제목</p>
						<br />
						<p class="mtxt_gray3">진행중인 여행소개</p>
						<br />
						<p class="mtxt_small_blue">송파구 송파대로 맛있는 국밥집</p>
						<img class="m-arrow" src="../asset/images/blt_open.png" />
						<p class="mtxt_small_blue">송파구 송파대로 345</p>
						<br />
						<p class="mtxt_small_gray">2020-02-24</p>
					</div>
				</a>
				<button type="button" id="m-enter" class="m-enter">이동</button>
			</div>
		</div>
	</div>
</div>
</div>