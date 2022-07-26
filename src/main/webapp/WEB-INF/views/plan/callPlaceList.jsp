<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
   String myctx = request.getContextPath();
%>

<script type="text/javascript"
   src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=n2rwg8ji5r&amp;submodules=geocoder"></script>
<!--자바스크립트 / CSS-->
<link href="<%=myctx%>/asset/css/style.css" rel="stylesheet">
<script src="<%=myctx%>/asset/js/jquery.min.js"></script>
<script src="https://ajax.googleapiscom/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="<%=myctx%>/asset/js/common.js"></script>
<script src="<%=myctx%>/asset/js/custom.js"></script>

<!--부트스트랩-->
<link rel="stylesheet" href="<%=myctx%>/asset/css/bootstrap.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

<style>
/* Map 플레이스 리스트 */

.picon {
   font-weight: 400;
   font-size: 1.18rem;
   color: #1B1B1F;
   margin: 25px 0 10px 0;
}

#container .picon::before {
   content: '';
   width: 35px;
   height: 30px;
   display: inline-block;
   background: url('<%=myctx%>/asset/images/mappick.png') 50% 50% no-repeat;
   vertical-align: -7px;
   margin-right: 5px;
}

.maplist-group {
   width: 100%;
   background-color: #fffff;
   margin: auto;
   padding: 16px 23px;
}
</style>


<div id="container" style="height:100%">
   <div class="inbx">
      <div class="inner">
         <div class="maplist-group">
            
            <p class="picon">등록된 장소</p>
            <input type="button" onclick="location.href='<%=myctx%>/plan/callDirectionList'" 
        		class="serchbtn-wh btn-sm-1" value="경로" style="float:right"/>
            <input type="button" onclick="location.href='<%=myctx%>/plan/callPlaceList'" 
            class="serchbtn-wh btn-sm-1" value="장소" style="float:right"/>
        
            <p class="texttt">
               총 등록장소 <b class="mtxt_blue" style="display: inline-block">${totalCount}</b>개
            
            <p>
               <br>
            <div id="map" style="width: 100%; height: 300px;"></div>
            <br>
            <table class="table" style="font-size: 14px">
               <thead style="background-color: #F7F8F9">
                  <tr>
                     <th width="7%">번호</th>
                     <th>장소이름</th>
                     <!-- <th width="10%">위도</th>
                     <th width="10%">경도</th> -->
                     <th width="25%">도로명주소</th>
                     <th colspan="2">지번주소</th>
                  </tr>
               </thead>
               <!-- --------------------------- -->
               <tbody>
                  <c:forEach var="place" items="${placeArr}">
                     <tr>
                        <td>${place.place_no}</td>
                        <td>${place.title}</td>
                        <%-- <td><fmt:formatNumber value="${place.latitude}"
                              pattern="###.#####" /></td>
                        <td><fmt:formatNumber value="${place.longitude}"
                              pattern="###.#####" /></td> --%>
                        <td>${place.road_address}</td>
                        <td>${place.jibun_address}</td>
                        <td width="7%">
                           <!-- href속성값에 자바스크립트 함수를 넣을 때는 반드시 함수 앞에 "javascript:" 접두어를 붙여주자 -->
                           <a href="javascript:select('${place.place_no}','${place.title}')">선택</a>
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
         </div>
      </div>
   </div>
</div>



<!-- 등록할 장소 처리시 사용할 form -->
<form name="frm" id="frm">
   <input type="hidden" name="place_no" id="place_no">
   <!-- hidden data -->
</form>

<!-- 내 주변 장소들 보여주기 form start--------------------------------------------------- -->
<form name="myLocation" id="myLocation">
   <input type="hidden" name="title" id="title"> <input
      type="hidden" name="latitude" id="latitude"> <input
      type="hidden" name="longitude" id="longitude"> <input
      type="hidden" name="road_address" id="road_address"> <input
      type="hidden" name="jibun_address" id="jibun_address">
</form>
<!-- ----------------------------------------------------------------------- -->

<!-- 장소 선택 관련 form start--------------------------------------------------- -->
<form name="place" id="place" >
   <input type="hidden" name="title" id="title1"> <input
      type="hidden" name="latitude" id="latitude1"> <input
      type="hidden" name="longitude" id="longitude1"> <input
      type="hidden" name="road_address" id="road_address1"> <input
      type="hidden" name="jibun_address" id="jibun_address1">
</form>
<!-- ----------------------------------------------------------------------- -->

