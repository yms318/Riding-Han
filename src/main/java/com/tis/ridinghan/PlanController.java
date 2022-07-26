package com.tis.ridinghan;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tis.chat.model.ChatVO;
import com.tis.chat.service.ChatService;
import com.tis.common.CreateRandomCode;
import com.tis.place.domain.DirectionVO;
import com.tis.place.domain.PlaceVO;
import com.tis.place.service.PlaceService;
import com.tis.plan.model.PagingVO;
import com.tis.plan.model.PlanVO;
import com.tis.plan.model.Plan_InfoVO;
import com.tis.plan.service.PlanService;
import com.tis.user.model.MemberVO;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
public class PlanController {
	
	private final Logger log = LoggerFactory.getLogger(UserController.class.getName());
   
   @Inject
   private PlanService planService;
   @Inject
   private ChatService chatService;
   @Inject
   private PlaceService placeService;
   
   ArrayList<PlanVO> placesList=new ArrayList<PlanVO>();
   
   @RequestMapping(value="/plan",method=RequestMethod.GET)
   public String showPlanList(@ModelAttribute PagingVO paging,
         HttpServletRequest req, Model m) {
      
         int totalCount=planService.getTotalCount(paging);
         paging.setTotalCount(totalCount);
         paging.setPageSize(10);
         paging.setPagingBlock(5);
         paging.init();
         
         List<PlanVO> arr=planService.showPlanList(paging);
         m.addAttribute("planArr",arr);
         //log.info("planArr = "+arr);
         
         String myctx = req.getContextPath();
         String pageNavi = paging.getPageNavi(myctx, "plan");
         
         m.addAttribute("totalCount", totalCount);
         m.addAttribute("paging", paging);
         m.addAttribute("pageNavi", pageNavi);
         m.addAttribute("findKeyword",req.getParameter("findKeyword"));
      
      return "plan/planMain";
   }
   @RequestMapping("/searchPlan")
   public String searchPlan(@ModelAttribute PagingVO paging, HttpServletRequest req, Model model) {
      //log.info(paging);
      int totalCount = planService.getTotalCount(paging);

      paging.setTotalCount(totalCount);
      paging.setPageSize(10);  
      paging.setPagingBlock(5); 
      paging.init(); 

      List<PlanVO> pList = planService.getSearchList(paging);

      log.info(Integer.toString(totalCount));
      //log.info(pList);
      String myctx = req.getContextPath();
      // 페이지 네비 문자열 받아오기
      String pageNavi = paging.getPageNavi(myctx, "chat");

      model.addAttribute("totalCount", totalCount);
      model.addAttribute("planArr", pList);
      model.addAttribute("paging", paging);
      model.addAttribute("pageNavi", pageNavi);
      model.addAttribute("findKeyword",req.getParameter("findKeyword"));

      return "plan";
   }
   
