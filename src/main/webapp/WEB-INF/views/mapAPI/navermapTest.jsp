<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>

<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, shrink-to-fit=no">
<title>주소와 좌표 검색 API 사용하기 | 네이버 지도 API v3</title>
<meta name="description" content="Example: 주소와 좌표 검색 API 사용하기">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="NAVER Maps API v3">
<meta name="twitter:description"
	content="NAVER Maps API v3로 여러분의 지도를 만들어 보세요. 유용한 기술문서와 다양한 예제 코드를 제공합니다.">
<meta name="twitter:image"
	content="https://navermaps.github.io/maps.js/docs/img/NAVERMaps.png">
<meta name="twitter:url" content="https://navermaps.github.io/maps.js">

<link type="text/css" rel="stylesheet"
	href="styles/sunlight.default.css">
<link type="text/css" rel="stylesheet" href="styles/site.flatly.css">
<link type="text/css" rel="stylesheet" href="./css/highlightjs.css">
</head>


<body>

	<div class="container" id="toc-content">
		<div class="row">


			<div class="col-md-12">

				<div id="main" itemscope itemtype="https://schema.org/TechArticle">
					<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
					<script type="text/javascript" src="./js/base.js"></script>
					<script type="text/javascript"
						src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=n2rwg8ji5r&amp;submodules=panorama,geocoder,drawing,visualization"></script>
					<link rel="stylesheet" type="text/css" href="./css/base.css" />

					<section class="tutorial-section">
						<header></header>
						<article>
							<style type="text/css">
.search {
	position: absolute;
	z-index: 1000;
	top: 20px;
	left: 20px;
}

.search #address {
	width: 150px;
	height: 20px;
	line-height: 20px;
	border: solid 1px #555;
	padding: 5px;
	font-size: 12px;
	box-sizing: content-box;
}

.search #submit {
	height: 30px;
	line-height: 30px;
	padding: 0 10px;
	font-size: 12px;
	border: solid 1px #555;
	border-radius: 3px;
	cursor: pointer;
	box-sizing: content-box;
}
</style>

							<div id="wrap" class="section">
								<h2>주소와 좌표 검색 API 사용하기</h2>
								<p>
									Geocoder 서브 모듈의 Service 객체를 사용하여 주소로 좌표를 검색하거나(Geocode) 좌표로 주소를
									검색하는(Reversegeocode) 예제입니다.<br /> 입력 창에 주소를 입력하여 검색하면 해당 주소의
									좌표로 이동하며, 지도를 클릭하면 해당 지점의 경위도 좌표로 주소를 검색합니다.
								</p>
								<div id="map" style="width: 100%; height: 600px;">
									<div class="search" style="">
										<input id="address" type="text" placeholder="검색할 주소" value="불정로 6" />
										<input id="submit" type="button" value="주소 검색" />
									</div>
								</div>
								<code id="snippet" class="snippet"></code>
							</div>

							<script id="code">
var map = new naver.maps.Map("map", {
    center: new naver.maps.LatLng(37.3595316, 127.1052133),
    zoom: 10,
    mapTypeControl: true
});

var infoWindow = new naver.maps.InfoWindow({
    anchorSkew: true
});

map.setCursor('pointer');

function searchCoordinateToAddress(latlng) {

    infoWindow.close();

    naver.maps.Service.reverseGeocode({
        coords: latlng,
        orders: [
            naver.maps.Service.OrderType.ADDR,
            naver.maps.Service.OrderType.ROAD_ADDR
        ].join(',')
    }, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            return alert('Something Wrong!');
        }

        var items = response.v2.results,
            address = '',
            htmlAddresses = [];

        for (var i=0, ii=items.length, item, addrType; i<ii; i++) {
            item = items[i];
            address = makeAddress(item) || '';
            addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';

            htmlAddresses.push((i+1) +'. '+ addrType +' '+ address);
        }

        infoWindow.setContent([
            '<div style="padding:10px;min-width:200px;line-height:150%;">',
            '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
            htmlAddresses.join('<br />'),
            '</div>'
        ].join('\n'));

        infoWindow.open(map, latlng);
    });
}

