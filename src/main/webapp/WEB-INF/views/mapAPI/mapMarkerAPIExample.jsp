<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>

<html lang="ko">
<head>
    <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon">
    <link href="/favicon.ico" rel="icon" type="image/x-icon">

    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, shrink-to-fit=no">
    <title>Marker | 네이버 지도 API v3</title>
    <meta name="description" content="Class: naver.maps.Marker">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="NAVER Maps API v3 바로가기">
    <meta property="og:title" content="NAVER Maps API v3">
    <meta property="og:description" content="NAVER Maps API v3로 여러분의 지도를 만들어 보세요. 유용한 기술문서와 다양한 예제 코드를 제공합니다.">
    <meta property="og:image" content="https://navermaps.github.io/maps.js/docs/img/NAVERMaps.png">
    <meta property="og:url" content="https://navermaps.github.io/maps.js">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="NAVER Maps API v3">
    <meta name="twitter:description" content="NAVER Maps API v3로 여러분의 지도를 만들어 보세요. 유용한 기술문서와 다양한 예제 코드를 제공합니다.">
    <meta name="twitter:image" content="https://navermaps.github.io/maps.js/docs/img/NAVERMaps.png">
    <meta name="twitter:url" content="https://navermaps.github.io/maps.js">

    <!--[if lt IE 9]>
    <style type="text/css">
    .dropdown-menu {
       max-height: 500px !important;
    }
    </style>
    <![endif]-->
    <link type="text/css" rel="stylesheet" href="styles/sunlight.default.css">
    <link type="text/css" rel="stylesheet" href="styles/site.flatly.css">
    <link type="text/css" rel="stylesheet" href="./css/highlightjs.css">
</head>


<body>

<div class="container" id="toc-content">
<div class="row">

    
    <div class="col-md-8">
    
        <div id="main" itemscope itemtype="https://schema.org/TechArticle">
            <div style="display:none;">
                <div itemprop="image" itemscope, itemtype="http://schema.org/ImageObject">
                    <meta itemprop="thumbnailUrl" content="./img/logo_200x200.png">
                    <img src="./img/logo_200x200.png" alt="logo">
                </div>
                <div>
                    <a href="tutorial-0-Getting-Started.html" itemprop="mainEntityOfPage">Tutorials</a>
                    <a href="tutorial-digest.example.html" itemprop="mainEntityOfPage">Examples</a>
                    <span itemprop="keywords">naver</span>
                    <span itemprop="keywords">map</span>
                    <span itemprop="keywords">js</span>
                    <span itemprop="keywords">api</span>
                    <span itemprop="keywords">v3</span>
                    <span itemprop="keywords">네이버 지도 API</span>
                    <span itemprop="keywords">Marker</span>
                </div>
            </div>
            

	<h1 class="page-title">Class: naver.maps.Marker</h1>
<section>

<header>
    
        <h2>
            <span class="ancestors"><a href="naver.html">naver</a><a href="naver.maps.html">.maps</a>.</span>
        
        Marker
        </h2>
        
            <div class="class-description" itemprop="description"><p><code>Marker</code> 클래스는 지도 위에 올리는 마커를 정의합니다.</p></div>
        
    
</header>


<article>
    <div class="container-overview">
    
        
<dt>
    <h4 class="name" id="Marker"><span class="type-signature"></span>new naver.maps.Marker(options)</h4>

    
</dt>
<dd>

    

    

    

    
    
        <h5>Parameters</h5>
        

<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Name</th>
        

        <th>Type</th>

        

        

        <th class="last">Description</th>
    </tr>
    </thead>

    <tbody>
    

        <tr>
            
                <td class="name"><code>options</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="naver.maps.Marker.html#~MarkerOptions">naver.maps.Marker~MarkerOptions</a> -->
    <a href="naver.maps.Marker.html#~MarkerOptions">MarkerOptions</a>
    </span>



            
            </td>

            

            

            <td class="description last"><p>마커 옵션. 이때 <code>position</code> 속성은 반드시 설정해야 합니다.</p></td>
        </tr>

    
    </tbody>
</table>

    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	
	<dt class="tag-tutorial method-doc-label method-doc-details-label">Tutorials</dt>
	<dd class="tag-tutorial">
		<ul>
			<li><em class="disabled">Tutorial: Marker</em></li>
			</ul>
	</dd>
	

	

	
</dl>


    

    

    

    

    

    

    
</dd>

    
    </div>

    
        <h3 class="subsection-title">Extends</h3>

        


    <ul>
        <li><a href="naver.maps.OverlayView.html">naver.maps.OverlayView</a></li>
    </ul>


    

    

    

    

    

    

    
        <h3 class="subsection-title">Methods</h3>

        <dl>
            
<dt>
    <h4 class="name" id="draw"><span class="type-signature">&lt;abstract> </span>draw()</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>지도에 오버레이를 그릴 때 호출됩니다. 지도의 창(pane) 위에 원하는 오버레이를 그리고, 배치하는 기능을 구현합니다.</p>
    </div>
    

    

    

    
    

    
<dl class="details">
    

	

	

	
	<dt class="inherited-from method-doc-label method-doc-details-label">Inherited From</dt>
	<dd class="inherited-from">
		<ul class="dummy">
			<li>
				<a href="naver.maps.OverlayView.html#draw">naver.maps.OverlayView#draw</a>
			</li>
		</ul>
	</dd>
	

    
    <dt class="tag-overrides">Overrides</dt>
    <dd class="tag-overrides"><ul class="dummy"><li>
        <a href="naver.maps.OverlayView.html#draw">naver.maps.OverlayView#draw</a>
    </li></ul></dd>
    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    

    

    

    

    

    
</dd>

        
            
<dt>
    <h4 class="name" id="getAnimation"><span class="type-signature"></span>getAnimation()</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마커의 애니메이션을 반환합니다.</p>
    </div>
    

    

    

    
    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    

    

    

    

    
    <h5>Returns</h5>
    
            <!-- 
<div class="param-desc">
    <p><code>Animation</code> 객체</p>
</div>



<dl>
    <dt>
        Type
    </dt>
    <dd>
        
<span class="param-type"><a href="naver.maps.html#.Animation">naver.maps.Animation</a></span>



    </dd>
</dl>


 -->
<!-- ! -->


<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Type</th>
        

        
        <th class="last">Description</th>
        
    </tr>
    </thead>

    <tbody>
        <tr>
            
                <td class="name"><code>
<span class="param-type">
    
    <!-- <a href="naver.maps.html#.Animation">naver.maps.Animation</a> -->
    <a href="naver.maps.html#.Animation">naver.maps.Animation</a>
    </span>


</code></td>
            

            
                <td class="description last"><p><code>Animation</code> 객체</p></td>

            
        </tr>
    </tbody>
</table>

        

    
</dd>

        
            
<dt>
    <h4 class="name" id="getClickable"><span class="type-signature"></span>getClickable()</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마커의 클릭 허용 여부를 반환합니다.</p>
    </div>
    

    

    

    
    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    

    

    

    

    
    <h5>Returns</h5>
    
            <!-- 
<div class="param-desc">
    <p>마커 클릭 허용 여부</p>
</div>



<dl>
    <dt>
        Type
    </dt>
    <dd>
        
<span class="param-type"><a href="global.html#boolean">boolean</a></span>



    </dd>
</dl>


 -->
<!-- ! -->


<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Type</th>
        

        
        <th class="last">Description</th>
        
    </tr>
    </thead>

    <tbody>
        <tr>
            
                <td class="name"><code>
<span class="param-type">
    
    <!-- <a href="global.html#boolean">boolean</a> -->
    <a href="global.html#boolean">boolean</a>
    </span>


</code></td>
            

            
                <td class="description last"><p>마커 클릭 허용 여부</p></td>

            
        </tr>
    </tbody>
