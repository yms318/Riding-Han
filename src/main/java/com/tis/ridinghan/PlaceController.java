package com.tis.ridinghan;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tis.place.domain.DirectionVO;
import com.tis.place.domain.PagingVO;
import com.tis.place.domain.PlaceVO;
import com.tis.place.service.PlaceService;
import com.tis.user.model.MemberVO;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
//@RequestMapping(value="/map")
public class PlaceController {
	
	private final Logger log = LoggerFactory.getLogger(UserController.class.getName());
   
   @RequestMapping(value="/map", method=RequestMethod.GET)
   public String showMap() {
         return "map";
   }
   
   @Autowired
   private PlaceService placeService;
   
   
   @RequestMapping(value = "/map/registerPlace", method = RequestMethod.POST)
   public @ResponseBody Map<String, String> registerPlace(@ModelAttribute PlaceVO place,HttpSession ses) {
      PlaceVO registered = placeService.findPlaceByCoordinate(place.getLatitude(), place.getLongitude());
      MemberVO user=(MemberVO)ses.getAttribute("user");
      place.setP_user_no(user.getUser_no());
      String str = null;
      String place_no = null;
      if (registered == null) {
         int n = this.placeService.registerPlace(place);
         str = (n > 0) ? "장소 등록 성공" : "장소 등록 실패";
         log.info("place after register ===" + place);
         place_no = String.format("%06d", place.getPlace_no());
      } else {
         str = "이미 등록된 장소";
         place_no = String.format("%06d", registered.getPlace_no());
      }

      Map<String, String> map = new HashMap<>();
      map.put("msg", str);
      map.put("place", place_no);
      return map;
   } // ---------------------------------
   
   @RequestMapping("/map/getPlaceById")
   public @ResponseBody PlaceVO getDirectionById(
         @ModelAttribute("place_no") int place_no) {
      log.info("place_no: " + place_no);
      PlaceVO place = placeService.findPlaceByPlaceid(place_no);
      log.info("place: " + place);

      return place;
   } // ---------------------------------

   @RequestMapping("/map/placeList")
   public String placeList(@ModelAttribute PagingVO paging, HttpServletRequest req, Model m) {
      int totalCount = placeService.getTotalPlaceCount();

      paging.setTotalCount(totalCount); // 총 장소 수 셋팅
      paging.init(); // 페이징 처리관련 연산 수행
      
      log.info("paging: " + paging);

      List<PlaceVO> pList = placeService.getAllPlaceList(paging);
      String myctx = req.getContextPath();

      // 페이지 네비 문자열 받아오기
      String pageNavi = paging.getPageNavi(myctx, "map/placeList");

      m.addAttribute("totalCount", totalCount);
      m.addAttribute("placeArr", pList);
      m.addAttribute("paging", paging);
      m.addAttribute("pageNavi", pageNavi);

      return "place/placeList";
      // "WEB-INF/views/place/placeLiset.jsp"
   } // ---------------------------------

   @RequestMapping("/map/placeNearby")
   public String placeListNearby(@ModelAttribute PlaceVO place, HttpServletRequest req, Model m) {

      log.info("place=" + place);
      if (place.getLatitude()==0) place.setLatitude(37.8054953);
      if (place.getLongitude()==0) place.setLongitude(128.9082081);
      List<PlaceVO> pList = placeService.findPlaceNearby(place.getLatitude(), place.getLongitude());
      log.info("pList=" + pList);
      log.info("pList.size()=" + pList.size());
      
      m.addAttribute("totalCount", pList.size());
      m.addAttribute("placeArr", pList);

      return "place/placeNearby";
      // "WEB-INF/views/place/placeNearby.jsp"
   } // ---------------------------------
   
   @RequestMapping(value = "/map/placeNearbyMap", method = RequestMethod.GET)
   public String showPlaceNearbyMap(Model m) {
      return "place/placeNearbyMap";
      // "WEB-INF/views/place/placeNearbyMap.jsp"
   }

   @RequestMapping(value = "/map/placeNearbyMap", method = RequestMethod.POST)
   public @ResponseBody List<PlaceVO> placeListNearbyMap(@ModelAttribute PlaceVO place) {

      log.info("place=" + place);
      if (place.getLatitude()==0) place.setLatitude(37.5349277);
      if (place.getLongitude()==0) place.setLongitude(126.9027279);
      List<PlaceVO> pList = placeService.findPlaceNearby(place.getLatitude(), place.getLongitude());
      log.info("pList=" + pList);
      log.info("pList.size()=" + pList.size());
      
      //m.addAttribute("totalCount", pList.size());
      //m.addAttribute("placeArr", pList);
      
      return pList;
      // "WEB-INF/views/place/placeNearbyMap.jsp"
   } // ---------------------------------

