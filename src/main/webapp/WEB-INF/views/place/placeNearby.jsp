<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:import url="/top" />

<script type="text/javascript"
   src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=n2rwg8ji5r&amp;submodules=geocoder"></script>

<!--자바스크립트 / CSS-->
<link href="../asset/css/style.css" rel="stylesheet">

<style type="text/css">
#startPointInfo {
   height: 60px;
   font-size: 0.5em;
}

#endPointInfo {
   height: 60px;
   font-size: 0.5em;
}
</style>

<!-- ===== wrap ====== -->
<div id="container">
   <div id="wrap" class="section">
      <!-- map 검색 -->
      <div id="map" style="width: 100%; height: 600px;"></div>
      <div id="map_search">
         <a class="logo" href="index.html"> <img
            src="../asset/images/RUN_LOGO.png"></a> <img
            src="../asset/images/hangang_kor.png">
         <p class="sub">마이 라이딩</p>
      </div>
      <div id="map_check">
         <table>
            <tr>
               <td><span id="myPoint" class="myPoint">내 지점</span></td>
            </tr>
            <tr>
               <td style="text-align: center;"><input id="placeNearbyMap"
                  submit="placeNearbyMap" type="button" value="내장소 설정" /></td>
            </tr>
            <tr>
               <td><span id="pointInfo" class="departure">선정 지점</span></td>
            </tr>
            <tr>
               <td style="text-align: center;"><input id="selectPoint"
                  submit="selectPlace" type="button" value="선택확인" /></td>
            </tr>
         </table>
      </div>
   </div>
   
   <!-- 내 주변 징서들 보여주기 form start--------------------------------------------------- -->
   <form name="myLocation" id="myLocation">
      <input type="hidden" name="title" id="title">
      <input type="hidden" name="latitude" id="latitude">
      <input type="hidden" name="longitude" id="longitude">
      <input type="hidden" name="road_address" id="road_address">
      <input type="hidden" name="jibun_address" id="jibun_address">
   </form>
   <!-- ----------------------------------------------------------------------- -->

   <!-- 장서 선택 관련 form start--------------------------------------------------- -->
   <form name="point1" id="point">
      <input type="hidden" name="title" id="title2">
      <input type="hidden" name="latitude" id="latitude2"> 
      <input type="hidden" name="longitude" id="longitude2">
      <input type="hidden" name="road_address" id="road_address2">
      <input type="hidden" name="jibun_address" id="jibun_address2">
   </form>
   <!-- ----------------------------------------------------------------------- -->
</div>

<!-- ===== /indexwrap ====== -->
<script id="code">
   var bicycleLayer = new naver.maps.BicycleLayer();
   var mapCenter = new naver.maps.LatLng(37.5349277, 126.9027279);

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
                     
                     markerInfo.title = "내 위치";
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
      
      map.addListener('click', function(e) {
         searchCoordinateToAddress(e.coord);
      });
      
      $('#placeNearbyMap').on('click', function(e) {
         e.preventDefault();
         placeNearbyMap();
      });
      
      bicycleLayer.setMap(map);
   }

   var bounds = map.getBounds(), southWest = bounds.getSW(), northEast = bounds
         .getNE(), lngSpan = northEast.lng() - southWest.lng(), latSpan = northEast
         .lat()
         - southWest.lat();

   var markers = [];
   var markerInfos = [];
   var selectMyPlace = [];
   var selectPlace = [];

   var placeNearbyMap = function() {
      $('#latitude').val(selectMyPlace[0].y);
      $('#longitude').val(selectMyPlace[0].x);
      var params = $('#myLocation').serialize();
      // alert(params);
      $.ajax({
         type : 'POST',
         data : params,
         url : 'placeNearbyMap',
         dataType : 'json',
         cache : false,
         success : function(res) {
            //alert(res);
            makePlaceMatrix(res);
            viewMarkers();
            // 등록버튼 변경
            // 등록버튼 비활성화
         },
         error : function(err) {
            alert(err.status)
         }
      })
   }
   
   function makePlaceMatrix(places) {
      // alert("places : "+places[0].title);
      for (var i = 0; i < places.length; i++) {
         var markerInfo = {
               title : "",
               x : "",
               y : "",
               road : "",
               jibun : ""
            };
         markerInfo.no = places[i].place_no;
         markerInfo.title = places[i].name;
         markerInfo.x = places[i].longitude;
         markerInfo.y = places[i].latitude;
         markerInfo.road = places[i].road_address;
         markerInfo.jibun = places[i].jibun_address;
         markerInfos.push(markerInfo);
      }
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
   
   function showMyPoints(place) {
      var str = place.title + "<br>";
      if (place.road != null)
         str += place.road + "<br>";
      if (place.jibun != null)
         str += place.jibun;
      $('#myPoint').empty();//비워주기
      $('#myPoint').html(str);
   }//------------------------------

   function showPoints(place) {
      var str = place.title + "<br>";
      if (place.road != null)
         str += place.road + "<br>";
      if (place.jibun != null)
         str += place.jibun;
      $('#pointInfo').empty();//비워주기
      $('#pointInfo').html(str);
   }//------------------------------

   function clickMouse(e) {
      var marker = e.overlay, seq = marker.get('seq');
      marker.setIcon({
         url : '../asset/images/start.png',
         size : new naver.maps.Size(32, 20),
         origin : new naver.maps.Point(0, 0)
      });
      if(selectMyPlace.length >= 1) {
         selectPlace.push(markerInfos[seq]);
         showPoints(markerInfos[seq]);
      } else {
         selectMyPlace.push(markerInfos[seq]);
         showMyPoints(markerInfos[seq]);
      }
      
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
      displayPointInfo(markerInfos[seq].no, markers[seq].position, title, coordinate, road, jibun);
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