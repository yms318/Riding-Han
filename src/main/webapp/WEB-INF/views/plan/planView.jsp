<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
   String myctx = request.getContextPath();
%>
<!--자바스크립트 / CSS-->
<link href="<%=myctx%>/asset/css/style.css" rel="stylesheet">
<script src="<%=myctx%>/asset/js/jquery.min.js"></script>
<script src="<%=myctx%>/asset/js/common.js"></script>
<script src="<%=myctx%>/asset/js/custom.js"></script>

<!--부트스트랩-->
<link rel="stylesheet" href="<%=myctx%>/asset/css/bootstrap.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
<script type="text/javascript">

var user_no="${user.user_no}";
var plan_code="${planInfo.plan_code}";

$(function(){
	var arr={'plan_code':plan_code,
			'user_no':user_no};
	$('#joinPlan').click(function(){
		alert('${planInfo.plan_title} 플랜에 참여합니다');
		$.ajax({
			type:'POST',
			url:'/RidingHan/plan/joinPlan',
			data:arr,
			dataType:'json',
			cache:false,
			success:function(res){
				window.close();
			},
			error:function(e){
				alert('error: '+e.status);
			}
		})
	});
	$('#closePlan').click(function(){
		window.close();
	})
})

</script>
<style type="text/css">
	body {
		line-height:2.3;
	}
	.ms-hr {
		border: solid 1px rgba(0, 0, 0, .1);
	}
	.content {
		font-size: 11pt;
		color: #343a40;
	}
	.departure::before {
		content: '';
		width: 50px;
		height: 25px;
		display: inline-block;
		background: url('../asset/images/start.png') 50% 50% no-repeat;
		vertical-align: -8px;
		margin-right: 5px;
	}
	.box{
		margin-top:30px;
	}
	#closePlan{
		opacity: .5;
		font-size: 1.7em;
		font-weight: 500;
		margin-bottom:20px;
	}
	#joinPlan{
		margin-left:167px;
		margin-top:40px;
	}
</style>
      <div style="padding:0px 23px 23px 23px">
         <div>
               <button type="button" class="close" id="closePlan">x</button>
            <div class="box">
               <div class="planTitle">
                  <h6 style="color:#337AF2;fontSize:13px">${planInfo.plan_title}</h6>      
               </div>
               <hr class="ms-hr"/>
               <div>
                  <h6>플랜 소개</h6>
                  <span id="plan_about" class="content">${planInfo.plan_about}</span><hr/>
                  <h6 class="title">플랜 멤버</h6>
                   <c:forEach var="planMem" items="${planMember}">
			         <span id="plan_member" class="content">${planMem.nickName}</span><br/>
                  </c:forEach>
                  <hr/>
                  <h6 class="title">경로 또는 장소</h6>
               	  <c:forEach var="placesList" items="${planArr}">
			         <span class="departure" style="margin:12px" id="" >
			            ${placesList.place_title}
			         </span><br/> 	
                  </c:forEach>
               </div>
               <div>
                  <hr/>
               	  <button type="button" class="btn btn-success" id="joinPlan">참여하기</button>
               </div>
            </div>
         </div>
      </div>