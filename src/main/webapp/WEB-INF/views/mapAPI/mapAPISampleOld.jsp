<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Geocoder | 주소와 좌표 검색 API 사용하기</title>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <!-- <script type="text/javascript" src="../../docs/js/examples-base.js"></script>
    <script type="text/javascript" src="../../docs/js/highlight.min.js"></script> -->
    <!-- clientId ==> ncpClientId로 변경해야 인증 됨 -->
    <script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=n2rwg8ji5r&amp;submodules=geocoder"></script>
  <!--   <link rel="stylesheet" type="text/css" href="../../docs/css/examples-base.css" /> -->
</head>
<body>

<!-- @category Geocoder -->

<style type="text/css">
.search { position:absolute;z-index:1000;top:20px;left:20px; }
.search #address { width:150px;height:20px;line-height:20px;border:solid 1px #555;padding:5px;font-size:12px;box-sizing:content-box; }
.search #submit { height:30px;line-height:30px;padding:0 10px;font-size:12px;border:solid 1px #555;border-radius:3px;cursor:pointer;box-sizing:content-box; }
</style>

<div id="wrap" class="section">
    <h2>주소와 좌표 검색 API 사용하기</h2>
    <p>Geocoder 서브 모듈의 Service 객체를 사용하여 주소로 좌표를 검색하거나(Geocode) 좌표로 주소를 검색하는(Reversegeocode) 예제입니다.<br />
    입력 창에 주소를 입력하여 검색하면 해당 주소의 좌표로 이동하며, 지도를 클릭하면 해당 지점의 경위도 좌표로 주소를 검색합니다.</p>
	<div id="map" style="width: 100%; height: 600px;">
		<div class="search" style="">
			<select name="smode" id="smode">
				<option value="place" selected>지명 찾기</option>
				<option value="roadaddr">도로명주소</option>
				<option value="jibunaddr">(구)지번주소</option>
			</select>
			<input id="address" type="text" placeholder="검색할 장소" value="시청" />
			<input id="submit" type="button" value="검색" />
		</div>
	</div>
	<code id="snippet" class="snippet"></code>
</div>