</table>

        

    
</dd>

        
            
<dt>
    <h4 class="name" id="getContainerTopLeft"><span class="type-signature"></span>getContainerTopLeft()</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>현재 지도 컨테이너 요소의 <code>left</code>, <code>top</code> 픽셀값을 반환합니다.</p>
    </div>
    

    

    

    
    

    
<dl class="details">
    

	

	

	
	<dt class="inherited-from method-doc-label method-doc-details-label">Inherited From</dt>
	<dd class="inherited-from">
		<ul class="dummy">
			<li>
				<a href="naver.maps.OverlayView.html#getContainerTopLeft">naver.maps.OverlayView#getContainerTopLeft</a>
			</li>
		</ul>
	</dd>
	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    

    

    

    

    
    <h5>Returns</h5>
    
            <!-- 


<dl>
    <dt>
        Type
    </dt>
    <dd>
        
<span class="param-type"><a href="naver.maps.Point.html">naver.maps.Point</a></span>



    </dd>
</dl>


 -->
<!-- ! -->


<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Type</th>
        

        
    </tr>
    </thead>

    <tbody>
        <tr>
            
                <td class="name"><code>
<span class="param-type">
    
    <!-- <a href="naver.maps.Point.html">naver.maps.Point</a> -->
    <a href="naver.maps.Point.html">naver.maps.Point</a>
    </span>


</code></td>
            

            
        </tr>
    </tbody>
</table>

        

    
</dd>

        
            
<dt>
    <h4 class="name" id="getCursor"><span class="type-signature"></span>getCursor()</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마우스 오버 시 반영되는 마우스 포인터 모양을 반환합니다.</p>
    </div>
    

    

    

    
    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    

    

    

    

    
    <h5>Returns</h5>
    
            <!-- 
<div class="param-desc">
    <p>마우스 포인터 모양</p>
</div>



<dl>
    <dt>
        Type
    </dt>
    <dd>
        
<span class="param-type"><a href="global.html#string">string</a></span>



    </dd>
</dl>


 -->
<!-- ! -->


<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Type</th>
        

        
        <th class="last">Description</th>
        
    </tr>
    </thead>

    <tbody>
        <tr>
            
                <td class="name"><code>
<span class="param-type">
    
    <!-- <a href="global.html#string">string</a> -->
    <a href="global.html#string">string</a>
    </span>


</code></td>
            

            
                <td class="description last"><p>마우스 포인터 모양</p></td>

            
        </tr>
    </tbody>
</table>

        

    
</dd>

        
            
<dt>
    <h4 class="name" id="getDraggable"><span class="type-signature"></span>getDraggable()</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마커의 드래그 허용 여부를 반환합니다.</p>
    </div>
    

    

    

    
    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    

    

    

    

    
    <h5>Returns</h5>
    
            <!-- 
<div class="param-desc">
    <p>마커 드래그 허용 여부</p>
</div>



<dl>
    <dt>
        Type
    </dt>
    <dd>
        
<span class="param-type"><a href="global.html#boolean">boolean</a></span>



    </dd>
</dl>


 -->
<!-- ! -->


<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Type</th>
        

        
        <th class="last">Description</th>
        
    </tr>
    </thead>

    <tbody>
        <tr>
            
                <td class="name"><code>
<span class="param-type">
    
    <!-- <a href="global.html#boolean">boolean</a> -->
    <a href="global.html#boolean">boolean</a>
    </span>


</code></td>
            

            
                <td class="description last"><p>마커 드래그 허용 여부</p></td>

            
        </tr>
    </tbody>
</table>

        

    
</dd>

        
            
<dt>
    <h4 class="name" id="getDrawingRect"><span class="type-signature"></span>getDrawingRect()</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마커가 그려지는 영역의 경계 좌표를 반환합니다. 기준 좌표는 세계 좌표를 화면 픽셀로 변환한 픽셀 좌표입니다. 좌표 체계에 대한 자세한 설명은 지도 투영의 좌표 체계를 참고합니다.</p>
    </div>
    

    

    

    
    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    

    

    

    

    
    <h5>Returns</h5>
    
            <!-- 
<div class="param-desc">
    <p>경계 좌표</p>
</div>



<dl>
    <dt>
        Type
    </dt>
    <dd>
        
<span class="param-type"><a href="global.html#Bounds">Bounds</a></span>



    </dd>
</dl>


 -->
<!-- ! -->


<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Type</th>
        

        
        <th class="last">Description</th>
        
    </tr>
    </thead>

    <tbody>
        <tr>
            
                <td class="name"><code>
<span class="param-type">
    
    <!-- <a href="global.html#Bounds">Bounds</a> -->
    <a href="global.html#Bounds">Bounds</a>
    </span>


</code></td>
            

            
                <td class="description last"><p>경계 좌표</p></td>

            
        </tr>
    </tbody>
</table>

        

    
</dd>

        
            
<dt>
    <h4 class="name" id="getIcon"><span class="type-signature"></span>getIcon()</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마커의 모양을 표현하는 아이콘 객체를 반환합니다.</p>
    </div>
    

    

    

    
    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    

    

    

    

    
    <h5>Returns</h5>
    
            <!-- 
<div class="param-desc">
    <p>아이콘 객체</p>
</div>



<dl>
    <dt>
        Type
    </dt>
    <dd>
        
<span class="param-type"><a href="naver.maps.Marker.html#~ImageIcon">naver.maps.Marker~ImageIcon</a></span>
|

<span class="param-type"><a href="naver.maps.Marker.html#~SymbolIcon">naver.maps.Marker~SymbolIcon</a></span>
|

<span class="param-type"><a href="naver.maps.Marker.html#~HtmlIcon">naver.maps.Marker~HtmlIcon</a></span>



    </dd>
</dl>


 -->
<!-- ! -->


<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Type</th>
        

        
        <th class="last">Description</th>
        
    </tr>
    </thead>

    <tbody>
        <tr>
            
                <td class="name"><code>
<span class="param-type">
    
    <!-- <a href="naver.maps.Marker.html#~ImageIcon">naver.maps.Marker~ImageIcon</a> -->
    <a href="naver.maps.Marker.html#~ImageIcon">ImageIcon</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="naver.maps.Marker.html#~SymbolIcon">naver.maps.Marker~SymbolIcon</a> -->
    <a href="naver.maps.Marker.html#~SymbolIcon">SymbolIcon</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="naver.maps.Marker.html#~HtmlIcon">naver.maps.Marker~HtmlIcon</a> -->
    <a href="naver.maps.Marker.html#~HtmlIcon">HtmlIcon</a>
    </span>


</code></td>
            

            
                <td class="description last"><p>아이콘 객체</p></td>

            
        </tr>
    </tbody>
</table>

        

    
</dd>

        
            
<dt>
    <h4 class="name" id="getMap"><span class="type-signature"></span>getMap()</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>현재 오버레이가 추가된 <code>Map</code> 객체를 반환합니다.</p>
    </div>
    

    

    

    
    

    
<dl class="details">
    

	

	

	
	<dt class="inherited-from method-doc-label method-doc-details-label">Inherited From</dt>
	<dd class="inherited-from">
		<ul class="dummy">
			<li>
				<a href="naver.maps.OverlayView.html#getMap">naver.maps.OverlayView#getMap</a>
			</li>
		</ul>
	</dd>
	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    

    

    

    

    
    <h5>Returns</h5>
    
            <!-- 
<div class="param-desc">
    <p><code>Map</code> 객체</p>
</div>



<dl>
    <dt>
        Type
    </dt>
    <dd>
        
<span class="param-type"><a href="naver.maps.Map.html">naver.maps.Map</a></span>
|

<span class="param-type"><a href="global.html#null">null</a></span>



    </dd>
