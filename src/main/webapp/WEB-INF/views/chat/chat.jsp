<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8" import="com.tis.ridinghan.*"%>
 <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
 <%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<html lang="ko">

<meta http-equiv="content-type" content="text/html;charset=UTF-8" />

<head>
<meta charset="UTF-8">
<% String myctx=request.getContextPath(); %>

<!--자바스크립트 / CSS-->
  
   <!--script src="asset/js/jquery.min.js"></script-->
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
   <script src="<%=myctx %>/asset/js/common.js"></script>
   <script src="<%=myctx %>/asset/js/custom.js"></script>

   <!--부트스트랩-->
   <link rel="stylesheet" href="<%=myctx %>/asset/css/bootstrap.min.css" />
   <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
   <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
   <link href="<%=myctx%>/asset/css/style.css" rel="stylesheet">
</head>
<script type="text/javascript">
	
	var user_no="${user.user_no}";
	var nick="${user.nickName}";
	var user_img="${user.user_img}";
	var chat_title="${chatRoomInfo.chat_title}";
	var room_code="${chatRoomInfo.room_code}";
	
	$(function(){
		var arr={'room_code':room_code,
				'user_no':user_no};
		var main;
		$('#exitChat').click(function(){
			ws.send(300+"@!|"+room_code+"@!|"+nick);
			if(confirm("그룹을 완전히 나가시겠습니까?")){
				$.ajax({
					type:'POST',
					url:'/RidingHan/chat/quitChat',
					data:arr,
					dataType:'json',
					cache:false,
					success:function(res){
						alert(chat_title+'그룹에서 탈퇴했습니다.');
						opener.location.replace('/RidingHan/chat');
						window.close();
					},
					error:function(e){
						alert('error: '+e.status);
					}
				})	
			}
			else{
			return;
			}
		});
	})
	
	var socket=null;
	$(document).ready(function(){
		ws=new WebSocket("ws://localhost:9090/RidingHan/echo");
		$("#just").append("<div><b>"+chat_title+"채팅방에 참여했습니다.</b></div><br>")
		$("#just").scrollTop(99999999);
		$("#textInput").focus();		
		//메세지 보내기
		ws.onopen=function(){
			ws.send(100+"@!|"+room_code+"@!|"+user_no+"@!|"+nick);
			
			function sendText(){
				var msg=$('input[name=textInput]').val();
				var room=$("#chatTitle").text();
				if(msg!=""){
					ws.send(200+"@!|"+msg+"@!|"+room_code+"@!|"+nick+"@!|"+user_img);
					var sentMsg="<div class='message'><div class='response'><p class='text'>"+msg+"</p></div></div><br>";
					$("#just").append(sentMsg);
					$("#just").scrollTop(99999999);
					$("#textInput").val("");
					$("#textInput").focus();
				}
			}
			$("#sendText").click(function(){
				sendText();
			});
			$("#textInput").keypress(function(event){
				if(event.keyCode==13){
					event.preventDefault();
					sendText();
				}
			});
		}
			//서버로부터 받은 메시지
			ws.onmessage=function(msg){
				var data=msg.data;
				//alert(data);
				var tokens=data.split("@!|");
				
				if(tokens!=null){
					switch(tokens[0]){
					case "100":
						$("#just").append("<div style='color:blue'><b>"+tokens[1]+"님이 채팅방에 참여했습니다.</b></div><br>");
						break;
					case "200":
						var receivedMsg="<div class='message text-only' style='margin:0;'>"
						+"<img src='${pageContext.request.contextPath}/asset/images/user/"+tokens[3]+"' style='background-color:#337AF2; width:48px; height:48px; display:inline-block; border-radius:100%'>"
						+"<p>"+tokens[1]+"</p>"
						+"<p class='text' style='margin:0 10px 0 0'>"+tokens[2]+"</p></div><br>";
						$("#just").append(receivedMsg);
						$("#just").scrollTop(99999999);
						break;
					case "300":
						$("#just").append("<div style='color:blue'><b>"+tokens[1]+"님이 채팅방에서 완전히 나갔습니다.</b></div><br>");
						break;
					}
				}//if---------------------
			}
			/* ws.onclose=function(event){
			} */
			/* $(window).on('beforeunload', function(){
				ws.send(300+"@!|"+room_code+"@!|"+nick);
			}) */
	})
	
</script>
<body>
  <section id="chat">
          <div class="header-chat" id="headerChat" style="position:relative">
          
            <i class="icon fa fa-user-o  dropdown-toggle" aria-hidden="true"
            data-toggle="dropdown"></i>
            <div class="dropdown-menu">
            	<c:forEach var="cmList" items="${chatMemberList}">	
			   <a class="dropdown-item">${cmList.nickName}</a>
				</c:forEach>
			</div>
			
            <p class="name" id="chatTitle">${chatRoomInfo.chat_title} 채팅방</p>		    
            <button class="fa fa-times" type="button" id="exitChat" name="exitChat"
            style="float:right; position:absolute; right:20px; height:20px; width:20px"></button>
          </div>
          	<c:if test="${allChat==null||empty allChat}">
          		<tr>
					<td colspan="5"><b>그룹원들과 자유롭게 채팅을 나눠보세요.</b></td>
				</tr>
			</c:if>
	          <div class="messages-chat" id="chatArea" style="padding-bottom:100px;">
	          <div id="just">
	          	<c:if test="${allChat!=null||not empty allChat}">
	          		<c:forEach var="chatText" items="${allChat}">
		          		<c:choose>
		          			<c:when test="${chatText.chat_text eq '|start|'}">
		          			</c:when>
		          			<c:when test="${user.user_no eq chatText.chat_user_no}">
		          			<div class='message' ><div class='response'><p class='text'>${chatText.chat_text}</p></div></div><br>
		          			</c:when>
		          			<c:otherwise>
		          			<div class='message text-only' style='margin:0;'>
							<img src='<%=myctx %>/asset/images/user/${chatText.user_img}' style='background-color:#337AF2; width:48px; height:48px; display:inline-block; border-radius:100%'>
							<p>${chatText.nickName}</p><p class='text' style='margin:0 10px 0 0'>${chatText.chat_text}</p></div><br>
		          			</c:otherwise>
		          		</c:choose>	
	          		</c:forEach>
	          	</c:if>
				</div>
	         </div>

         <div class="footer-chat" style="position:fixed; background-color:white">
            <i class="icon1 fa fa-smile-o clickable" style="font-size:25pt;" aria-hidden="true"></i>
            <input type="text" class="write-message" name="textInput" id="textInput" placeholder="메시지를 입력하세요"></input>
            <i class="icon2 send fa fa-paper-plane-o clickable" id="sendText" aria-hidden="true"></i>
          </div>
        </section>     
        </body>
        </html>