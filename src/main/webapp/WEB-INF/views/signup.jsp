<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:import url="/top" />
<script src="asset/js/jquery.min.js"></script>
<!DOCTYPE>
<script type="text/javascript">
	var flag = false;
	var flag2 = false;

	function message(str) {
		var obj = document.getElementById("msg");
		obj.innerHTML = str;
	}

	$(function() {
		$('#btnMk').click(function() {
			if (!($('#user_id').val())) {
				var str = '※ 이메일을 입력해주세요';
				message(str);
				return;
			}
			if (!user_idChk($('#user_id').val())) {
				var str = '※ 올바른 이메일 형식이 아닙니다.';
				message(str);
				return;
			}
			if (flag == false) {
				var str = '※ 이메일 중복검사를 해주세요';
				message(str);
				return;
			}
			if (!$('#pwd').val()) {
				var str = '※ 비밀번호를 입력해주세요';
				message(str);
				return;
			}
			if (!pwdChk($('#pwd').val())) {
				var str = '※ 비밀번호는 영문,숫자,특수문자를 포함 8-13자로 해주세요';
				message(str);
				return;
			}
			if (!$('#pwd2').val()) {
				var str = '※ 비밀번호 확인을 입력해주세요';
				message(str);
				return;
			}
			if ($('#pwd').val() != $('#pwd2').val()) {
				var str = '※ 비밀번호와 똑같이 입력해주세요';
				message(str);
				return;
			}
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
			if (flag2 == false) {
				var str = '※ 닉네임 중복검사를 해주세요';
				message(str);
				return;
			}
			if ($('#checks').is(":checked") == false) {
				var str = '※이용약관에 동의해주세요';
				message(str);
				return;
			}
			//f.submit();
			$('#f').submit();
		})//btnMke---------------------------

		$('#user_idChk').click(function() {
			var val = $('#user_id').val();
			if (!val) {
				var str = '※ 이메일을 입력해주세요';
				message(str);
				return;
			}
			if (!user_idChk($('#user_id').val())) {
				var str = '※ 올바른 이메일 형식이 아닙니다.';
				message(str);
				return;
			} else {
				$.ajax({
					type : 'GET',
					url : 'idcheck?user_id=' + val,
					dataType : 'json',
					cache : false,
					success : function(res) {
						//alert(res.user_id_chk);
						if (res.idOkay > 0) {
							var str = val + "은 사용 가능한 이메일입니다"
							message(str);
							flag = true;
							return;
						} else {
							var str = val + "은 사용할 수 없는 이메일입니다"
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
		})//user_idChkRepet()---------------------

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
				$.ajax({
					type : 'GET',
					url : 'nickcheck?nickName=' + val,
					dataType : 'json',
					cache : false,
					success : function(res) {
						if (res.nickOkay > 0) {
							var str = val + "은 사용 가능한 닉네임입니다"
							message(str);
							flag2 = true;
							return;
						} else {
							var str = val + "은 사용할 수 없는 닉네임입니다"
							message(str);
							flag2 = false;
							return;
						}
					},
					error : function(e) {
						alert('error: ' + e.status);
					}
				})
			}
		})//nickChkRepet()---------------------

		function user_idChk(val) {
			//var val=obj.value;
			var pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
			var b = pattern.test(val);
			return b;
		}
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

<!--회원가입---------------------------------->
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

				<form name="f" id="f" action="signup" method="POST">
					<div class="form-group col-md-6 offset-md-3" style="padding: 0">
						<div class="form-inline">
							<div class="col-md-9" style="padding: 0;margin-bottom: 5px">
								<input type="text" name="user_id" id="user_id" placeholder="이메일">
							</div>
							<div class=" col-md-3">
								<button type="button" class="form-control btn btn-primary"
									style="margin-bottom: 15px" id="user_idChk">중복체크</button>
							</div>
						</div>
						<div class="form-group">
							<button type="button" class="emailbtn btn btn-primary col-md-12"
								submit="button">인증 메일 전송</button>
						</div>
						<div class="form-group">
							<input type="password" name="pwd" id="pwd" class="form-control"
								placeholder="비밀번호 (영문, 숫자, 특수문자 8-13자)"
								style="margin-bottom: 15px"> <input
								type="password" name="pwd2" id="pwd2" class="form-control"
								placeholder="비밀번호 확인">
						</div>
						<div class="form-group">
							<input type="text" name="user_name" id="user_name"
								class="form-control" placeholder="이름 (2-15자)">
						</div>

						<div class="form-inline">
							<div class="col-md-9" style="padding: 0">
								<input type=text name="nickName" id="nickName" placeholder="닉네임">
							</div>
							<div class="col-md-2">
								<button type="button" class="form-control btn btn-primary"
									id="nickChk" style="margin-bottom: 10px">중복체크</button>
							</div>
						</div>

						<div class="checks">
							<input type="checkbox" id="checks" value="val" /> <label
								for="checks">달려라 한강에서 제공하는<a>서비스 약관</a>에 동의합니다.
							</label> <label id="msg" style="fontSize: 8pt; color: red;"></label>
						</div>
						<button type="button" id="btnMk" class="btn btn-success">계정
							만들기</button>
						<span style="color: #848484;">이미 계정이 있으세요?<a href="">
								로그인</a></span>
					</div>
				</form>
			</div>
		</div>
	</div>
	<!--container-->
	<c:import url="/foot" />