</dl>


 -->
<!-- ! -->


<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Type</th>
        

        
        <th class="last">Description</th>
        
    </tr>
    </thead>

    <tbody>
        <tr>
            
                <td class="name"><code>
<span class="param-type">
    
    <!-- <a href="naver.maps.Map.html">naver.maps.Map</a> -->
    <a href="naver.maps.Map.html">naver.maps.Map</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="global.html#null">null</a> -->
    <a href="global.html#null">null</a>
    </span>


</code></td>
            

            
                <td class="description last"><p><code>Map</code> 객체</p></td>

            
        </tr>
    </tbody>
</table>

        

    
</dd>

        
            
<dt>
    <h4 class="name" id="getOptions"><span class="type-signature"></span>getOptions(<span class="optional">key</span>)</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마커 옵션을 반환합니다.</p>
    </div>
    

    

    

    
    
        <h5>Parameters</h5>
        

<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Name</th>
        

        <th>Type</th>

        
        <th>Argument</th>
        

        

        <th class="last">Description</th>
    </tr>
    </thead>

    <tbody>
    

        <tr>
            
                <td class="name"><code>key</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#string">string</a> -->
    <a href="global.html#string">string</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                

                
                </td>
            

            

            <td class="description last"><p>반환받을 옵션 이름</p></td>
        </tr>

    
    </tbody>
</table>

    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    

    

    

    

    
    <h5>Returns</h5>
    
            <!-- 
<div class="param-desc">
    <p>마커 옵션</p>
</div>



<dl>
    <dt>
        Type
    </dt>
    <dd>
        
<span class="param-type"><a href="naver.maps.Marker.html#~MarkerOptions">naver.maps.Marker~MarkerOptions</a></span>



    </dd>
</dl>


 -->
<!-- ! -->


<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Type</th>
        

        
        <th class="last">Description</th>
        
    </tr>
    </thead>

    <tbody>
        <tr>
            
                <td class="name"><code>
<span class="param-type">
    
    <!-- <a href="naver.maps.Marker.html#~MarkerOptions">naver.maps.Marker~MarkerOptions</a> -->
    <a href="naver.maps.Marker.html#~MarkerOptions">MarkerOptions</a>
    </span>


</code></td>
            

            
                <td class="description last"><p>마커 옵션</p></td>

            
        </tr>
    </tbody>
</table>

        

    
</dd>

        
            
<dt>
    <h4 class="name" id="getPanes"><span class="type-signature"></span>getPanes()</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>오버레이 요소를 추가할 수 있는 지도의 창(pane) 요소 집합 객체를 반환합니다.</p>
    </div>
    

    

    

    
    

    
<dl class="details">
    

	

	

	
	<dt class="inherited-from method-doc-label method-doc-details-label">Inherited From</dt>
	<dd class="inherited-from">
		<ul class="dummy">
			<li>
				<a href="naver.maps.OverlayView.html#getPanes">naver.maps.OverlayView#getPanes</a>
			</li>
		</ul>
	</dd>
	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    

    

    

    

    
    <h5>Returns</h5>
    
            <!-- 
<div class="param-desc">
    <p><code>MapPanes</code> 객체</p>
</div>



<dl>
    <dt>
        Type
    </dt>
    <dd>
        
<span class="param-type"><a href="naver.maps.Map.html#~MapPanes">naver.maps.Map~MapPanes</a></span>



    </dd>
</dl>


 -->
<!-- ! -->


<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Type</th>
        

        
        <th class="last">Description</th>
        
    </tr>
    </thead>

    <tbody>
        <tr>
            
                <td class="name"><code>
<span class="param-type">
    
    <!-- <a href="naver.maps.Map.html#~MapPanes">naver.maps.Map~MapPanes</a> -->
    <a href="naver.maps.Map.html#~MapPanes">MapPanes</a>
    </span>


</code></td>
            

            
                <td class="description last"><p><code>MapPanes</code> 객체</p></td>

            
        </tr>
    </tbody>
</table>

        

    
</dd>

        
            
<dt>
    <h4 class="name" id="getPosition"><span class="type-signature"></span>getPosition()</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마커의 위치를 반환합니다.</p>
    </div>
    

    

    

    
    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    

    

    

    

    
    <h5>Returns</h5>
    
            <!-- 
<div class="param-desc">
    <p>마커 위치</p>
</div>



<dl>
    <dt>
        Type
    </dt>
    <dd>
        
<span class="param-type"><a href="global.html#Coord">Coord</a></span>



    </dd>
</dl>


 -->
<!-- ! -->


<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Type</th>
        

        
        <th class="last">Description</th>
        
    </tr>
    </thead>

    <tbody>
        <tr>
            
                <td class="name"><code>
<span class="param-type">
    
    <!-- <a href="global.html#Coord">Coord</a> -->
    <a href="global.html#Coord">Coord</a>
    </span>


</code></td>
            

            
                <td class="description last"><p>마커 위치</p></td>

            
        </tr>
    </tbody>
</table>

        

    
</dd>

        
            
<dt>
    <h4 class="name" id="getProjection"><span class="type-signature"></span>getProjection()</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>지도 좌표, 화면 좌표 간에 변환할 수 있는 <code>MapSystemProjection</code> 객체를 반환합니다. 반환된 객체를 이용해 지도 위의 원하는 위치에 오버레이를 배치할 수 있습니다.</p>
    </div>
    

    

    

    
    

    
<dl class="details">
    

	

	

	
	<dt class="inherited-from method-doc-label method-doc-details-label">Inherited From</dt>
	<dd class="inherited-from">
		<ul class="dummy">
			<li>
				<a href="naver.maps.OverlayView.html#getProjection">naver.maps.OverlayView#getProjection</a>
			</li>
		</ul>
	</dd>
	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    

    

    

    

    
    <h5>Returns</h5>
    
            <!-- 
<div class="param-desc">
    <p><code>MapSystemProjection</code> 객체</p>
</div>



<dl>
    <dt>
        Type
    </dt>
    <dd>
        
<span class="param-type"><a href="naver.maps.MapSystemProjection.html">naver.maps.MapSystemProjection</a></span>



    </dd>
</dl>


 -->
<!-- ! -->


<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Type</th>
        

        
        <th class="last">Description</th>
        
    </tr>
    </thead>

    <tbody>
        <tr>
            
                <td class="name"><code>
<span class="param-type">
    
    <!-- <a href="naver.maps.MapSystemProjection.html">naver.maps.MapSystemProjection</a> -->
    <a href="naver.maps.MapSystemProjection.html">naver.maps.MapSystemProjection</a>
    </span>


</code></td>
            

            
                <td class="description last"><p><code>MapSystemProjection</code> 객체</p></td>

            
        </tr>
    </tbody>
</table>

        

    
</dd>

        
            
<dt>
    <h4 class="name" id="getShape"><span class="type-signature"></span>getShape()</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마커의 이벤트 영역 셰이프를 반환합니다.</p>
    </div>
    

    

    

    
    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    

    

    

    

    
    <h5>Returns</h5>
    
            <!-- 
<div class="param-desc">
    <p>마커 셰이프 객체</p>
</div>



<dl>
    <dt>
        Type
    </dt>
    <dd>
        
<span class="param-type"><a href="naver.maps.Marker.html#~MarkerShape">naver.maps.Marker~MarkerShape</a></span>



    </dd>
</dl>


 -->
<!-- ! -->


<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Type</th>
        

        
        <th class="last">Description</th>
        
    </tr>
    </thead>

    <tbody>
        <tr>
            
                <td class="name"><code>
<span class="param-type">
    
    <!-- <a href="naver.maps.Marker.html#~MarkerShape">naver.maps.Marker~MarkerShape</a> -->
    <a href="naver.maps.Marker.html#~MarkerShape">MarkerShape</a>
    </span>


