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
.search #searchingPlace { width:150px;height:20px;line-height:20px;border:solid 1px #555;padding:5px;font-size:12px;box-sizing:content-box; }
.search #submit { height:30px;line-height:30px;padding:0 10px;font-size:12px;border:solid 1px #555;border-radius:3px;cursor:pointer;box-sizing:content-box; }
.search #send { height:30px;line-height:30px;padding:0 10px;font-size:12px;border:solid 1px #555;border-radius:3px;cursor:pointer;box-sizing:content-box; }
</style>

<div id="wrap" class="section">
    <h2>주소와 좌표 검색 API 사용하기</h2>
    <p>Geocoder 서브 모듈의 Service 객체를 사용하여 주소로 좌표를 검색하거나(Geocode) 좌표로 주소를 검색하는(Reversegeocode) 예제입니다.<br />
    입력 창에 주소를 입력하여 검색하면 해당 주소의 좌표로 이동하며, 지도를 클릭하면 해당 지점의 경위도 좌표로 주소를 검색합니다.</p>
	<div id="map" style="width: 100%; height: 600px;">
		<div class="search" style="">
			<input id="searchingPlace" type="text" placeholder="검색할 장소" value="당산역" />
			<input id="submit" type="button" value="검색" />
			<input id="send" type="button" value="경로찾기" />
		</div>
	</div>
	<div id="points"></div>
	<code id="snippet" class="snippet"></code>
</div>