<script id="code">
	var selectPoints = 0;
	var bicycleLayer = new naver.maps.BicycleLayer();
	var mapCenter = new naver.maps.LatLng(37.3595316, 127.1052133);
	
	function setMapCenter(center) {
		mapCenter=center;
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
			position : naver.maps.Position.LEFT_CENTER
		},
		scaleControl : true,
		scaleControlOptions : {
			position : naver.maps.Position.BOTTOM_LEFT
		},
		logoControl : true,
		logoControlOptions : {
			position : naver.maps.Position.TOP_LEFT
		},
		mapDataControl : true,
		mapDataControlOptions : {
			position : naver.maps.Position.BOTTOM_LEFT
		},
	};

	var map = new naver.maps.Map(document.getElementById('map'), mapOptions);

	var infoWindow = new naver.maps.InfoWindow({
		anchorSkew : true
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

							for (var i = 0, ii = items.length, item, addrType; i < ii; i++) {
								item = items[i];
								address = makeAddress(item) || '';
								addrType = item.name === 'roadaddr' ? '[도로명 주소]'
										: '[지번 주소]';

								htmlAddresses.push((i + 1) + '. ' + addrType
										+ ' ' + address);
							}

							infoWindow
									.setContent([
											'<div style="padding:10px;min-width:200px;line-height:150%;">',
											'<h4 style="margin-top:5px;">검색 좌표</h4><br />',
											latlng, '<br>',
											latlng.x,",",latlng.y,'<br>',
											htmlAddresses.join('<br />'),
											'</div>' ].join('\n'));

							infoWindow.open(map, latlng);
						});
	}
	
	

	function searchAddressToCoordinate(address) {
		naver.maps.Service
				.geocode(
						{
							query : address
						},
						function(status, response) {
							if (status === naver.maps.Service.Status.ERROR) {
								return alert('Something Wrong!');
							}

							if (response.v2.meta.totalCount === 0) {
								return alert('totalCount'
										+ response.v2.meta.totalCount);
							}

							var htmlAddresses = [], item = response.v2.addresses[0], point = new naver.maps.Point(
									item.x, item.y);

							if (item.roadAddress) {
								htmlAddresses.push('[도로명 주소] '
										+ item.roadAddress);
							}

							if (item.jibunAddress) {
								htmlAddresses.push('[지번 주소] '
										+ item.jibunAddress);
							}

							if (item.englishAddress) {
								htmlAddresses.push('[영문명 주소] '
										+ item.englishAddress);
							}

							infoWindow
									.setContent([
											'<div style="padding:10px;min-width:200px;line-height:150%;">',
											'<h4 style="margin-top:5px;">검색 주소 : '
													+ address + '</h4><br />',
											point, '<br>',
											htmlAddresses.join('<br />'),
											'</div>' ].join('\n'));

							map.setCenter(point);
							infoWindow.open(map, point);
						});
	}

	function initGeocoder() {
		map.addListener('click', function(e) {
			searchCoordinateToAddress(e.coord);
		});

		$('#address').on('keydown', function(e) {
			var keyCode = e.which;

			if (keyCode === 13) { // Enter Key
				searchAddressToCoordinate($('#address').val());
			}
		});

		$('#submit').on('click', function(e) {
			e.preventDefault();
			//alert($('#smode').val());
			if ($('#smode').val() == "place") {
				var center=map.getCenter();
				setMapCenter(center);
				$.ajax({
					type : 'POST',
					url : '../SearchPlaces',
					data : {
						place : $('#address').val(),
						lng : mapCenter.x,
						lat : mapCenter.y
					},
					dataType : 'json', //응답유형 text
					cashe : 'false',
					success : function(res) {
						//alert(JSON.stringify(res));
						//alert(JSON.stringify(res.places));
						makePlaceMatrix(res.places)
						viewMarkers();
					},
					error : function(e) {
						alert('error: ' + e.status);
					}
				})
			} else {
				searchAddressToCoordinate($('#address').val());
			}
		});

		bicycleLayer.setMap(map);
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

	var bounds = map.getBounds(),
    	southWest = bounds.getSW(),
    	northEast = bounds.getNE(),
    	lngSpan = northEast.lng() - southWest.lng(),
    	latSpan = northEast.lat() - southWest.lat();

	var markers = [];
	var latlngs = [];
	var markerTitles = [];
	
	function makePlaceMatrix(resPlaces) {
		while(latlngs.length > 0) {
			// marker 지우기, 이전 마커 배열에서 삭제, 이전 마커 제목 삭제 
			markers[0].setMap(null);
			latlngs.shift();
			markerTitles.shift();
		}
		$.each(resPlaces, function(i, place){
			// alert(i+": "+place.x+", "+place.y+", "+place.name);
			var markPoint=new naver.maps.LatLng(place.y, place.x);
			latlngs.push(markPoint);
			var markerTitle=place.name+"\n"+place.road_address+"\n"+place.jibun_address;
			markerTitles.push(markerTitle);
		})
	}

	function viewMarkers() {
		for (var i = 0, ii = latlngs.length; i < ii; i++) {
			// console.log(latlngs[i]);
			var icon = {
				url : './images/sp_pins_spot_v3.png',
				size : new naver.maps.Size(24, 37),
				anchor : new naver.maps.Point(12, 37),
				origin : new naver.maps.Point(i * 29, 0)
			}, marker = new naver.maps.Marker({
				position : latlngs[i],
				title : markerTitles[i],
				map : map,
				icon : icon
			});

			marker.set('seq', i);

			markers.push(marker);

			marker.addListener('mouseover', onMouseOver);
			marker.addListener('mouseout', onMouseOut);
			marker.addListener('click', clickMouse);
			
			icon = null;
			marker = null;
		}
	}
	
	function clickMouse(e) {
		var marker = e.overlay, seq = marker.get('seq');
		selectPoints++;
		
		alert(seq+" 마커 클릭\n"
				+markers[seq].position.x+", "+markers[seq].position.y+"\n"
				+markers[seq].title);
	}

	function onMouseOver(e) {
		var marker = e.overlay, seq = marker.get('seq');

		marker.setIcon({
			url : './images/sp_pins_spot_v3_over.png',
			size : new naver.maps.Size(24, 37),
			anchor : new naver.maps.Point(12, 37),
			origin : new naver.maps.Point(seq * 29, 50)
		});
		
	}

	function onMouseOut(e) {
		var marker = e.overlay, seq = marker.get('seq');

		marker.setIcon({
			url : './images/sp_pins_spot_v3.png',
			size : new naver.maps.Size(24, 37),
			anchor : new naver.maps.Point(12, 37),
			origin : new naver.maps.Point(seq * 29, 0)
		});
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

</body>
</html>