</code></td>
            

            
                <td class="description last"><p>마커 셰이프 객체</p></td>

            
        </tr>
    </tbody>
</table>

        

    
</dd>

        
            
<dt>
    <h4 class="name" id="getTitle"><span class="type-signature"></span>getTitle()</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마커의 타이틀을 반환합니다. 타이틀은 마커에 마우스 포인터를 올리면 나타나는 툴팁의 문자열입니다.</p>
    </div>
    

    

    

    
    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    

    

    

    

    
    <h5>Returns</h5>
    
            <!-- 
<div class="param-desc">
    <p>마커 타이틀</p>
</div>



<dl>
    <dt>
        Type
    </dt>
    <dd>
        
<span class="param-type"><a href="global.html#string">string</a></span>



    </dd>
</dl>


 -->
<!-- ! -->


<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Type</th>
        

        
        <th class="last">Description</th>
        
    </tr>
    </thead>

    <tbody>
        <tr>
            
                <td class="name"><code>
<span class="param-type">
    
    <!-- <a href="global.html#string">string</a> -->
    <a href="global.html#string">string</a>
    </span>


</code></td>
            

            
                <td class="description last"><p>마커 타이틀</p></td>

            
        </tr>
    </tbody>
</table>

        

    
</dd>

        
            
<dt>
    <h4 class="name" id="getVisible"><span class="type-signature"></span>getVisible()</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마커의 노출 허용 여부를 반환합니다.</p>
    </div>
    

    

    

    
    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    

    

    

    

    
    <h5>Returns</h5>
    
            <!-- 
<div class="param-desc">
    <p>마커 노출 허용 여부</p>
</div>



<dl>
    <dt>
        Type
    </dt>
    <dd>
        
<span class="param-type"><a href="global.html#boolean">boolean</a></span>



    </dd>
</dl>


 -->
<!-- ! -->


<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Type</th>
        

        
        <th class="last">Description</th>
        
    </tr>
    </thead>

    <tbody>
        <tr>
            
                <td class="name"><code>
<span class="param-type">
    
    <!-- <a href="global.html#boolean">boolean</a> -->
    <a href="global.html#boolean">boolean</a>
    </span>


</code></td>
            

            
                <td class="description last"><p>마커 노출 허용 여부</p></td>

            
        </tr>
    </tbody>
</table>

        

    
</dd>

        
            
<dt>
    <h4 class="name" id="getZIndex"><span class="type-signature"></span>getZIndex()</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마커의 쌓임 순서를 반환합니다.</p>
    </div>
    

    

    

    
    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    

    

    

    

    
    <h5>Returns</h5>
    
            <!-- 
<div class="param-desc">
    <p>마커의 쌓임 순서</p>
</div>



<dl>
    <dt>
        Type
    </dt>
    <dd>
        
<span class="param-type"><a href="global.html#number">number</a></span>



    </dd>
</dl>


 -->
<!-- ! -->


<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Type</th>
        

        
        <th class="last">Description</th>
        
    </tr>
    </thead>

    <tbody>
        <tr>
            
                <td class="name"><code>
<span class="param-type">
    
    <!-- <a href="global.html#number">number</a> -->
    <a href="global.html#number">number</a>
    </span>


</code></td>
            

            
                <td class="description last"><p>마커의 쌓임 순서</p></td>

            
        </tr>
    </tbody>
</table>

        

    
</dd>

        
            
<dt>
    <h4 class="name" id="onAdd"><span class="type-signature">&lt;abstract> </span>onAdd()</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>지도에 오버레이를 추가할 때 호출됩니다. 오버레이 요소를 <a href="naver.maps.Map.html">Map</a> 객체의 창(pane) 요소에 추가하는 기능을 구현합니다. <a href="naver.maps.Map.html#~MapPanes">MapPanes</a> 중 적합한 창 요소에 오버레이 요소를 추가합니다.</p>
    </div>
    

    

    

    
    

    
<dl class="details">
    

	

	

	
	<dt class="inherited-from method-doc-label method-doc-details-label">Inherited From</dt>
	<dd class="inherited-from">
		<ul class="dummy">
			<li>
				<a href="naver.maps.OverlayView.html#onAdd">naver.maps.OverlayView#onAdd</a>
			</li>
		</ul>
	</dd>
	

    
    <dt class="tag-overrides">Overrides</dt>
    <dd class="tag-overrides"><ul class="dummy"><li>
        <a href="naver.maps.OverlayView.html#onAdd">naver.maps.OverlayView#onAdd</a>
    </li></ul></dd>
    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    

    

    

    

    

    
</dd>

        
            
<dt>
    <h4 class="name" id="onRemove"><span class="type-signature">&lt;abstract> </span>onRemove()</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>지도에서 오버레이를 제거할 때 호출됩니다. 오버레이 요소를 <a href="naver.maps.Map.html">Map</a> 객체의 창(pane) 요소에서 제거하는 기능을 구현합니다.</p>
    </div>
    

    

    

    
    

    
<dl class="details">
    

	

	

	
	<dt class="inherited-from method-doc-label method-doc-details-label">Inherited From</dt>
	<dd class="inherited-from">
		<ul class="dummy">
			<li>
				<a href="naver.maps.OverlayView.html#onRemove">naver.maps.OverlayView#onRemove</a>
			</li>
		</ul>
	</dd>
	

    
    <dt class="tag-overrides">Overrides</dt>
    <dd class="tag-overrides"><ul class="dummy"><li>
        <a href="naver.maps.OverlayView.html#onRemove">naver.maps.OverlayView#onRemove</a>
    </li></ul></dd>
    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    

    

    

    

    

    
</dd>

        
            
<dt>
    <h4 class="name" id="setAnimation"><span class="type-signature"></span>setAnimation(animation)</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마커의 애니메이션을 설정합니다. 동작하고 있는 애니메이션이 있다면 중지하고, 설정한 애니메이션을 바로 시작합니다.<br>
제공하는 애니메이션은 <code>DROP</code>, <code>BOUNCE</code>입니다.</p>
    </div>
    

    

    

    
    
        <h5>Parameters</h5>
        

<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Name</th>
        

        <th>Type</th>

        

        

        <th class="last">Description</th>
    </tr>
    </thead>

    <tbody>
    

        <tr>
            
                <td class="name"><code>animation</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="naver.maps.html#.Animation">naver.maps.Animation</a> -->
    <a href="naver.maps.html#.Animation">naver.maps.Animation</a>
    </span>



            
            </td>

            

            

            <td class="description last"><p>마커의 애니메이션. 이 값이 <a href="global.html#null">null</a>이면 애니메이션을 중지합니다.</p></td>
        </tr>

    
    </tbody>
</table>

    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    

    

    

    

    

    
</dd>

        
            
<dt>
    <h4 class="name" id="setClickable"><span class="type-signature"></span>setClickable(clickable)</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마커의 클릭 허용 여부를 설정합니다.</p>
    </div>
    

    

    

    
    
        <h5>Parameters</h5>
        

<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Name</th>
        

        <th>Type</th>

        

        

        <th class="last">Description</th>
    </tr>
    </thead>

    <tbody>
    

        <tr>
            
                <td class="name"><code>clickable</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#boolean">boolean</a> -->
    <a href="global.html#boolean">boolean</a>
    </span>



            
            </td>

            

            

            <td class="description last"><p>클릭 허용 여부. 이 값이 <code>true</code>이면 마커는 마우스, 터치 이벤트를 받을 수 있고, 마우스 오버 시 <code>cursor</code> 속성에 따라 포인터 모양을 반영합니다.<br>
<code>false</code>일 경우 이벤트를 받지 않으며 마우스 오버 시에도 포인터 모양이 변하지 않습니다.</p></td>
        </tr>

    
    </tbody>