   @RequestMapping("/map/selectPlace")
   public String selectPlace(Model m, @ModelAttribute("place_no") String place_no) {
      log.info("place_no: " + place_no);
      PlaceVO place = placeService.findPlaceByPlaceid(Integer.parseInt(place_no));
      log.info("place: " + place);

      m.addAttribute("selectedPlace", place_no);

      String str = "선택된 장소는 " + place.getTitle() + "(" + place.getPlace_no() + ")입니다";
      String loc = "javascript:history.back()";
      // 돌아가는 페이지는 다시 고민해야 됨
      m.addAttribute("msg", str);
      m.addAttribute("loc", loc);
      return "message";
   } // ---------------------------------

   @RequestMapping(value = "/map/registerDirection", method = RequestMethod.POST)
   public @ResponseBody Map<String, String> directionRegister(@ModelAttribute DirectionVO direction,HttpSession ses)
         throws IOException {
      log.info("direction===" + direction);
      
      MemberVO user=(MemberVO)ses.getAttribute("user");
      direction.setD_user_no(user.getUser_no());
      
      DirectionVO registered = placeService.findDirectionByGpxfile(direction.getGpxfile());
      log.info("registered=" + registered);
      String str = null;
      String direction_no = null;
      if (registered == null) {
         int n = this.placeService.registerDirection(direction);
         str = (n > 0) ? "경로 등록 성공" : "경로 등록 실패";
         log.info("direction after register ===" + direction);
         direction_no = String.format("%06d", direction.getDirection_no());
      } else {
         str = "이미 등록된 장소";
         direction_no = String.format("%06d", registered.getDirection_no());
      }
      Map<String, String> map = new HashMap<>();
      map.put("msg", str);
      map.put("direction", direction_no);
      return map;
   } // ---------------------------------
   
   @RequestMapping("/map/getDirctionById")
   public @ResponseBody DirectionVO getDirectionById(
         @ModelAttribute("direction_no") String direction_no) {
      log.info("direction_no: " + direction_no);
      DirectionVO direction = placeService.findDirectionByDirectionid(direction_no);
      log.info("direction: " + direction);

      return direction;
   } // ---------------------------------

   @RequestMapping("/map/directionList")
   public String directionList(@ModelAttribute PagingVO paging, HttpServletRequest req, Model m) {
      int totalCount = placeService.getTotalDirectionCount();

      paging.setTotalCount(totalCount); // 총 장소 수 셋팅
      paging.init(); // 페이징 처리관련 연산 수행
      log.info("paging: " + paging);

      List<DirectionVO> dList = placeService.getAllDirectionList(paging);
      String myctx = req.getContextPath();

      // 페이지 네비 문자열 받아오기
      String pageNavi = paging.getPageNavi(myctx, "map/directionList");

      m.addAttribute("totalCount", totalCount);
      m.addAttribute("directionArr", dList);
      m.addAttribute("paging", paging);
      m.addAttribute("pageNavi", pageNavi);

      return "place/directionList";
      // "WEB-INF/views/place/directionList.jsp"
   } // ---------------------------------

   @RequestMapping("/map/selectDirection")
   public String selectDirection(Model m, @ModelAttribute("direction_no") String direction_no) {
      log.info("direction_no: " + direction_no);
      DirectionVO direction = placeService.findDirectionByDirectionid(direction_no);
      log.info("direction: " + direction);

      m.addAttribute("selectedDirection", direction_no);

      String str = "선택된 경로는 " + direction.getTitle() + "(" + direction.getDirection_no() + ")입니다";
      String loc = "javascript:history.back()";
      // 돌아가는 페이지는 다시 고민해야 됨
      m.addAttribute("msg", str);
      m.addAttribute("loc", loc);
      return "message";
   } // ---------------------------------
   
   @RequestMapping("/map/viewDirection")
   public String viewDirection(Model m, @ModelAttribute("direction_no") String direction_no) {
      log.info("direction_no: " + direction_no);
      m.addAttribute("viewDirection", direction_no);
      
      return "place/viewDirection";
   } // ---------------------------------


}