<script id="code">
	var selectPoints = 0;
	var selectedPoints = [];
	var bicycleLayer = new naver.maps.BicycleLayer();
	var mapCenter = new naver.maps.LatLng(37.5349277,126.9027279);
	
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
							markerInfo.title="클릭한 지점";
							markerInfo.x = latlng.x;
							markerInfo.y = latlng.y;

							for (var i = 0, ii = items.length, item, addrType; i < ii; i++) {
								item = items[i];
								address = makeAddress(item) || '';
								addrType = item.name === 'roadaddr' ? '[도로명 주소]'
										: '[지번 주소]';

								htmlAddresses.push((i + 1) + '. ' + addrType
										+ ' ' + address);
								
								if(addrType=='[도로명 주소]'){
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
											latlng, '<br>',
											latlng.x,",",latlng.y,'<br>',
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

		$('#searchingPlace').on('keydown', function(e) {
			var keyCode = e.which;

			if (keyCode === 13) { // Enter Key
				searchingPlace($('#searchingPlace').val());
			}
		});

		$('#submit').on('click', function(e) {
			e.preventDefault();
			searchingPlace($('#searchingPlace').val());
		});

		$('#send').on('click', function(e) {
			e.preventDefault();
			// 여기에  경로찾기(direction API) function call
			findDirection();
		});

		bicycleLayer.setMap(map);
	}

	function findDirection() {
		if (selectPoints < 2) {
			alert("먼저 출발지점과 도착지점을 설정하세요.")
			return;
		} else {
			$.ajax({
				type : 'POST',
				url : '../Directions',
				data : {
					startx : selectedPoints[0].x,
					starty : selectedPoints[0].y,
					endx : selectedPoints[1].x,
					endy : selectedPoints[1].y,
				},
				dataType : 'text', //응답유형 xml
				cashe : 'false',
				success : function(res) {
					viewDirection(res);
				},
				error : function(e) {
					alert('error: ' + e.status);
				}
			})
		}
	}

	function searchingPlace(place) {
		var center = map.getCenter();
		setMapCenter(center);
		$.ajax({
			type : 'POST',
			url : '../SearchPlaces',
			data : {
				place : place,
				lng : mapCenter.x,
				lat : mapCenter.y
			},
			dataType : 'json', //응답유형 text
			cashe : 'false',
			success : function(res) {
				makePlaceMatrix(res.places);
				viewMarkers();
			},
			error : function(e) {
				alert('error: ' + e.status);
			}
		})
	}

	var bounds = map.getBounds(), southWest = bounds.getSW(), northEast = bounds
			.getNE(), lngSpan = northEast.lng() - southWest.lng(), latSpan = northEast
			.lat()
			- southWest.lat();

	var markers = [];
	var latlngs = [];
	//var directions = [];
	var distance;
	var markerInfos = [];

	function viewDirection(distance) {
		$.ajax({
			url: '../test.gpx',
		    dataType: 'xml',
		    success: startDataLayer,
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
	            strokeColor: color,
	            strokeWeight: 4,
	            icon: null
	        };
	    });
	}

	function makePlaceMatrix(resPlaces) {
		// markerInfos 비우기
		while (markerInfos.length > 0) {
			markerInfos.shift();
		}
		$.each(resPlaces, function(i, place) {
			var markerInfo = {
				title : "",
				x : "",
				y : "",
				road : "",
				jibun : ""
			};
			markerInfo.title = place.name;
			markerInfo.x = place.x;
			markerInfo.y = place.y;
			markerInfo.road = place.road_address;
			markerInfo.jibun = place.jibun_address;
			markerInfos.push(markerInfo);
		})
	}
	
	function viewMarkers() {
		infoWindow.close();
		// markerInfos 비우기
		while (markers.length > 0) {
			markers[0].setMap(null);
			markers.shift();
		}
		for (var i = 0, ii = markerInfos.length; i < ii; i++) {
			// console.log(latlngs[i]);
			var icon = {
				url : './images/sp_pins_spot_v3.png',
				size : new naver.maps.Size(24, 37),
				anchor : new naver.maps.Point(12, 37),
				origin : new naver.maps.Point(i * 29, 0)
			}, marker = new naver.maps.Marker({
				position : new naver.maps.LatLng(markerInfos[i].y,markerInfos[i].x),
				title : markerInfos[i].toString(),
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
		setMapCenter(markers[0].position);
		map.setCenter(mapCenter);
	}

	function displayPointInfo(latlng, title, coordinate, road, jibun) {
		infoWindow.close();
		infoWindow.setContent([
				'<div style="padding:10px;min-width:200px;line-height:150%;">',
				'<h3 style="text-align:center;" >:: 장소 정보::</h3>', '명칭:', title, '<br>',
				coordinate, '<br>', road, '<br>', jibun, '<br>', '</div>' ]
				.join('\n'));
		infoWindow.open(map, latlng);
	}

	function showPoints(places, number) {
		var str = "<h1>선정된 지점</h1>";
		str += "<table class='table table-bordered' border='1'>";
		str += "<tr class='success'>";
		str += "<th>지명</th><th>동경</th><th>위도</th><th>주소</th>";
		str += "<th>출발/도착</th><th>경로검색</th>";

		str += "</tr>"
		$
				.each(
						places,
						function(i, place) {
							str += "<tr><td>" + place.title + "</td>";
							str += "<td>" + place.x + "</td>";
							str += "<td>" + place.y + "</td>";
							str += "<td>" + place.road + "<br>" + place.jibun
									+ "</td>";
							if (i == 0) {
								str += "<td>출발</td>";
								if (number == 2) {
									str += "<td rowspan='2'><button id='direction'>경로찾기</button></td>";
								}
							} else if (i == 1) {
								str += "<td>도착</td>";
							}

						})
		str += "</table>";
		$('#points').empty();//비워주기
		$('#points').html(str);
	}//------------------------------

	function clickMouse(e) {
		var marker = e.overlay, seq = marker.get('seq');
		var url=null;
		if(selectPoints==0) {
			url='../images/start.png';
		} else if(selectPoints==1) {
			url='../images/finish.png';
		}
		marker.setIcon({
			url : url,
			size : new naver.maps.Size(32, 20),
			origin : new naver.maps.Point(0, 0)
		});
		
		selectPoints++;
		if (selectPoints > 2) {
			selectedPoints.pop();
			selectPoints = 2;
		}
		/* alert(seq + " 마커 클릭\n" + markerInfos[seq].title + "\n"
				+ markerInfos[seq].x + "\n" + markerInfos[seq].y + "\n"
				+ markerInfos[seq].road + "\n" + markerInfos[seq].jibun); */
		selectedPoints.push(markerInfos[seq]);
		showPoints(selectedPoints, selectPoints);
	}

	function onMouseOver(e) {
		var marker = e.overlay, seq = marker.get('seq');

		marker.setIcon({
			url : './images/sp_pins_spot_v3_over.png',
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
			url : './images/sp_pins_spot_v3.png',
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

</body>
</html>