</table>

    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    
    <h5>Fires</h5>
    <ul>
    
        <li>clickable_changed</li>
    </ul>
    

    

    

    

    

    
</dd>

        
            
<dt>
    <h4 class="name" id="setCursor"><span class="type-signature"></span>setCursor(cursor)</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마우스 오버 시 포인터의 모양을 설정하는 CSS <code>cursor</code>값을 설정합니다.</p>
    </div>
    

    

    

    
    
        <h5>Parameters</h5>
        

<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Name</th>
        

        <th>Type</th>

        

        

        <th class="last">Description</th>
    </tr>
    </thead>

    <tbody>
    

        <tr>
            
                <td class="name"><code>cursor</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#string">string</a> -->
    <a href="global.html#string">string</a>
    </span>



            
            </td>

            

            

            <td class="description last"><p>마우스 포인터 모양</p></td>
        </tr>

    
    </tbody>
</table>

    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    
    <h5>Fires</h5>
    <ul>
    
        <li>cursor_changed</li>
    </ul>
    

    

    

    

    

    
</dd>

        
            
<dt>
    <h4 class="name" id="setDraggable"><span class="type-signature"></span>setDraggable(draggable)</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마커의 드래그 허용 여부를 설정합니다.</p>
    </div>
    

    

    

    
    
        <h5>Parameters</h5>
        

<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Name</th>
        

        <th>Type</th>

        

        

        <th class="last">Description</th>
    </tr>
    </thead>

    <tbody>
    

        <tr>
            
                <td class="name"><code>draggable</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#boolean">boolean</a> -->
    <a href="global.html#boolean">boolean</a>
    </span>



            
            </td>

            

            

            <td class="description last"><p>마커의 드래그 허용 여부</p></td>
        </tr>

    
    </tbody>
</table>

    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    
    <h5>Fires</h5>
    <ul>
    
        <li>draggable_changed</li>
    </ul>
    

    

    

    

    

    
</dd>

        
            
<dt>
    <h4 class="name" id="setIcon"><span class="type-signature"></span>setIcon(icon)</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마커의 모양을 설정합니다.</p>
    </div>
    

    

    

    
    
        <h5>Parameters</h5>
        

<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Name</th>
        

        <th>Type</th>

        

        

        <th class="last">Description</th>
    </tr>
    </thead>

    <tbody>
    

        <tr>
            
                <td class="name"><code>icon</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#string">string</a> -->
    <a href="global.html#string">string</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="naver.maps.Marker.html#~ImageIcon">naver.maps.Marker~ImageIcon</a> -->
    <a href="naver.maps.Marker.html#~ImageIcon">ImageIcon</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="naver.maps.Marker.html#~SymbolIcon">naver.maps.Marker~SymbolIcon</a> -->
    <a href="naver.maps.Marker.html#~SymbolIcon">SymbolIcon</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="naver.maps.Marker.html#~HtmlIcon">naver.maps.Marker~HtmlIcon</a> -->
    <a href="naver.maps.Marker.html#~HtmlIcon">HtmlIcon</a>
    </span>



            
            </td>

            

            

            <td class="description last"><p>아이콘 객체</p></td>
        </tr>

    
    </tbody>
</table>

    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    
    <h5>Fires</h5>
    <ul>
    
        <li>icon_changed</li>
    </ul>
    

    

    

    

    

    
</dd>

        
            
<dt>
    <h4 class="name" id="setMap"><span class="type-signature"></span>setMap(map)</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>오버레이를 지도에 추가합니다. 인수로 <a href="global.html#null">null</a>을 전달하면 오버레이를 지도에서 제거합니다.</p>
    </div>
    

    

    

    
    
        <h5>Parameters</h5>
        

<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Name</th>
        

        <th>Type</th>

        

        

        <th class="last">Description</th>
    </tr>
    </thead>

    <tbody>
    

        <tr>
            
                <td class="name"><code>map</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="naver.maps.Map.html">naver.maps.Map</a> -->
    <a href="naver.maps.Map.html">naver.maps.Map</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="global.html#null">null</a> -->
    <a href="global.html#null">null</a>
    </span>



            
            </td>

            

            

            <td class="description last"><p>오버레이를 추가할 <code>Map</code> 객체</p></td>
        </tr>

    
    </tbody>
</table>

    

    
<dl class="details">
    

	

	

	
	<dt class="inherited-from method-doc-label method-doc-details-label">Inherited From</dt>
	<dd class="inherited-from">
		<ul class="dummy">
			<li>
				<a href="naver.maps.OverlayView.html#setMap">naver.maps.OverlayView#setMap</a>
			</li>
		</ul>
	</dd>
	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    

    

    

    

    

    
</dd>

        
            
<dt>
    <h4 class="name" id="setOptions"><span class="type-signature"></span>setOptions(options)</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마커 옵션을 설정합니다. 설정한 옵션만 반영됩니다.</p>
    </div>
    

    

    

    
    
        <h5>Parameters</h5>
        

<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Name</th>
        

        <th>Type</th>

        

        

        <th class="last">Description</th>
    </tr>
    </thead>

    <tbody>
    

        <tr>
            
                <td class="name"><code>options</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="naver.maps.Marker.html#~MarkerOptions">naver.maps.Marker~MarkerOptions</a> -->
    <a href="naver.maps.Marker.html#~MarkerOptions">MarkerOptions</a>
    </span>



            
            </td>

            

            

            <td class="description last"><p>마커 옵션</p></td>
        </tr>

    
    </tbody>
</table>

    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    
    <h5>Fires</h5>
    <ul>
    
        <li>clickable_changed</li>
    
        <li>cursor_changed</li>
    
        <li>draggable_changed</li>
    
        <li>icon_changed</li>
    
        <li>position_changed</li>
    
        <li>shape_changed</li>
    
        <li>title_changed</li>
    
        <li>visible_changed</li>
    
        <li>zIndex_changed</li>
    </ul>
    

    

    

    

    

    
</dd>

        
            
<dt>
    <h4 class="name" id="setPosition"><span class="type-signature"></span>setPosition(position)</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마커의 위치를 설정합니다.</p>
    </div>
    

    

    

    
    
        <h5>Parameters</h5>
        

<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Name</th>
        

        <th>Type</th>

        

        

        <th class="last">Description</th>
    </tr>
    </thead>

    <tbody>
    

        <tr>
            
                <td class="name"><code>position</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#Coord">Coord</a> -->
    <a href="global.html#Coord">Coord</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="global.html#CoordLiteral">CoordLiteral</a> -->
    <a href="global.html#CoordLiteral">CoordLiteral</a>
    </span>



            
            </td>

            

            

            <td class="description last"><p>마커 위치</p></td>
        </tr>

    
    </tbody>
</table>

    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    
    <h5>Fires</h5>
    <ul>
    
        <li>position_changed</li>
    </ul>
    

    

    

    

    

    
</dd>

        
            
<dt>
    <h4 class="name" id="setShape"><span class="type-signature"></span>setShape(shape)</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마커의 이벤트 영역을 설정합니다.</p>
    </div>
    

    

    

    
    
        <h5>Parameters</h5>
        

<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Name</th>
        

        <th>Type</th>

        

        

        <th class="last">Description</th>
    </tr>
    </thead>

    <tbody>
    

        <tr>
            
                <td class="name"><code>shape</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="naver.maps.Marker.html#~MarkerShape">naver.maps.Marker~MarkerShape</a> -->
    <a href="naver.maps.Marker.html#~MarkerShape">MarkerShape</a>
    </span>



            
            </td>

            

            

            <td class="description last"><p>마커 셰이프 객체</p></td>
        </tr>

    
    </tbody>