   @RequestMapping(value="/plan/makePlan",method=RequestMethod.POST)
   public String CreatePlan(@ModelAttribute PlanVO pv, Model m, HttpSession ses)throws Exception{
      MemberVO user=(MemberVO)ses.getAttribute("user");
      log.info("share_ornot 대체 값이 뭐야 : "+pv.getShare_ornot());
      int share_ornot=pv.getShare_ornot();
      int n = 0;
      String code=new CreateRandomCode().createRandomCode();
      
      ArrayList<PlanVO> placesList2=(ArrayList<PlanVO>) ses.getAttribute("placesArr");
      for(PlanVO plan:placesList2) {
    	  plan.setPlan_title(pv.getPlan_title());
    	  plan.setPlan_about(pv.getPlan_about());
    	  plan.setPlan_code(code);
    	  n=planService.createPlan(plan);
      }
      if(n>0) {
         PlanVO myInfo=planService.planMyInfo(user.getUser_no());
         myInfo.setShare_ornot(share_ornot);
         n=planService.createPlanInfo(myInfo);
            if(n>0) {
               if(share_ornot==1) {
                  ChatVO chat=new ChatVO();
                  chat.setChat_title(myInfo.getPlan_title());
                  chat.setChat_text("|start|");
                  chat.setChat_wtime(null);
                  chat.setChat_img("bikeicon.jpg");
                  chat.setChat_user_no(user.getUser_no());
                  chat.setRoom_code(code);
                  chat.setChat_info(myInfo.getPlan_about());
                  log.info("chat : "+chat);
               n=chatService.createChat(chat, user);
               }
	               placesList.clear();
	           	   ses.removeAttribute("placesArr");
	               String loc="../plan";
	               m.addAttribute("loc", loc); 
                  
                  return "message";
               }
               String msg="플랜 생성에 실패함...";
               String loc="javascript:history.back()";
               
               m.addAttribute("msg", msg);
               m.addAttribute("loc", loc); 
               
               return "message";
         }
         String msg="플랜 생성에 실패함...";
         String loc="javascript:history.back()";
         
         m.addAttribute("msg", msg);
         m.addAttribute("loc", loc); 
         
         return "message";
      }

   @RequestMapping(value="/plan/planView",method=RequestMethod.GET)
   public String showPlan(@RequestParam("plan_code") String plan_code, Model m
		   //@ModelAttribute Model m 하면 안됨
		   ) {
	   PlanVO pv=planService.showOnePlan(plan_code);
       List<PlanVO> arr=planService.showPlan(plan_code);
       List<Plan_InfoVO> arr2=planService.planMemberList(plan_code);
       m.addAttribute("planInfo", pv);
       m.addAttribute("planArr", arr);
       m.addAttribute("planMember", arr2);
       //log.info(arr);
       return "plan/planView";
   }
   
   @RequestMapping(value="plan/joinPlan")
   public @ResponseBody Map<String,Integer>joinPlan(@RequestParam ("plan_code") String plan_code,
           @RequestParam ("user_no") int user_no) throws Exception{
	   Map<String,Object> map=new HashMap<>(); 

	   map.put("user_no", user_no);
	   map.put("plan_code", plan_code);
	   Map<String,Integer> result=new HashMap<>();
	 
	   int n=planService.joinPlan(map);
	   if(n>0) {
		   Map<String,Object> map2=new HashMap<>();
		   map2.put("user_no", user_no);
		   map2.put("room_code", plan_code);
		   n=chatService.addChatMember(map2);
		   if(n>0) {
			   result.put("result",1);
			   return result;
		   }else {
			   result.put("result",0);
			   return result;
		   }
	   }else {
		   result.put("result",0);
		   return result;
	   }

   }

   @RequestMapping("/plan/callPlaceList")
      public String placeList(@ModelAttribute com.tis.place.domain.PagingVO paging, HttpServletRequest req, Model m) {
         int totalCount = placeService.getTotalPlaceCount();

         paging.setTotalCount(totalCount);
         paging.init();
         //log.info("paging: " + paging);

         List<PlaceVO> pList = placeService.getAllPlaceList(paging);
         String myctx = req.getContextPath();

         String pageNavi = paging.getPageNavi(myctx, "plan/callPlaceList");

         m.addAttribute("totalCount", totalCount);
         m.addAttribute("placeArr", pList);
         m.addAttribute("paging", paging);
         m.addAttribute("pageNavi", pageNavi);

         return "plan/callPlaceList";
         // "WEB-INF/views/place/placeList.jsp"
      } // ---------------------------------
   
