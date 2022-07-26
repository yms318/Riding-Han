<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:import url="/top" />

<div id="container">
   <div class="s-content">
      <div class="inbx">
         <div class="inner3">
            <div class="group-left">
               <p class="cicon">Q&A게시판</p>
               <form class="form-inline" name="findKeyword" action="searchBoard">
                  <input type="text" name="findKeyword" id="findKeyword"
                     class="form-control col-md-9" placeholder="검색">
                  <button type="submit" id="" class="serchbtn-bl">검색</button>
               </form>
               <p class="txt_blue">최근 게시글</p>
               <c:forEach var="board" items="${boardArr}" begin='0' end='4'>
                  <a href="boardView?board_idx=${board.board_idx}" class="txt_black">-
                     ${board.board_title}</a>
               </c:forEach>
            </div>

            <form name="edit" action="boardEdit" method="POST">
               <div class="group-right">
                  <div class="boardinner">
                     <br>

                     <p class="board_title">${bi.board_title }</p>

                     <table class="table" style="font-size: 14px">
                        <tr>
                           <th>글 제목</th>
                           <td colspan="4" align="left"><input type="text"
                              name="board_title" value="${bi.board_title }"></td>
                        </tr>
                        <tr>
                           <th>글번호</th>
                           <td>${bi.board_idx}</td>
                           <th>작성일</th>
                           <td>${bi.board_wdate}</td>
                        </tr>
                        <tr>
                           <th>작성자</th>
                           <td>${bi.user_nick}</td>
                           <th>조회수</th>
                           <td>${bi.user_id}</td>
                        </tr>
                        <tr>
                           <th>글 내용</th>
                           <td colspan="4" align="left"><textarea
                                 class="board_textarea" name="board_content"
                                 style="word-break: break-all; width: 100%; height: 200px; text-align: left">
                           ${bi.board_content}</textarea></td>

                        </tr>
                        <tr>
                           <th>첨부파일</th>
                           <td colspan="3" align="left" style="word-break: break-all">
                              <a>${bi.originFilename} &nbsp; [${bi.filesize}bytes]</a>
                           </td>
                        </tr>
                        <tr>
                     </table>
                     <hr>
                     <a href="board" class="serchbtn-bl2" style="line-height: 33px">전체글</a>
                     <a href="#" onclick="del()" class="serchbtn-bl"
                        style="float: right; margin-left: 5px; line-height: 33px">삭제</a>
                     <a href="#" onclick="goEdit()" class="serchbtn-bl"
                        style="float: right; line-height: 33px">편집</a> <input
                        type="hidden" name="board_idx" value="${bi.board_idx}">


                  </div>
                  <!-- <button type="button" id="gochat" class="btn btn-success col-3">채팅하기</button> -->
               </div>
               <br class="clear">
            </form>
         </div>
      </div>
   </div>
</div>


<script>
   function goEdit() {
      edit.submit();
   }
</script>

<c:import url="/foot" />