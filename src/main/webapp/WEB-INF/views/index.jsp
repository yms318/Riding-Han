<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
   String myctx = request.getContextPath();
%>
<c:import url="/top" />

<!-- 
내일 바꿀것
정민 ----
1. 채팅창 이름 위치 크기 색상 변경
2. 회원정보 수정 메뉴 스크립트 추가하기
3. 채팅 왼쪽 리스트업 다시 하기
 -->

<!-- ===== indexwrap ====== -->
<div id="indexwrap">

   <div class="section intro">
      <div class="desc">
         <div class="tx01">
            <span class="opacity" data-animation-effect="fadeInUp"
               data-effect-delay="500">같이 달려요</span> <span class="opacity"
               data-animation-effect="fadeInUp" data-effect-delay="800">우리들의
               라이딩 </span> <span class="opacity" data-animation-effect="fadeInUp"
               data-effect-delay="1100">달려라 한강</span>
         </div>
         <div class="tx02 opacity" data-animation-effect="fadeInUp"
            data-effect-delay="1400">Let's RUN</div>
         <div class="tx03 opacity" data-animation-effect="fadeInUp"
            data-effect-delay="1700">
            <strong>위치기반 자전거 라이딩과 실시간 채팅을 한번에</strong> <span>심심했던 라이딩, 오늘
               나랑 같이 달릴래?</span>
         </div>
         <c:if test="${user eq null||empty user}">
            <div class="bt-area opacity" data-animation-effect="fadeInUp"
               data-effect-delay="2000">
               <a href="<%=myctx%>/signup" class="down" style="color: white">회원가입</a>
               <a href="<%=myctx%>/login" class="buy" style="color: white">로그인</a>
            </div>
         </c:if>
      </div>
      <div class="video-bg">
         <video id="main-video" muted autoplay playsinline loop>
            <source src="asset/video/main2.mp4" type="video/mp4">
         </video>
      </div>
   </div>
   <!-- /intro-->

   <div class="section index01">
      <div class="inner">
         <h2 class="main-tit">Start Riding</h2>
         <div class="inbx">
            <div class="movie opacity" data-animation-effect="fadeInUp"
               data-effect-delay="300">
               <a href="#" class="play">라이딩 시작하기</a>
            </div>
            <div class="desc">
               <p class="tx01 opacity" data-animation-effect="fadeInUp"
                  data-effect-delay="600">
                  <span>새로운 <strong>라이딩</strong>을
                  </span> <span>경험해보세요.</span>
               </p>
               <p class="tx02 opacity" data-animation-effect="fadeInUp"
                  data-effect-delay="900">
                  <span>한강 만큼 라이딩을 즐기기에 제격인 곳은 없죠</span> <span>하지만 제대로 알아야,
                     제대로 즐길 수 있습니다 </span> <span>곤란한 일 없도록 <em>달려라 한강</em>이 도와드릴게요
                  </span> <span>이젠 즐기기만 하세요.</span>
               </p>
               <div class="tx-slide opacity" data-animation-effect="fadeInUp"
                  data-effect-delay="1200">
                  <div class="pager"></div>
                  <div class="side-bx">
                     <div class="swiper-wrapper">
                        <div class="swiper-slide item">
                           <p class="hd">
                              <strong class="f-eng">Make New Friend</strong>
                           </p>
                           <p class="txt">
                              <span>근방 3km 이내의 친구를 만나 함께 여행하세요.</span> <span>좋은 여행엔
                                 좋은 친구가 함께 합니다.</span>
                           </p>
                        </div>
                        <div class="swiper-slide item">
                           <p class="hd">
                              <strong class="f-eng">Plan and share</strong>
                           </p>
                           <p class="txt">
                              <span>파티원을 모집해 <em>함께 여행을 해볼까요?</em></span> <span>나의 여행
                                 계획을 파티와 함께 공유하세요. </span>
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
               <!-- /tx-slide -->
            </div>
         </div>
      </div>
   </div>
   <!-- /index01 -->



   <div class="section index02">
      <div class="inner">
         <h2 class="main-tit">My Travel</h2>
         <div class="inbx">
            <div class="desc">
               <div class="hd opacity" data-animation-effect="fadeInUp"
                  data-effect-delay="300">
                  <span>나의 여행</span> <strong>발자취 돌아보기</strong>
               </div>
               <div class="bd opacity" data-animation-effect="fadeInUp"
                  data-effect-delay="600">
                  <p>지난 여행과 현재 진행중인 여행을</p>
                  <p>살펴볼 수 있습니다</p>
               </div>
            </div>

            <a href="<%=myctx%>/mypage" target="_blank">
               <div class="group">
                  <div class="group-box2 hd opacity"
                     data-animation-effect="fadeInUp" data-effect-delay="300">
                     <div class="profile profile01"></div>
                     <div class="group-txt2">
                        <p class="mtxt_black">여의나루 한 바퀴 굴러봐요~</p>
                        <br />
                        <p class="mtxt_gray3">퇴근 후 고등학교 친구들과 한강 보며 여의나루 한 바퀴</p>
                        <br />
                        <p class="mtxt_small_blue">여의나루 3번 출구</p>
                        <img class="m-arrow" src="./asset/images/blt_open.png" />
                        <p class="mtxt_small_blue">서울특별시 용산구 원효로4가 118-20</p>
                        <br />
                        <p class="mtxt_small_gray">2020-02-24</p>
                     </div>
                     <button type="button" id="enter" class="enter">이동</button>
                  </div>

                  <div class="group-box2 hd opacity"
                     data-animation-effect="fadeInUp" data-effect-delay="600">
                     <div class="profile profile02"></div>
                     <div class="group-txt2">
                        <p class="mtxt_black">따릉이 애용자</p>
                        <br />
                        <p class="mtxt_gray3">따릉이 이용하는 분들~ 선유도에서 모여요 :)</p>
                        <br />
                        <p class="mtxt_small_blue">선유도역 4번출구 미니스톱</p>
                        <img class="m-arrow" src="./asset/images/blt_open.png" />
                        <p class="mtxt_small_blue">선유도역 1번출구</p>
                        <br />
                        <p class="mtxt_small_gray">2020-01-07</p>
                     </div>
                     <button type="button" id="enter" class="enter">이동</button>
                  </div>

                  <div class="group-box2 hd opacity"
                     data-animation-effect="fadeInUp" data-effect-delay="900">
                     <div class="profile profile03"></div>
                     <div class="group-txt2">
                        <p class="mtxt_black">따뜻한 봄 뚝섬에서 자전거타고 저녁 먹으실분 구해요</p>
                        <br />
                        <p class="mtxt_gray3">30 여성입니다~ 주말에 뚝섬에서 자전거타고 건대에서 양꼬치 드실분?</p>
                        <br />
                        <p class="mtxt_small_blue">서울특별시 성동구 뚝섬로 273 (성수동)</p>
                        <img class="m-arrow" src="./asset/images/blt_open.png" />
                        <p class="mtxt_small_blue">건대입구역 1번출구</p>
                        <br />
                        <p class="mtxt_small_gray">2020-03-12</p>
                     </div>
                     <button type="button" id="enter" class="enter">이동</button>
                  </div>
               </div>
            </a>
         </div>
      </div>
   </div>
   <!-- /index02-->

   <div class="section index05">
      <div class="inner">
         <h2 class="main-tit">CAMPAIGN</h2>
         <div class="inbx">
            <div class="desc opacity" data-animation-effect="fadeInUp"
               data-effect-delay="300">캠페인</div>
               
            <div class="part-bx opacity" data-animation-effect="fadeInUp"
               data-effect-delay="600">
               <div class="side-bx">
                  <div class="swiper-wrapper">

                     <div class="swiper-slide item">
                        <c:if test="${campaignArr==null || empty campaignArr }">
                           <tr>
                              <td colspan="5"><b>현재 게시된 캠페인이 없습니다.</b></td>
                           </tr>
                        </c:if>
                        <c:if test="${campaignArr !=null and not empty campaignArr }">
                           <ul onclick="window.open('${campaign.campaign_url}')">
                              <c:forEach var="campaign" items="${campaignArr}" begin='0'
                                 end='14'>
                                 <li class="copr">
                                 <img src="resources/images/campaign/${campaign.campaign_image}">
                                    <div class="ul_back">
                                       <span> ${campaign.campaign_start_date} ~
                                          ${campaign.campaign_finish_date}</span>
                                    </div>
                                 </li>
                              </c:forEach>
                           </ul>
                        </c:if>
                     </div>

                     <div class="swiper-slide item">
                        <c:if test="${campaignArr==null || empty campaignArr }">
                           <tr>
                              <td colspan="5"><b>현재 게시된 캠페인이 없습니다.</b></td>
                           </tr>
                        </c:if>
                        <c:if test="${campaignArr !=null and not empty campaignArr }">
                           <ul>
                              <c:forEach var="campaign" items="${campaignArr}" begin='15'
                                 end='29'>
                                 <li class="copr"><img
                                    src="resources/images/campaign/${campaign.campaign_image}">
                                    <div class="ul_back">
                                       <span> ${campaign.campaign_start_date} ~
                                          ${campaign.campaign_finish_date}</span>
                                    </div></li>

                              </c:forEach>
                           </ul>
                        </c:if>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="pager"></div>
      </div>
      <!-- /part-bx -->
        <c:import url="/foot" />
   </div>
   </div>
   
 