<script>
   function select(place_no,title) {
	   var arr={'place_no':place_no,
			   'place_title':title};
      $.ajax({
    	  type:'GET',
    	  url:'/RidingHan/plan/callPlace',
    	  data:arr,
    	  success:function(res){
    		  opener.location.reload('/RidingHan/plan');
    		  window.close();
    	  },error:function(e){
              alert('error: '+e.status);
          }
   })
   }

   var bicycleLayer = new naver.maps.BicycleLayer();
   var mapCenter = new naver.maps.LatLng(37.5349277, 126.9027279);

   var placeNearbyMap = function() {
      $('#latitude').val(mapCenter.y);
      $('#longitude').val(mapCenter.x);
      var params = $('#myLocation').serialize();
      //alert(params);
      $.ajax({
         type : 'POST',
         data : params,
         url : '../map/placeNearbyMap',
         dataType : 'json',
         cache : false,
         success : function(res) {
            //alert(res);
            makePlaceMatrix(res);
            viewMarkers();
         },
         error : function(err) {
            alert(err.status)
         }
      })
   }

   function setMapCenter(center) {
      mapCenter = center;
   }

   var mapOptions = {
      center : mapCenter,
      mapTypeControl : true,
      mapTypeControlOptions : {
         style : naver.maps.MapTypeControlStyle.BUTTON,
         position : naver.maps.Position.TOP_RIGHT
      },
      zoomControl : true,
      zoomControlOptions : {
         style : naver.maps.ZoomControlStyle.LARGE,
         position : naver.maps.Position.RIGHT_CENTER
      },
      scaleControl : true,
      scaleControlOptions : {
         position : naver.maps.Position.BOTTOM_LEFT
      },
      logoControl : true,
      logoControlOptions : {
         position : naver.maps.Position.TOP_RIGHT
      },
      mapDataControl : true,
      mapDataControlOptions : {
         position : naver.maps.Position.BOTTOM_LEFT
      },
   };

   var map = new naver.maps.Map(document.getElementById('map'), mapOptions);

   var infoWindow = new naver.maps.InfoWindow({
      backgroundColor : "#eee",
      borderColor : "#2db400",
      borderWidth : 5,
      anchorSize : new naver.maps.Size(30, 30),
      anchorSkew : true,
      anchorColor : "#eee",
      pixelOffset : new naver.maps.Point(20, -20)
   });

   map.setCursor('pointer');

   function searchCoordinateToAddress(latlng) {

      infoWindow.close();

      naver.maps.Service
            .reverseGeocode(
                  {
                     coords : latlng,
                     orders : [ naver.maps.Service.OrderType.ADDR,
                           naver.maps.Service.OrderType.ROAD_ADDR ]
                           .join(',')
                  },
                  function(status, response) {
                     if (status === naver.maps.Service.Status.ERROR) {
                        return alert('Something Wrong!');
                     }

                     var items = response.v2.results, address = '', htmlAddresses = [];
                     var markerInfo = {
                        title : "",
                        x : "",
                        y : "",
                        road : "",
                        jibun : ""
                     };
                     markerInfo.title = "클릭한 지점";
                     markerInfo.x = latlng.x;
                     markerInfo.y = latlng.y;

                     for (var i = 0, ii = items.length, item, addrType; i < ii; i++) {
                        item = items[i];
                        address = makeAddress(item) || '';
                        addrType = item.name === 'roadaddr' ? '[도로명 주소]'
                              : '[지번 주소]';

                        htmlAddresses.push((i + 1) + '. ' + addrType
                              + ' ' + address);

                        if (addrType == '[도로명 주소]') {
                           markerInfo.road = address;
                        } else {
                           markerInfo.jibun = address;
                        }
                     }

                     markerInfos.push(markerInfo);
                     viewMarkers();

                     infoWindow
                           .setContent([
                                 '<div style="padding:10px;min-width:200px;line-height:150%;">',
                                 '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
                                 latlng, '<br>', latlng.x, ",",
                                 latlng.y, '<br>',
                                 htmlAddresses.join('<br />'),
                                 '</div>' ].join('\n'));

                     infoWindow.open(map, latlng);
                  });
   }

   function makeAddress(item) {
      if (!item) {
         return;
      }

      var name = item.name, region = item.region, land = item.land, isRoadAddress = name === 'roadaddr';

      var sido = '', sigugun = '', dongmyun = '', ri = '', rest = '';

      if (hasArea(region.area1)) {
         sido = region.area1.name;
      }

      if (hasArea(region.area2)) {
         sigugun = region.area2.name;
      }

      if (hasArea(region.area3)) {
         dongmyun = region.area3.name;
      }

      if (hasArea(region.area4)) {
         ri = region.area4.name;
      }

      if (land) {
         if (hasData(land.number1)) {
            if (hasData(land.type) && land.type === '2') {
               rest += '산';
            }

            rest += land.number1;

            if (hasData(land.number2)) {
               rest += ('-' + land.number2);
            }
         }

         if (isRoadAddress === true) {
            if (checkLastString(dongmyun, '면')) {
               ri = land.name;
            } else {
               dongmyun = land.name;
               ri = '';
            }

            if (hasAddition(land.addition0)) {
               rest += ' ' + land.addition0.value;
            }
         }
      }

      return [ sido, sigugun, dongmyun, ri, rest ].join(' ');
   }

   function hasArea(area) {
      return !!(area && area.name && area.name !== '');
   }

   function hasData(data) {
      return !!(data && data !== '');
   }

   function checkLastString(word, lastString) {
      return new RegExp(lastString + '$').test(word);
   }

   function hasAddition(addition) {
      return !!(addition && addition.value);
   }

   function initGeocoder() {
      placeNearbyMap();
      bicycleLayer.setMap(map);
   }

   var bounds = map.getBounds(), southWest = bounds.getSW(), northEast = bounds
         .getNE(), lngSpan = northEast.lng() - southWest.lng(), latSpan = northEast
         .lat()
         - southWest.lat();

   var markers = [];
   var markerInfos = [];

   function makePlaceMatrix(resPlaces) {
      // alert("resPlaces : " + resPlaces);
      $.each(resPlaces, function(i, place) {
         var markerInfo = {
            title : "",
            x : "",
            y : "",
            road : "",
            jibun : ""
         };
         markerInfo.no = place.place_no;
         markerInfo.title = place.title;
         markerInfo.x = place.longitude;
         markerInfo.y = place.latitude;
         markerInfo.road = place.road_address;
         markerInfo.jibun = place.jibun_address;
         markerInfos.push(markerInfo);
      })
   }

   function viewMarkers() {
      infoWindow.close();
      // markers 비우기
      while (markers.length > 0) {
         markers[0].setMap(null);
         markers.shift();
      }
      for (var i = 0, ii = markerInfos.length; i < ii; i++) {
         var icon = {
            url : '../asset/images/sp_pins_spot_v3.png',
            size : new naver.maps.Size(24, 37),
            anchor : new naver.maps.Point(12, 37),
            origin : new naver.maps.Point(i * 29, 0)
         }, marker = new naver.maps.Marker({
            position : new naver.maps.LatLng(markerInfos[i].y,
                  markerInfos[i].x),
            title : markerInfos[i].toString(),
            map : map,
            icon : icon
         });

         marker.set('seq', i);
         markers.push(marker);

         marker.addListener('mouseover', onMouseOver);
         marker.addListener('mouseout', onMouseOut);
         marker.addListener('mousedown', clickMouse);

         icon = null;
         marker = null;
      }
      setMapCenter(markers[0].position);
      map.setCenter(mapCenter);
   }

   function displayPointInfo(no, latlng, title, coordinate, road, jibun) {
      //alert("place_no="+no);
      infoWindow.close();
      infoWindow.setContent([
            '<div style="padding:10px;min-width:200px;line-height:150%;">',
            '<h3 style="text-align:center;" >:: ', no,'번 장소::</h3>', '명칭:',
            title, '<br>', coordinate, '<br>', road, '<br>', jibun, '<br>',
            '</div>' ].join('\n'));
      infoWindow.open(map, latlng);
   }

   function showPoints(place) {
      var str = place.title + "<br>";
      if (place.road != null)
         str += place.road + "<br>";
      if (place.jibun != null)
         str += place.jibun;
      $('#placeInfo').empty();//비워주기
      $('#placeInfo').html(str);
   }//------------------------------

   function clickMouse(e) {
      var marker = e.overlay, seq = marker.get('seq');
      marker.setIcon({
         url : '../asset/images/start.png',
         size : new naver.maps.Size(32, 20),
         origin : new naver.maps.Point(0, 0)
      });
      showPoints(markerInfos[seq]);
   }

   function onMouseOver(e) {
      var marker = e.overlay, seq = marker.get('seq');
      marker.setIcon({
         url : '../asset/images/sp_pins_spot_v3_over.png',
         size : new naver.maps.Size(24, 37),
         anchor : new naver.maps.Point(12, 37),
         origin : new naver.maps.Point(seq * 29, 50)
      });
      var title = markerInfos[seq].title;
      var coordinate = "경도: " + markerInfos[seq].x + ", " + "위도: "
            + markerInfos[seq].y;
      var road = markerInfos[seq].road;
      var jibun = markerInfos[seq].jibun;
      displayPointInfo(markerInfos[seq].no, markers[seq].position, title, 
            coordinate, road, jibun);
   }

   function onMouseOut(e) {
      var marker = e.overlay, seq = marker.get('seq');
      marker.setIcon({
         url : '../asset/images/sp_pins_spot_v3.png',
         size : new naver.maps.Size(24, 37),
         anchor : new naver.maps.Point(12, 37),
         origin : new naver.maps.Point(seq * 29, 0)
      });
      infoWindow.close();
   }

   naver.maps.Event.addListener(map, 'idle', function() {
      updateMarkers(map, markers);
   });

   function updateMarkers(map, markers) {

      var mapBounds = map.getBounds();
      var marker, position;

      for (var i = 0; i < markers.length; i++) {

         marker = markers[i]
         position = marker.getPosition();

         if (mapBounds.hasLatLng(position)) {
            showMarker(map, marker);
         } else {
            hideMarker(map, marker);
         }
      }
   }

   function showMarker(map, marker) {

      if (marker.getMap())
         return;
      marker.setMap(map);
   }

   function hideMarker(map, marker) {

      if (!marker.getMap())
         return;
      marker.setMap(null);
   }

   naver.maps.onJSContentLoaded = initGeocoder;
</script>