</table>

    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    
    <h5>Fires</h5>
    <ul>
    
        <li>shape_changed</li>
    </ul>
    

    

    

    

    

    
</dd>

        
            
<dt>
    <h4 class="name" id="setTitle"><span class="type-signature"></span>setTitle(title)</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마커의 타이틀을 설정합니다. 타이틀은 마커에 마우스 포인터를 올리면 나타나는 툴팁의 문자열입니다.</p>
    </div>
    

    

    

    
    
        <h5>Parameters</h5>
        

<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Name</th>
        

        <th>Type</th>

        

        

        <th class="last">Description</th>
    </tr>
    </thead>

    <tbody>
    

        <tr>
            
                <td class="name"><code>title</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#string">string</a> -->
    <a href="global.html#string">string</a>
    </span>



            
            </td>

            

            

            <td class="description last"><p>마커 타이틀</p></td>
        </tr>

    
    </tbody>
</table>

    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    
    <h5>Fires</h5>
    <ul>
    
        <li>title_changed</li>
    </ul>
    

    

    

    

    

    
</dd>

        
            
<dt>
    <h4 class="name" id="setVisible"><span class="type-signature"></span>setVisible(visible)</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마커의 노출 허용 여부를 설정합니다.</p>
    </div>
    

    

    

    
    
        <h5>Parameters</h5>
        

<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Name</th>
        

        <th>Type</th>

        

        

        <th class="last">Description</th>
    </tr>
    </thead>

    <tbody>
    

        <tr>
            
                <td class="name"><code>visible</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#boolean">boolean</a> -->
    <a href="global.html#boolean">boolean</a>
    </span>



            
            </td>

            

            

            <td class="description last"><p>마커 노출 허용 여부</p></td>
        </tr>

    
    </tbody>
</table>

    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    
    <h5>Fires</h5>
    <ul>
    
        <li>visible_changed</li>
    </ul>
    

    

    

    

    

    
</dd>

        
            
<dt>
    <h4 class="name" id="setZIndex"><span class="type-signature"></span>setZIndex(zIndex)</h4>

    
</dt>
<dd>

    
    <div class="description">
        <p>마커의 쌓임 순서를 설정합니다.</p>
    </div>
    

    

    

    
    
        <h5>Parameters</h5>
        

<table class="params table table-striped">
    <thead>
    <tr>
        
        <th>Name</th>
        

        <th>Type</th>

        

        

        <th class="last">Description</th>
    </tr>
    </thead>

    <tbody>
    

        <tr>
            
                <td class="name"><code>zIndex</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#number">number</a> -->
    <a href="global.html#number">number</a>
    </span>



            
            </td>

            

            

            <td class="description last"><p>마커의 쌓임 순서</p></td>
        </tr>

    
    </tbody>
</table>

    

    
<dl class="details">
    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    

    
    <h5>Fires</h5>
    <ul>
    
        <li>zIndex_changed</li>
    </ul>
    

    

    

    

    

    
</dd>

        </dl>
    

    
        <h3 class="subsection-title">Type Definitions</h3>

        <dl>
                
<hr>
<dt class="name" id="~HtmlIcon">
    <h4>HtmlIcon</h4>

    
</dt>
<dd>
    
    <div class="description">
        <p><code>HtmlIcon</code> 객체는 HTML 마커에서 사용하는 아이콘을 정의합니다. HTML 마커는 HTML 문자열 또는 HTML 요소를 사용하는 마커입니다.</p>
    </div>
    

    
        <h5>Type:</h5>
        <ul>
            <li>
                
<span class="param-type"><a href="global.html#object">object</a></span>



            </li>
        </ul>
    

    
<dl class="details">
    

    <h5 class="subsection-title">Properties</h5>

    <dl>

<table class="props table table-striped">
    <thead>
    <tr>
        
        <th>Name</th>
        

        <th>Type</th>

        
        <th>Argument</th>
        

        

        <th class="last">Description</th>
    </tr>
    </thead>

    <tbody>
    

        <tr>
            
                <td class="name"><code>content</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#string">string</a> -->
    <a href="global.html#string">string</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="global.html#HTMLElement">HTMLElement</a> -->
    <a href="global.html#HTMLElement">HTMLElement</a>
    </span>



            
            </td>

            
                <td class="attributes">
                

                
                </td>
            

            

            <td class="description last"><p>마커의 아이콘으로 사용할 HTML 마크업 또는 HTML 요소입니다. 이 속성은 반드시 설정해야 합니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>size</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="naver.maps.Size.html">naver.maps.Size</a> -->
    <a href="naver.maps.Size.html">naver.maps.Size</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="global.html#SizeLiteral">SizeLiteral</a> -->
    <a href="global.html#SizeLiteral">SizeLiteral</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            

            <td class="description last"><p>화면에 나타나는 마커의 크기입니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>anchor</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="naver.maps.Point.html">naver.maps.Point</a> -->
    <a href="naver.maps.Point.html">naver.maps.Point</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="global.html#PointLiteral">PointLiteral</a> -->
    <a href="global.html#PointLiteral">PointLiteral</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="naver.maps.html#.Position">naver.maps.Position</a> -->
    <a href="naver.maps.html#.Position">naver.maps.Position</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            

            <td class="description last"><p>지도 위에 놓이는 마커의 위치와 일치시킬 아이콘의 기준 위치입니다. 기본값은 <code>(0, 0)</code>으로, 마커 기준 왼쪽 위 모서리가 마커의 위치입니다.</p></td>
        </tr>

    
    </tbody>
</table>
</dl>

    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    
</dd>

            
                
<hr>
<dt class="name" id="~ImageIcon">
    <h4>ImageIcon</h4>

    
</dt>
<dd>
    
    <div class="description">
        <p><code>ImageIcon</code> 객체는 이미지 마커에서 사용하는 아이콘을 정의합니다.</p>
    </div>
    

    
        <h5>Type:</h5>
        <ul>
            <li>
                
<span class="param-type"><a href="global.html#object">object</a></span>



            </li>
        </ul>
    

    
<dl class="details">
    

    <h5 class="subsection-title">Properties</h5>

    <dl>

<table class="props table table-striped">
    <thead>
    <tr>
        
        <th>Name</th>
        

        <th>Type</th>

        
        <th>Argument</th>
        

        
        <th>Default</th>
        

        <th class="last">Description</th>
    </tr>
    </thead>

    <tbody>
    

        <tr>
            
                <td class="name"><code>url</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#string">string</a> -->
    <a href="global.html#string">string</a>
    </span>



            
            </td>

            
                <td class="attributes">
                

                
                </td>
            

            
                <td class="default">
                
                </td>
            

            <td class="description last"><p>마커의 아이콘으로 사용할 이미지의 URL입니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>size</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="naver.maps.Size.html">naver.maps.Size</a> -->
    <a href="naver.maps.Size.html">naver.maps.Size</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="global.html#SizeLiteral">SizeLiteral</a> -->
    <a href="global.html#SizeLiteral">SizeLiteral</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            
                <td class="default">
                
                </td>
            

            <td class="description last"><p>화면에 나타나는 마커의 크기입니다. 이 속성을 설정하지 않으면 이미지의 크기로 설정합니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>scaledSize</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="naver.maps.Size.html">naver.maps.Size</a> -->
    <a href="naver.maps.Size.html">naver.maps.Size</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="global.html#SizeLiteral">SizeLiteral</a> -->
    <a href="global.html#SizeLiteral">SizeLiteral</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            
                <td class="default">
                
                </td>
            

            <td class="description last"><p>아이콘 이미지의 크기입니다. 이 속성을 설정하지 않으면 이미지의 크기로 설정합니다. 이 속성을 이용하면 레티나 디스플레이에 대응할 수 있습니다.</p>
