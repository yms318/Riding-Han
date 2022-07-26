<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:import url="/top" />
<script type="text/javascript">   
$(document).ready(function() {
   $("#makegroup").click(function() {
       $("#groupModal").modal(function(){
    	   
       });
    });
});
$(function(){
	   $('#makePlan').click(function(){
		  if($('#share_ornot').is(":checked")){
			$('#share_ornot').val(1);
	      }else{
		    $('#share_ornot').val(0);
		  }
	      if (!$('#plan_title').val()){
	         var str = '※ 플랜의 제목을 입력해주세요';
	         message(str);
	         return;
	      }
	      if(!$('#plan_about').val()){
	         var str = '※ 플랜 소개를 입력해주세요';
	         message(str);
	         return;
	      }
	      alert($('#share_ornot').val())
	      pf.submit();
	   })
})

//플랜 생성 시 유효성 체크
function message(str){
   var obj=document.getElementById("msg");
   obj.innerHTML=str;
   }
function callList(){
   window.open("plan/callPlaceList","_blank","width=850, height=1000, left=0, top=0");
}
function joinPlan(tmp){ //굳이 에이작스 안쓰고 이렇게 파라미터 보낼 수 이씀 힝
   var url="/RidingHan/plan/planView?plan_code="+tmp;
   window.open(url,"aaa","width=500, height=550")
}

function deletePlace(place_no){
	$.ajax({
		type:'GET',
		url:'/RidingHan/plan/deletePlace',
		data:{'place_no':place_no},
		success:function(res){
			window.location.reload('/RidingHan/plan');
		},error:function(e){
			alert('error: '+e.status);
		}
	})
}
function deleteDirection(direction_no){
	$.ajax({
		type:'GET',
		url:'/RidingHan/plan/deleteDirection',
		data:{'Direction_no':Direction_no},
		success:function(res){
			//alert(res);
			window.location.reload('/RidingHan/plan');
		},error:function(e){
			alert('error: '+e.status);
		}
	})
}
function clearPlace(){
	$.ajax({
		type:'GET',
		url:'/RidingHan/plan/clearPlace',
		success:function(res){
			window.location.reload('/RidingHan/plan');
		},error:function(e){
			alert('error: '+e.status);
		}
	})
}
</script>
 <div id="container">
         <div class="inbx" style="background-color:white">
            <div class="inner3">
               <div class="group-left">
                  <p class="gicon">라이딩 플랜</p>
                  <form class="form-inline" action="searchPlan">
                     <input type="text" name="findKeyword" id="findKeyword" class="form-control col-md-9" placeholder="검색">
                     <button type="submit" class="serchbtn-bl" >검색</button>
                  </form>
                  <button type="button" id="makegroup" class="btn btn-success col-12">플랜 만들기 +</button>
                  <p class="txt_blue">최근 플랜 목록</p>
                  <c:if test="${planArr==null || empty planArr}">
                     <tr>
                     <td colspan="5"><b>현재 플랜이 없습니다.</b></td>
                     </tr>
                    </c:if>
                    <c:if test="${planArr!=null || not empty planArr}">
                     <hr>
                       <c:forEach var="planList" items="${planArr}">
                        <a class="txt_black" onclick="joinPlan('${planList.plan_code}')">${planList.plan_title}</a>
                     </c:forEach>
                  </c:if>               
               </div>
                     <div class="group-right">
                     <p>총 <b class="mtxt_blue"
                     style="display:inline-block">${totalCount}</b>개의 그룹 플랜이 있습니다<p>
               <c:forEach var="planList2" items="${planArr}">
              
                  <div class="group-box">
                  <a href="#"> <img
                           style="width: 70px; height: 70px; z-index: -1; 
                           display: inline-block; float: left;"
                           src="asset/images/bikeicon.jpg">
                  </a>
                <div class="group-txt">
                        <span>${planList2.plan_title}</span>
                        <b>${planList2.plan_about}</b>
                     </div>
                     <button type="button" class="enter" id="${planList2.plan_code}" name="${planList2.plan_code}" 
                     onclick="joinPlan('${planList2.plan_code}')">보기</button>
                  </div>
               </c:forEach>
                 <hr>
                  <table style="width:auto;margin:auto">
                  <tr>
                     <td>${pageNavi}</td>
                  </tr>
                 </table>
               <br class="clear">
            </div>
         </div>
         
      </div>
      </div>

      <!--플랜추가 모달+--------------------------->
      <!-- The Modal -->
      <form id="pf" method="POST" action="plan/makePlan">
      <div class="modal fade" id="groupModal">
         <div class="modal-dialog">
            <div class="modal-content">

               <!-- Modal Header -->
               <div class="modal-header">
                  <h6 class="modal-title">플랜 만들기+</h6>
                  <button type="button" class="close" data-dismiss="modal" onclick="clearPlace()">×</button>
               </div>

               <!-- Modal body -->
               <div class="modal-body">
                  <p class="comment">나만의 플랜을 만들어 관리하거나 다양한 사람들과 함께 공유할 수 있습니다<br>경로를 지정해  함께 여행을 떠나보세요.</p>
                  <h6 class="title">플랜 이름</h6>
                  <input type="Gname" name="plan_title" id="plan_title" class="form-control">

                  <h6 class="title">플랜 소개</h6>
                  <textarea type="Gcomment" name="plan_about" id="plan_about" 
                  class="form-control" rows="1"></textarea>
                  <hr />
                  <h6 class="title">경로 또는 장소 추가
                     <button type="button" onclick="callList()">가져오기+</button>
                  </h6>
                  <hr />
                  <div id="pList" name="pList">
                  <c:if test="${placesArr!=null||not empty placesArr}">
                  <c:forEach var="placesList" items="${placesArr}">
                  	<c:choose>
	                  	<c:when test="${placesList.place_no!=0 && placesList.direction_no==0}">
			                  <span class="departure" style="margin:12px" id="" >
			                     	${placesList.place_title}
			                  </span>
			                  <button type='button' onclick="deletePlace(${placesList.place_no})" class="comment_btn" style="background-color:red;float:right;margin-top:10px;margin-right:8px" title="Delete">
			                  <i class="material-icons"> delete_outline </i></button><br/>
			            </c:when>
			          	<c:when test="${placesList.direction_no!=0 && placesList.place_no==0}">
			          		  <span class="departure" style="margin:12px" id="" >
			                     	${placesList.direction_title}
			                  </span>
			                  <button type='button' onclick="deleteDirection(${placesList.direction_no})" class="comment_btn" style="background-color:red;float:right;margin-top:10px;margin-right:8px" title="Delete">
			                  <i class="material-icons"> delete_outline </i></button><br/>
						</c:when>	
					</c:choose>	          	
                  </c:forEach>
                  </c:if>
                  </div>                 
               </div>

               <!-- Modal footer -->
               <div class="checks" style="margin-left:25px">
               <input type="checkbox" name="share_ornot" id="share_ornot"/>
               <label for="share_ornot"> 그룹으로 공유하기</label>      
            </div>
            	<label id="msg" style="fontSize: 8pt; color: red; align:left;"></label>
               <div class="modal-footer">
                    <button type="button" class="btn btn-success" id="makePlan">플랜 만들기</button>
               </div>

            </div>
         </div>
      </div>
      </form>