<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:import url="/top" />

<%-- <link rel="stylesheet" href="<%=request.getContextPath()%>/asset/css/bootstrap.min.css" /> --%>   
<title>게시판</title>
<!--게시판---------------------------------->
<script>
   $(document).ready(function() {
      $('#insertboard').click(function() {
         $("#boardModal").modal();
      })
   });

   function showPopup() {
      var url = "http://localhost:3333/";
      window.open(url, "chatpop", "width=600, height=500, left=0, top=0");
   }
</script>

<div id="container">

  
      <div class="inbx">
      <div class="inner3">
         <div class="group-left">
            <p class="cicon">Q&A게시판</p>
            <form class="form-inline" name="findKeyword" action="searchBoard">
               <input type="text" name="findKeyword" id="findKeyword"
                  class="form-control col-md-9" placeholder="검색">
               <button type="submit" id="" class="serchbtn-bl">검색</button>
            </form>
            <p class="txt_blue">많이 찾는 질문글</p>
            <c:forEach var="board" items="${Top5BoardList}" begin='0' end='4'>
               <a href="boardView?board_idx=${board.board_idx}" class="txt_black">- ${board.board_title}</a>
            </c:forEach>
         </div>

         <c:if test="${boardArr==null || empty boardArr}">
            <tr>
               <td colspan="5"><b>현재 게시글이 없습니다.</b></td>
            </tr>
         </c:if>
         <c:if test="${boardArr !=null and not empty boardArr }">
            <div class="group-right">  
            <p>총 게시글 수 <b class="mtxt_blue"style="display:inline-block">${totalCount}</b>개<p>
               <br>
               <table class="table" style="font-size:14px">
                  <thead>
                     <tr>
                        <th>글번호</th>
                        <th>제목</th>
                        <th>글쓴이</th>
                        <th>날짜</th>
                        <th>조회수</th>
                     </tr>
                  </thead>
                  <tbody>
                     <c:forEach var="board" items="${boardArr}">
                     <tr >
                        <td>${board.board_idx}</td>
                        <td><a href="boardView?board_idx=${board.board_idx}">${board.board_title}</a></td>
                        <td>${board.user_nick}</td>
                        <td><fmt:formatDate value="${board.board_wdate}" pattern="yyyy.MM.dd" /></td>
                        <td>${board.readnum}</td>
                     </tr>
                     </c:forEach>
                  </tbody>
                  
               </table>
               <table style="width:auto;margin:auto">
                  <tr>
                     <td>${pageNavi}</td>
                  </tr>
               </table>
            </div>
         </c:if>
         <div class="group-right"style="text-align:center;">
            <button type="button" id="insertboard"
               class="btn btn-success col-3">질문남기기 +</button>
          </div>
         <br class="clear">
      </div>
   </div>
</div>

<!--채팅 추가 모달+--------------------------->
<div class="modal fade" id="boardModal">
   <div class="modal-dialog">
      <div class="modal-content">

         <!-- Modal Header -->
         <form action="boardInsert" method="post" enctype="multipart/form-data">
            <div class="modal-header">
               <h6 class="modal-title">게시글 쓰기+</h6>
               <button type="button" class="close" data-dismiss="modal">×</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
               <p class="comment">
                  낯선 사람과 만난다는건 언제나 즐거운 일이죠.<br />게시판을 만들어 정보를 공유합시다.
               </p>

               <!-- <div style="text-align:center">
                     <h6 class="title">채팅방 대표 이미지 등록</h6>
                     <div class="photo" style="background-image: url(asset/images/face.png);"></div><br />
                  </div>
 -->
               <hr />
               <h6 class="title">게시판 제목 등록</h6>
               <input type="Gname" name="board_title" id="board_title"
                  class="form-control">
               <h6 class="title">게시판 내용</h6>
               <textarea type="Gcomment" class="form-control" rows="3"
                  id="board_content" name="board_content"></textarea>
                <div style="text-align:left">
                     <h6 class="title">파일 등록[1]</h6>
                     <input type="file" name="myfile" id="myfile" class="form-control">
                  </div>
                 
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
               <input type="password" name="board_pwd" id="board_pwd"
                  placeholder="게시글 비밀번호">
               <button type="submit" class="btn btn-success">게시판 만들기</button>
            </div>
         </form>
      </div>
   </div>
</div>


<c:import url="/foot" />