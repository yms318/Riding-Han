package com.tis.place.service;

import java.util.List;

import com.tis.place.domain.DirectionVO;
import com.tis.place.domain.DirectionViewVO;
import com.tis.place.domain.PagingVO;
import com.tis.place.domain.PlaceVO;
import com.tis.plan.model.PlanVO;

public interface PlaceService {
   
   int registerPlace(PlaceVO place);
   int getTotalPlaceCount();
   List<PlaceVO> getAllPlaceList(PagingVO paging);
   // java에서는 메소드 오버로딩이 가능하지만 xml에서는 같은 이름이 허용되지 않기에 변경함
   PlaceVO findPlaceByTitle(String title);
   PlaceVO findPlaceByPlaceid(int place_no);
   PlaceVO findPlaceByCoordinate(double latitude, double longitude);
   List<PlaceVO> findPlaceNearby(double latitude, double longitude);
   
   int registerDirection(DirectionVO direction);
   List<DirectionVO> getAllDirectionList(PagingVO paging);
   DirectionVO findDirectionByDirectionid(String direction_no);
   DirectionVO findDirectionByGpxfile(String gpxfile);
   List<PlaceVO> getMyPlaceList(PagingVO paging);
   int getTotalDirectionCount();
   int getMyPlaceCount();
   int getMyDirectionCount();
   List<DirectionVO> getMyDirectionList(PagingVO paging);
   
    
}