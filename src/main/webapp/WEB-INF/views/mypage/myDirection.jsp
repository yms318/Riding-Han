<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
   String myctx = request.getContextPath();
%>
<c:import url="/top" />
<c:import url="/mypageTop" />
<!-- ===== 로그인 ====== -->
<script type="text/javascript">
   function showFavorite() {
      window.open("favorite.html", "chatpop",
            "width=600, height=800, top=0, resizable=no")
   }
</script>

<!-- 즐겨찾기 -->
<div class="mgroup-right">
   <h6 class="mtitle" style="margin-bottom: 0">내가 등록한 경로</h6>
   <div class="select-mcate">
       <input type="button" onclick="location.href='<%=myctx%>/mypage/myPlace'" class="serchbtn-wh btn-sm-1" value="장소" />
       <input type="button" onclick="location.href='<%=myctx%>/mypage/myDirection'" class="serchbtn-wh btn-sm-1" value="경로" />
   </div>

   <table class="table" style="font-size: 12px">
      <thead style="background-color: #F7F8F9">
         <tr>
            <th width="9%">번호</th>
            <th width="20%">경로이름</th>
            <!-- <th width="10%">위도</th>
                     <th width="10%">경도</th> -->
            <th width="31%">경로거리(m)</th>
         </tr>
      </thead>
      <!-- --------------------------- -->
      <tbody>

         <c:if test="${myDirection==null || empty myDirection}">
            <tr>
               <td colspan="5"><b>등록한 장소가 없습니다.</b></td>
            </tr>
         </c:if>
         <c:forEach var="direction" items="${myDirection}">
            <tr>
               <td>${direction.direction_no}</td>
               <td>${direction.title}</td>
               <%-- <td><fmt:formatNumber value="${place.latitude}"
                              pattern="###.#####" /></td>
                        <td><fmt:formatNumber value="${place.longitude}"
                              pattern="###.#####" /></td> --%>
               <td>${direction.distance}</td>
               
               <td width="9%">
                  <!-- href속성값에 자바스크립트 함수를 넣을 때는 반드시 함수 앞에 "javascript:" 접두어를 붙여주자 -->
                  <a href="javascript:select('${direction.direction_no}')">삭제</a>
               </td>
            </tr>
         </c:forEach>
      
      </tbody>
   </table>
   <!-- --------------------------- -->
   <hr>
   <table style="width: auto; margin: auto">
      <tr>
         <td>${pageNavi}</td>
      </tr>
   </table>


   <%-- <div class="group-box2" onclick="showFavorite()">
      
         <div class="profile2" href="${chat.chat_url}">
            <img src="asset/images/chat/${chat.chat_image}">
         </div>
         
         <div class="group-txt2">
            <p class="mtxt_black">등록한 경로</p>
            <br />
            <p class="mtxt_gray3">즐겨찾기한 경로에 대한 설명</p>
            <p class="mtxt_small_blue">송파구 송파대로 맛있는 국밥집</p>
            <img class="m-arrow" src="./asset/images/blt_open.png" />
            <p class="mtxt_small_blue">송파구 송파대로 345</p>
            <p class="mtxt_small_gray">2020-02-24</p>
         </div>
      
      <button type="button" id="m-cancle" class="m-cancle">삭제</button>
   </div> --%>
</div>
