<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!-- 
네이티브 앱 키
9335eb31f40641f27958ee6d8b376633
REST API 키
6847df70139976328199d2666350aff1
JavaScript 키
090a0d4aa4a82c8faeda1ca19496e386
Admin 키
b0f9614dc396a192a2fe7d8f9123b8b9 -->

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<title>Kakao 지도 시작하기</title>
</head>
<body>
	<h1>Kakao 지도 시작하기</h1>
	<div id="map" style="width:500px;height:400px;"></div>
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=9335eb31f40641f27958ee6d8b376633"></script>
	<script>
		var container = document.getElementById('map');
		var options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3
		};

		var map = new kakao.maps.Map(container, options);
	</script>
</body>
</html>