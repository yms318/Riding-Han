<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="com.tis.ridinghan.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:import url="/top" />
<c:import url="/mypageTop" />
<script type="text/javascript">
	var flag = false;

	function message(str) {
		var obj = document.getElementById("msg");
		obj.innerHTML = str;
	}
	$(function() {

		$('#btnEdit').click(function() {
			if (!$('#user_name').val()) {
				var str = '※ 이름을 입력해주세요';
				message(str);
				return;
			}
			if (!nameChk($('#user_name').val())) {
				var str = '※ 올바른 형식의 이름이 아닙니다';
				message(str);
				return;
			}
			if (!$('#nickName').val()) {
				var str = '※ 닉네임을 입력해주세요';
				message(str);
				return;
			}
			if (!nickChk($('#nickName').val())) {
				var str = '※ 올바른 형식의 닉네임이 아닙니다';
				message(str);
				return;
			}
			if ($('#nickName').val() != "${user.nickName}") {
				if (flag == false) {
					var str = '※ 닉네임 중복검사를 해주세요';
					message(str);
					return;
				}
			}
			if (!$('#pwd').val()) {
				var str = '※ 비밀번호를 입력해주세요';
				message(str);
				return;
			}
			if ($('#newPwd').val() != "") {
				if (!pwdChk($('#newPwd').val())) {
					var str = '※ 새 비밀번호는 영문,숫자,특수문자를 포함 8-13자로 해주세요';
					message(str);
					return;
				}
				if (!$('#newPwd2').val()) {
					var str = '※ 새 비밀번호 확인을 입력해주세요';
					message(str);
					return;
				}
				if ($('#newPwd').val() != $('#newPwd2').val()) {
					var str = '※ 변경할 비밀번호와 똑같이 입력해주세요';
					message(str);
					return;
				}
			}
			$('#mf').submit();
		});//btnEdit-------------

		$('#btnDelUser').click(function() {
			if(confirm("달려라한강을 탈퇴하시겠습니까?")){
				if (!$('#pwd').val()) {
					var str = '※ 비밀번호를 입력해주세요';
					message(str);
					return;
				}
				$('#mf').attr('action', 'unregisterMember');
				$('#mf').submit();
			}else{
				return;
			}
		});//btnDelUser-------------

		$('#nickChk').click(function() {
			var val = $('#nickName').val();
			if (!val) {
				var str = '※ 닉네임을 입력해주세요';
				message(str);
				return;
			}
			if (!nickChk($('#nickName').val())) {
				var str = '※ 올바른 형식의 닉네임이 아닙니다';
				message(str);
				return;
			} else {
				//alert($('#nickName').val());
				$.ajax({
					type : 'GET',
					url : '../nickcheck?nickName=' + val,
					dataType : 'json',
					cache : false,
					success : function(res) {
						if (res.nickOkay > 0) {
							var str = val + "은 사용 가능한 닉네임입니다"
							message(str);
							flag = true;
							return;
						} else {
							var str = val + "은 사용할 수 없는 닉네임입니다"
							message(str);
							flag = false;
							return;
						}
					},
					error : function(e) {
						alert('error: ' + e.status);
					}
				})
			}
		})//nickChkRepet()---------------------

		function pwdChk(val) {
			var pattern = /[A-Za-z]+[\w!_.]{7,12}/;
			var b = pattern.test(val);
			return b;
		}
		function nameChk(val) {
			var pattern = /^[가-힣\s]{2,10}$/;
			var b = pattern.test(val);
			return b;
		}
		function nickChk(val) {
			var pattern = /^[\w가-힣\s]{2,10}$/;
			var b = pattern.test(val);
			return b;
		}
	});
</script>

<!-- 회원정보수정 -->
<div class="group-right">
	<h6 class="mtitle">회원정보수정</h6>
	<p class="txt_black">기본정보</p>
	<hr />
	<form class="modifyform" id="mf" action="myInfoEdit" method="POST" enctype="multipart/form-data">
		<div class="form-group">
			<label class="mtxt_gray" style="margin: 0 150px 0 0">아이디</label>
			<label class="mtxt_black" id="user_id" name="user_id">${user.user_id}</label>
		</div>
		<div class="form-inline">
			<label class="mtxt_gray" for="user_name" style="margin: 0 167px 0 0">이름</label>
			<input type="text" id="user_name" name="user_name"
				class="form-control col-md-6" value="${user.user_name}">
		</div>
		<div class="form-inline">
			<label class="mtxt_gray" for="modify-nickname"
				style="margin: 0 154px 0 0">닉네임</label>
				<input type="text" id="nickName" name="nickName" class="form-control col-sm-4" value="${user.nickName}">
				<input type="button" class="modifybtn" id="nickChk" value="중복확인" />
		</div>
		<div class="form-inline">
			<label class="mtxt_gray" for="pwd" style="margin: 0 99px 0 0"> 비밀번호(필수)</label>
			<input type="password" id="pwd" name="pwd" class="form-control col-md-6">
		</div>
		<div class="form-inline">
			<label class="mtxt_gray" for="newPwd" style="margin: 0 119px 0 0">새 비밀번호</label>
			<input type="password" id="newPwd" name="newPwd" class="form-control col-md-6">
		</div>
		<div class="form-inline">
			<label class="mtxt_gray" for="newPwd2" style="margin: 0 85px 0 0">새 비밀번호 확인</label>
			<input type="password" id="newPwd2" name="newPwd2" class="form-control col-md-6">
		</div>
		<div class="form-inline">
			<label class="mtxt_gray" style="margin: 0 70px 0 0">프로필 이미지 등록</label> 
            <input type="file" name="mypfile" id="mypfile" class="form-control col-md-6">
            <input type="hidden" name="old_mypfile" id="old_mypfile" class="form-control col-md-6" value="${user.user_img}">
        </div>
		<br>
		<div class="form-inline">
			<p class="mtxt_gray2">본인인증</p>
			<p class="mtxt_gray2">인증 완료되었습니다. (인증일: 2020-01-15)</p>
			<!-- 가입날자 표시 -->
		</div>
		<br /> <label id="msg" style="fontSize: 8pt; color: red;"></label> <br>
		<div>
			<button type="button" id="btnEdit" class="btn btn-success col-5">수정</button>
			<button type="button" id="btnDelUser"
				class="btn btn-outline-success col-5">회원탈퇴</button>
		</div>
	</form>
</div>
<br class="clear">

<c:import url="/foot" />