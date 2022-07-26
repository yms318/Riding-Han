<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:import url="/top"/>
<!-- ===== 로그인 ====== -->
<script type="text/javascript">

function message(str){
	var obj=document.getElementById("msg");
	obj.innerHTML=str;
	}
		
$(function(){
	$('#btnLi').click(function(){
		if(!($('#userId').val())){
			var str='※ 이메일을 입력해주세요';
			message(str);
			return;
		}
		if(!$('#pwd').val()){
			var str='※ 비밀번호를 입력해주세요';
			message(str);
			return;
		}
		$('#lf').submit();
	})
})
</script>

<div id="container">
	<div class="inbx">
		<div class="s-content">
			<div class="inner2">
				<img class="loginLogo" src="asset/images/RUN_SMALL_FULL.png" /> <strong>하나의
					계정으로 모든 달려라 한강 서비스를 이용하세요.</strong> <span>다른 서비스로 로그인</span> <a href=""><img
					class="loginicon" src="asset/images/twitter.png" /></a> <a href=""><img
					class="loginicon" src="asset/images/naver.png" /></a> <a href=""><img
					class="loginicon" src="asset/images/google.png" /></a> <a href=""><img
					class="loginicon" src="asset/images/facebook.png" /></a>
				<hr color="#659DEF" height="1px">
				<span>또는</span>

				<form id="lf" action="login" method="POST">
					<div class="form-group col-md-6 offset-md-3">
						<input type="email" name="userId" id="userId" class="form-control"
							placeholder="이메일">
						<input type="password" name="pwd" id="pwd"
							class="form-control" placeholder="비밀번호">
							<a href=""><span style="margin-bottom: 40px;">비밀번호 재설정</span></a>
					</div>
					<label id="msg" style="fontSize:8pt;color:red;"></label><br>
					<button type="button" id="btnLi" class="loginbtn btn btn-success col-sm-6">로그인</button>
					<span style="color: #848484">계정이 없으신가요?<a href="signup.do"> 회원가입</a></span>
				</form>
			</div>
		</div>
	</div>
</div>
<!--container-->
<c:import url="/foot"/>