function searchAddressToCoordinate(address) {
    naver.maps.Service.geocode({
        query: address
    }, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            return alert('Something Wrong!');
        }

        if (response.v2.meta.totalCount === 0) {
            return alert('totalCount' + response.v2.meta.totalCount);
        }

        var htmlAddresses = [],
            item = response.v2.addresses[0],
            point = new naver.maps.Point(item.x, item.y);

        if (item.roadAddress) {
            htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
        }

        if (item.jibunAddress) {
            htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
        }

        if (item.englishAddress) {
            htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
        }

        infoWindow.setContent([
            '<div style="padding:10px;min-width:200px;line-height:150%;">',
            '<h4 style="margin-top:5px;">검색 주소 : '+ address +'</h4><br />',
            htmlAddresses.join('<br />'),
            '</div>'
        ].join('\n'));

        map.setCenter(point);
        alert(point);
        infoWindow.open(map, point);
    });
}

function initGeocoder() {
    map.addListener('click', function(e) {
        searchCoordinateToAddress(e.coord);
        alert(e.coord);
    });

    $('#address').on('keydown', function(e) {
        var keyCode = e.which;

        if (keyCode === 13) { // Enter Key
            searchAddressToCoordinate($('#address').val());
        }
    });

    $('#submit').click(function(e){
        e.preventDefault();
        alert($('#address').val());
        searchAddressToCoordinate($('#address').val());
    });

    searchAddressToCoordinate('정자동 178-1');
}

function makeAddress(item) {
    if (!item) {
        return;
    }

    var name = item.name,
        region = item.region,
        land = item.land,
        isRoadAddress = name === 'roadaddr';

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

    return [sido, sigugun, dongmyun, ri, rest].join(' ');
}

function hasArea(area) {
    return !!(area && area.name && area.name !== '');
}

function hasData(data) {
    return !!(data && data !== '');
}

function checkLastString (word, lastString) {
    return new RegExp(lastString + '$').test(word);
}

function hasAddition (addition) {
    return !!(addition && addition.value);
}

naver.maps.onJSContentLoaded = initGeocoder;
</script>




						</article>

					</section>

				</div>
			</div>

			<div class="clearfix"></div>



		</div>
	</div>

	<div class="modal fade" id="searchResults">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">Search results</h4>
				</div>
				<div class="modal-body"></div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>

	<div class="footer">

		<span class="jsdoc-message"> Documentation generated by <a
			href="https://github.com/jsdoc3/jsdoc">JSDoc 3.5.5</a> using the <a
			href="https://github.com/docstrap/docstrap">DocStrap template</a>.
		</span>
	</div>

	<script>
$( function () {
    $( "[id*='$']" ).each( function () {
        var $this = $( this );

        $this.attr( "id", $this.attr( "id" ).replace( "$", "__" ) );
    } );


    $('pre').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    if (isTocSupported) {
        $.catchAnchorLinks( {
            navbarOffset: 10
        } );

        $( "#toc" ).toc( {
            anchorName  : function ( i, heading, prefix ) {
                var id = $( heading ).attr( "id" );
                return id && id.replace(/\~/g, '-inner-').replace(/\./g, '-static-') || ( prefix + i );
            },
            selectors   : "#toc-content h1,#toc-content h2,#toc-content h3,#toc-content h4",
            showAndHide : false,
            smoothScrolling: true
        } );
    }

    $( "#main span[id^='toc']" ).addClass( "toc-shim" );
    $( '.dropdown-toggle' ).dropdown();
    $( "table" ).each( function () {
      var $this = $( this );
      $this.addClass('table');
    } );
    $("#main>section:not('.tutorial-section')").localScroll({
        offset: {
            top: -170 //offset by the height of your header (give or take a few px, see what works for you)
        }
    });
} );
</script>

	<script type="text/javascript">
    if (isSearchSupported) {
        $(document).ready(function() {
            SearcherDisplay.init();

            var w = $(window);
            $('.dropdown-menu').on('mousewheel', function(e, d) {
                var t = $(this),
                    up = e.originalEvent.deltaY < 0;

                if (w.width() < 768) return;

                if (up) {
                    if (t.scrollTop() === 0) e.preventDefault();
                } else {
                    if (t.scrollTop() == t.get(0).scrollHeight - t.innerHeight()) e.preventDefault();
                }
            })
        });
    }
</script>

	<script type="text/javascript" src="https://wcs.naver.net/wcslog.js"></script>
	<script type="text/javascript">
    if (!wcs_add) var wcs_add = {};
    wcs_add["wa"] = "ab0d1ce292d4cc";
    wcs_do();
</script>
</body>
</html>