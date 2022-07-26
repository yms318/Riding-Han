<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:import url="/top" />

<script type="text/javascript"
   src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=n2rwg8ji5r&amp;submodules=geocoder"></script>

<div id="container">
   <div id="wrap" class="section">
      <!-- map 검색 -->
      <div id="map" style="width: 100%; height: 100%;"></div>
   </div>
</div>

<script id="code">
   var bicycleLayer = new naver.maps.BicycleLayer();
   var mapCenter = new naver.maps.LatLng(37.5349277, 126.9027279);
   var markers = [];
   var markerInfos = [];
   var gpxfile;

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
   
   function getPlace(place_no) {
      $.ajax({
         type : 'POST',
         data : {
            place_no : place_no
         },
         url : 'getPlaceById',
         async: false,
         dataType : 'json',
         cache : false,
         success : function(res) {
            addMarkerInfosMatrix(res);
         },
         error : function(err) {
            alert("place() "+err.status)
         }
      })
   }
   
   function getDirection() {
      $.ajax({
         type : 'POST',
         data : {
            direction_no : '${direction_no}'
         },
         url : 'getDirctionById',
         async: false,
         dataType : 'json',
         cache : false,
         success : function(res) {
            getPlace(res.place_from);
            getPlace(res.place_to);
            gpxfile=res.gpxfile;
         },
         error : function(err) {
            alert("direction() "+err.status)
         }
      })
   }
   
   function viewDirection() {
      $.ajax({
         url : '../asset/gpx/' + gpxfile,
         dataType : 'xml',
         success : startDataLayer,
         error : function(e) {
            alert('error: ' + e.status);
         }
      });
   }
   
   function startDataLayer(xmlDoc) {
      map.data.addGpx(xmlDoc);
      map.data.setStyle(function(feature) {
         var color = 'red';

         if (feature.getProperty('isColorful')) {
            color = feature.getProperty('color');
         }

         return {
            strokeColor : color,
            strokeWeight : 4,
            icon : null
         };
      });
   }

   function initGeocoder() {
      
      getDirection();
      viewMarkers();
      bicycleLayer.setMap(map);
      viewDirection();
   }

   function addMarkerInfosMatrix(place) {
      var markerInfo = {
         title : "",
         x : "",
         y : "",
         road : "",
         jibun : ""
      };
      markerInfo.title = place.title;
      markerInfo.x = place.longitude;
      markerInfo.y = place.latitude;
      markerInfo.road = place.road_address;
      markerInfo.jibun = place.jibun_address;
      markerInfos.push(markerInfo);
   }
   
   function setMapBounds(point1, point2){
      var maxX=0, minX=0, maxY=0, minY=0;
      if(point1.x > point2.x){
         minX=point2.x;
         maxX=point1.x;
      } else {
         minX=point1.x;
         maxX=point2.x;
      }
      if(point1.y > point2.y){
         minY=point2.y;
         maxY=point1.y;
      } else {
         minY=point1.y;
         maxY=point2.y;
      }
      let ySpan = (maxY - minY) * 0.01;
      if(ySpan < 0.03) ySpan = 0.01;
      let xSpan = (maxX - minX) * 0.01;
      if(xSpan < 0.03) xSpan = 0.01;
      
      let northEast= new naver.maps.LatLng(maxY+ySpan, maxX+xSpan);
      let southWest= new naver.maps.LatLng(minY-ySpan, minX-xSpan);
      
      let centerX, centerY;
      centerX=(minX+maxX)/2;
      centerY=(minY+maxY)/2;
      setMapCenter(new naver.maps.LatLng(centerY, centerX));
      map.setCenter(mapCenter);
      
      var mapBounds = new naver.maps.LatLngBounds(southWest, northEast);
      map.fitBounds(mapBounds);
   }

   function viewMarkers() {
      infoWindow.close();
      setMapBounds(markerInfos[0], markerInfos[1]);
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
            title : markerInfos[i].title,
            map : map,
            icon : icon
         });

         marker.set('seq', i);
         markers.push(marker);
         
         marker.addListener('mouseover', onMouseOver);
         marker.addListener('mouseout', onMouseOut);

         icon = null;
         marker = null;
      }
      
      var mapBounds = map.getBounds();
      map.fitBounds(mapBounds);
   }

   function displayPointInfo(latlng, title, coordinate, road, jibun) {
      infoWindow.close();
      infoWindow.setContent([
            '<div style="padding:10px;min-width:200px;line-height:150%;">',
            '<h3 style="text-align:center;" >:: 장소 정보::</h3>', '명칭:',
            title, '<br>', coordinate, '<br>', road, '<br>', jibun, '<br>',
            '</div>' ].join('\n'));
      infoWindow.open(map, latlng);
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
      displayPointInfo(markers[seq].position, title, coordinate, road, jibun);
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