<p>예를 들어, <code>window.deviceRatio</code>가 <code>2</code>인 디바이스이고 이미지 크기가 200 x 100인 경우, 이 속성을 100 x 50으로 설정하면 실제 이미지 크기보다 2배 줄여서 보여줌으로써 레티나 디스플레이에 대응할 수 있습니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>origin</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="naver.maps.Point.html">naver.maps.Point</a> -->
    <a href="naver.maps.Point.html">naver.maps.Point</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="global.html#PointLiteral">PointLiteral</a> -->
    <a href="global.html#PointLiteral">PointLiteral</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            
                <td class="default">
                
                    (x: 0, y: 0)
                
                </td>
            

            <td class="description last"><p>스프라이트 이미지의 아이콘을 사용할 때 이미지의 원점입니다. 즉, 이 원점 위치로부터 <code>size</code> 속성의 값만큼 화면에 노출됩니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>anchor</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="naver.maps.Point.html">naver.maps.Point</a> -->
    <a href="naver.maps.Point.html">naver.maps.Point</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="global.html#PointLiteral">PointLiteral</a> -->
    <a href="global.html#PointLiteral">PointLiteral</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="naver.maps.html#.Position">naver.maps.Position</a> -->
    <a href="naver.maps.html#.Position">naver.maps.Position</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            
                <td class="default">
                
                </td>
            

            <td class="description last"><p>지도 위에 놓이는 마커의 위치와 일치시킬 아이콘의 기준 위치입니다. 이 속성을 설정하지 않으면 아이콘의 아래쪽 가운데로 설정합니다.</p></td>
        </tr>

    
    </tbody>
</table>
</dl>

    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    
</dd>

            
                
<hr>
<dt class="name" id="~MarkerOptions">
    <h4>MarkerOptions</h4>

    
</dt>
<dd>
    
    <div class="description">
        <p><code>MarkerOptions</code> 객체는 <code>Marker</code>를 정의하는 옵션을 나타냅니다.</p>
    </div>
    

    
        <h5>Type:</h5>
        <ul>
            <li>
                
<span class="param-type"><a href="global.html#object">object</a></span>



            </li>
        </ul>
    

    
<dl class="details">
    

    <h5 class="subsection-title">Properties</h5>

    <dl>

<table class="props table table-striped">
    <thead>
    <tr>
        
        <th>Name</th>
        

        <th>Type</th>

        
        <th>Argument</th>
        

        
        <th>Default</th>
        

        <th class="last">Description</th>
    </tr>
    </thead>

    <tbody>
    

        <tr>
            
                <td class="name"><code>animation</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="naver.maps.html#.Animation">naver.maps.Animation</a> -->
    <a href="naver.maps.html#.Animation">naver.maps.Animation</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            
                <td class="default">
                
                </td>
            

            <td class="description last"><p>마커가 지도에 추가될 때 시작할 애니메이션입니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>map</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="naver.maps.Map.html">naver.maps.Map</a> -->
    <a href="naver.maps.Map.html">naver.maps.Map</a>
    </span>



            
            </td>

            
                <td class="attributes">
                

                
                </td>
            

            
                <td class="default">
                
                </td>
            

            <td class="description last"><p>마커를 표시할 <code>Map</code> 객체입니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>position</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#Coord">Coord</a> -->
    <a href="global.html#Coord">Coord</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="global.html#CoordLiteral">CoordLiteral</a> -->
    <a href="global.html#CoordLiteral">CoordLiteral</a>
    </span>



            
            </td>

            
                <td class="attributes">
                

                
                </td>
            

            
                <td class="default">
                
                </td>
            

            <td class="description last"><p>마커의 위치를 나타내는 지도 좌표입니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>icon</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#string">string</a> -->
    <a href="global.html#string">string</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="naver.maps.Marker.html#~ImageIcon">naver.maps.Marker~ImageIcon</a> -->
    <a href="naver.maps.Marker.html#~ImageIcon">ImageIcon</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="naver.maps.Marker.html#~SymbolIcon">naver.maps.Marker~SymbolIcon</a> -->
    <a href="naver.maps.Marker.html#~SymbolIcon">SymbolIcon</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="naver.maps.Marker.html#~HtmlIcon">naver.maps.Marker~HtmlIcon</a> -->
    <a href="naver.maps.Marker.html#~HtmlIcon">HtmlIcon</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            
                <td class="default">
                
                </td>
            

            <td class="description last"><p>마커의 모양입니다. 이 속성을 설정하지 않으면 기본 아이콘으로 설정합니다. 문자열로 입력할 때는 마커의 아이콘으로 사용할 이미지의 URL을 입력합니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>shape</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="naver.maps.Marker.html#~MarkerShape">naver.maps.Marker~MarkerShape</a> -->
    <a href="naver.maps.Marker.html#~MarkerShape">MarkerShape</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            
                <td class="default">
                
                </td>
            

            <td class="description last"><p>마커의 인터랙션 영역입니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>title</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#string">string</a> -->
    <a href="global.html#string">string</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            
                <td class="default">
                
                    null
                
                </td>
            

            <td class="description last"><p>마커에 마우스 오버 시 나타나는 툴팁 문자열입니다. 이 속성을 설정하지 않거나 빈 문자열로 설정하면 툴팁을 노출하지 않습니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>cursor</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#string">string</a> -->
    <a href="global.html#string">string</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            
                <td class="default">
                
                    pointer
                
                </td>
            

            <td class="description last"><p>마커에 마우스 오버 시 나타나는 포인터 모양입니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>clickable</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#boolean">boolean</a> -->
    <a href="global.html#boolean">boolean</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            
                <td class="default">
                
                    true
                
                </td>
            

            <td class="description last"><p>마커의 클릭 허용 여부입니다. 이 값이 <code>false</code>이면 마커는 사용자 인터랙션을 받지 않습니다. 또한 <code>cursor</code> 속성값도 반영되지 않습니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>draggable</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#boolean">boolean</a> -->
    <a href="global.html#boolean">boolean</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            
                <td class="default">
                
                    false
                
                </td>
            

            <td class="description last"><p>마커의 드래그 허용 여부입니다. 이 속성은 <code>clickable</code> 속성보다 우선합니다. 즉, <code>clickable</code> 속성이 <code>false</code>라도 이 값이 <code>true</code>이면 클릭 등의 사용자 인터랙션을 받습니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>visible</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#boolean">boolean</a> -->
    <a href="global.html#boolean">boolean</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            
                <td class="default">
                
                    true
                
                </td>
            

            <td class="description last"><p>마커의 노출 허용 여부입니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>zIndex</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#number">number</a> -->
    <a href="global.html#number">number</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            
                <td class="default">
                
                </td>
            

            <td class="description last"><p>마커의 쌓임 순서입니다.</p></td>
        </tr>

    
    </tbody>
</table>
</dl>

    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    
</dd>

            
                
<hr>
<dt class="name" id="~MarkerShape">
    <h4>MarkerShape</h4>

    
</dt>
<dd>
    
    <div class="description">
        <p><code>MarkerShape</code> 객체는 마커의 인터랙션 영역을 정의합니다.</p>
<p>일반적으로 이미지 또는 심벌 아이콘을 사용했을 때 클릭할 수 있는 영역은 다음 그림과 같이 사각형의 아이콘 크기로 설정됩니다. 그러나 이 객체를 이용하면 마커 모양대로 클릭할 수 있는 영역을 설정할 수 있습니다.<br>
<img src="./img/marker-shape.png" alt="marker-shape"></p>
    </div>
    

    
        <h5>Type:</h5>
        <ul>
            <li>
                
<span class="param-type"><a href="global.html#object">object</a></span>



            </li>
        </ul>
    

    
<dl class="details">
    

    <h5 class="subsection-title">Properties</h5>

    <dl>