    @RequestMapping("/plan/callDirectionList")
      public String directionList(@ModelAttribute com.tis.place.domain.PagingVO paging, HttpServletRequest req, Model m) {
         int totalCount = placeService.getTotalDirectionCount();

         paging.setTotalCount(totalCount);
         paging.init(); 
         //log.info("paging: " + paging);

         List<DirectionVO> dList = placeService.getAllDirectionList(paging);
         String myctx = req.getContextPath();

         String pageNavi = paging.getPageNavi(myctx, "plan/callDirectionList");

         m.addAttribute("totalCount", totalCount);
         m.addAttribute("directionArr", dList);
         m.addAttribute("paging", paging);
         m.addAttribute("pageNavi", pageNavi);

         return "plan/callDirectionList";
         // "WEB-INF/views/place/directionList.jsp"
      } // ---------------------------------
    
    @RequestMapping(value="/plan/callPlace", method = RequestMethod.GET)
    public @ResponseBody PlanVO addPlace(@RequestParam("place_no") int place_no,
    		@RequestParam("place_title") String place_title, HttpSession ses)
    		//@ModelAttribute HttpSession ses로 했다가 고생함
    		throws Exception{
    	PlanVO pv=new PlanVO();
    	MemberVO user=(MemberVO)ses.getAttribute("user");
        pv.setUser_no(user.getUser_no());
        pv.setPlace_no(place_no);
        pv.setPlace_title(place_title);
        //planService.addPlace(pv);
        
        placesList.add(pv);
        ses.setAttribute("placesArr", placesList);
        log.info("placesArr : "+placesList);
        
        return pv;
    }//-------------------------------------
    
    @RequestMapping(value="/plan/callDirection", method = RequestMethod.GET)
    public @ResponseBody PlanVO addDirection(@RequestParam("direction_no") int direction_no,
    		@RequestParam("direction_title") String direction_title, HttpSession ses)
    		//@ModelAttribute HttpSession ses로 했다가 고생함
    		throws Exception{
    	PlanVO pv=new PlanVO();
    	MemberVO user=(MemberVO)ses.getAttribute("user");
        pv.setUser_no(user.getUser_no());
        pv.setDirection_no(direction_no);
        pv.setDirection_title(direction_title);
        //planService.addPlace(pv);
        
        placesList.add(pv);
        ses.setAttribute("placesArr", placesList);
        log.info("placesArr : "+placesList);
        
        return pv;
    }//--------------------------------------
    
    @RequestMapping(value="/plan/deletePlace", method = RequestMethod.GET)
    public @ResponseBody ArrayList<PlanVO> deletePlace(@RequestParam("place_no") int place_no,
    		HttpSession ses) throws Exception{
    	ArrayList<PlanVO> placesList2=(ArrayList<PlanVO>) ses.getAttribute("placesArr");
    	
    	for(int i=0;i<placesList2.size();i++) {
    		if((placesList2.get(i)).getPlace_no()==place_no) {
    			placesList2.remove(i);
    		}
    	}
    	log.info("placesArr 삭제 후 : "+placesList2);
    	ses.setAttribute("placesArr", placesList2);

        return placesList2;
    }
    
    @RequestMapping(value="/plan/deleteDirection", method = RequestMethod.GET)
    public @ResponseBody ArrayList<PlanVO> deleteDirection(@RequestParam("Direction_no") int Direction_no,
    		HttpSession ses) throws Exception{
    	ArrayList<PlanVO> placesList2=(ArrayList<PlanVO>) ses.getAttribute("placesArr");
    	
    	for(int i=0;i<placesList2.size();i++) {
    		if((placesList2.get(i)).getDirection_no()==Direction_no) {
    			placesList2.remove(i);
    		}
    	}
    	log.info("placesArr 삭제 후 : "+placesList2);
    	ses.setAttribute("placesArr", placesList2);

        return placesList2;
    }
    
    @RequestMapping(value="/plan/clearPlace", method = RequestMethod.GET)
    public @ResponseBody HashMap<String,Integer> deletePlace(
    		HttpSession ses) throws Exception{
    	
    	placesList.clear();
    	ses.removeAttribute("placesArr");
    	
    	HashMap<String, Integer> map=new HashMap<>();
        map.put("clearPlaceOk",1);
        return map;
    }
   }