<table class="props table table-striped">
    <thead>
    <tr>
        
        <th>Name</th>
        

        <th>Type</th>

        

        

        <th class="last">Description</th>
    </tr>
    </thead>

    <tbody>
    

        <tr>
            
                <td class="name"><code>coords</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#array">array</a> -->
    <a href="global.html#array">array</a>
    </span>



            
            </td>

            

            

            <td class="description last"><p>인터랙션 영역을 정의하는 도형의 좌표입니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>type</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#string">string</a> -->
    <a href="global.html#string">string</a>
    </span>



            
            </td>

            

            

            <td class="description last"><p>인터랙션 영역을 정의하는 도형의 유형입니다.</p></td>
        </tr>

    
    </tbody>
</table>
</dl>

    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    
</dd>

            
                
<hr>
<dt class="name" id="~SymbolIcon">
    <h4>SymbolIcon</h4>

    
</dt>
<dd>
    
    <div class="description">
        <p><code>SymbolIcon</code> 객체는 심벌 마커에서 사용하는 아이콘을 정의합니다. 마커의 위치 <code>(x: 0, y: 0)</code>를 기준으로 폴리곤 좌표를 설정해 원하는 모양의 아이콘을 생성할 수 있습니다.</p>
    </div>
    

    
        <h5>Type:</h5>
        <ul>
            <li>
                
<span class="param-type"><a href="global.html#object">object</a></span>



            </li>
        </ul>
    

    
<dl class="details">
    

    <h5 class="subsection-title">Properties</h5>

    <dl>

<table class="props table table-striped">
    <thead>
    <tr>
        
        <th>Name</th>
        

        <th>Type</th>

        
        <th>Argument</th>
        

        
        <th>Default</th>
        

        <th class="last">Description</th>
    </tr>
    </thead>

    <tbody>
    

        <tr>
            
                <td class="name"><code>path</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="naver.maps.html#.SymbolPath">naver.maps.SymbolPath</a> -->
    <a href="naver.maps.html#.SymbolPath">naver.maps.SymbolPath</a>
    </span>
|

<span class="param-type">
    
    <!-- Array.&lt;<a href="naver.maps.Point.html">naver.maps.Point</a>> -->
    Array.&lt;<a href="naver.maps.Point.html">naver.maps.Point</a>>
    </span>
|

<span class="param-type">
    
    <!-- Array.&lt;<a href="global.html#PointLiteral">PointLiteral</a>> -->
    Array.&lt;<a href="global.html#PointLiteral">PointLiteral</a>>
    </span>



            
            </td>

            
                <td class="attributes">
                

                
                </td>
            

            
                <td class="default">
                
                </td>
            

            <td class="description last"><p>마커 아이콘으로 사용할 벡터 폴리곤 좌표입니다. <code>naver.maps.SymbolPath</code>에서 미리 정의된 path를 사용할 수 있습니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>style</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="naver.maps.html#.SymbolStyle">naver.maps.SymbolStyle</a> -->
    <a href="naver.maps.html#.SymbolStyle">naver.maps.SymbolStyle</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            
                <td class="default">
                
                </td>
            

            <td class="description last"><p>도형 아이콘의 스타일입니다. <code>path</code> 속성을 <code>naver.maps.SymbolPath</code>로 사용하는 경우 생략할 수 있습니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>radius</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#number">number</a> -->
    <a href="global.html#number">number</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            
                <td class="default">
                
                    10
                
                </td>
            

            <td class="description last"><p>원 아이콘을 그리는 경우 원의 반지름을 정의합니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>fillColor</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#string">string</a> -->
    <a href="global.html#string">string</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            
                <td class="default">
                
                </td>
            

            <td class="description last"><p>폴리곤 배경색입니다. CSS 색상 표현법으로 설정합니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>fillOpacity</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#number">number</a> -->
    <a href="global.html#number">number</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            
                <td class="default">
                
                    1
                
                </td>
            

            <td class="description last"><p>폴리곤 배경색의 불투명도입니다. 값의 범위는 <code>0~1</code>입니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>strokeColor</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#string">string</a> -->
    <a href="global.html#string">string</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            
                <td class="default">
                
                </td>
            

            <td class="description last"><p>폴리곤 선의 색상입니다. CSS 색상 표현법으로 설정합니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>strokeWeight</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#number">number</a> -->
    <a href="global.html#number">number</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            
                <td class="default">
                
                    1
                
                </td>
            

            <td class="description last"><p>폴리곤 선의 두께입니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>strokeOpacity</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="global.html#number">number</a> -->
    <a href="global.html#number">number</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            
                <td class="default">
                
                    1
                
                </td>
            

            <td class="description last"><p>폴리곤 선의 불투명도입니다. 값의 범위는 <code>0~1</code>입니다.</p></td>
        </tr>

    

        <tr>
            
                <td class="name"><code>anchor</code></td>
            

            <td class="type">
            
                
<span class="param-type">
    
    <!-- <a href="naver.maps.Point.html">naver.maps.Point</a> -->
    <a href="naver.maps.Point.html">naver.maps.Point</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="global.html#PointLiteral">PointLiteral</a> -->
    <a href="global.html#PointLiteral">PointLiteral</a>
    </span>
|

<span class="param-type">
    
    <!-- <a href="naver.maps.html#.Position">naver.maps.Position</a> -->
    <a href="naver.maps.html#.Position">naver.maps.Position</a>
    </span>



            
            </td>

            
                <td class="attributes">
                
                    &lt;optional><br>
                

                
                </td>
            

            
                <td class="default">
                
                    naver.maps.Position.BOTTOM_CENTER
                
                </td>
            

            <td class="description last"><p>지도 위에 놓이는 마커의 위치와 일치시킬 아이콘의 기준 위치입니다.</p></td>
        </tr>

    
    </tbody>
</table>
</dl>

    

	

	

	

    

    

    

    

	

	

	

	

	



	

	

	

	
</dl>


    
</dd>

            </dl>
    

    
</article>

</section>




        </div>
    </div>

    <div class="clearfix"></div>

    
        <div class="col-md-3">
            <div id="toc" class="col-md-3 hidden-xs hidden-sm hidden-md"></div>
        </div>
    

</div>
</div>

<div class="modal fade" id="searchResults">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Search results</h4>
      </div>
      <div class="modal-body"></div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>

<div class="footer">


    <span class="copyright">
    <a href="https://developers.naver.com">NAVER Developers</a> | Copyright 2016 NAVER Corp. All rights reserved. | <a href="http://developer.naver.com/wiki/pages/mapAgreement">Terms of Service</a>
    </span>

<span class="jsdoc-message">
    Documentation generated by <a href="https://github.com/jsdoc3/jsdoc">JSDoc 3.6.3</a>
    
    using the <a href="https://github.com/docstrap/docstrap">DocStrap template</a>.
</span>
</div>

<!--[if lt IE 9]>
<script src="scripts/iron.js"></script>
<script src="scripts/respond.min.js"></script>
<script src="scripts/docstrap.lib.ie8.js"></script>
<script type="text/javascript">
    var isTocSupported = false;
    var isSearchSupported = false;
    function remove(itm) {
        itm && itm.parentElement.removeChild(itm);
    }
    remove(document.getElementById('toc'));
    remove(document.getElementById('_searchbox'));
</script>
<![endif]-->


<!--[if gt IE 8]> <!-- -->
<script src="scripts/docstrap.lib.js"></script>
<script id="__toc" src="scripts/toc.js"></script>
<script type="text/javascript" src="scripts/fulltext-search-ui.js"></script>
<script type="text/javascript">
    var isTocSupported = true;
    var isSearchSupported = true;
</script>
<!-- <![endif]-->

<script src="./js/highlight.min.js"></script>

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