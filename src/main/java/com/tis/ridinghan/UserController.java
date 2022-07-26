package com.tis.ridinghan;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.tis.common.CommonUtil;
import com.tis.place.domain.DirectionVO;
import com.tis.place.domain.PagingVO;
import com.tis.place.domain.PlaceVO;
import com.tis.place.service.PlaceService;
import com.tis.user.model.MemberVO;
import com.tis.user.model.NotUserException;
import com.tis.user.service.UserService;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
public class UserController {

   @Autowired
   private CommonUtil util;

   @Inject
   private UserService userService;
   
   @Autowired
      private PlaceService placeService;
   
   private final Logger log = LoggerFactory.getLogger(UserController.class.getName());
		   
   ///////////////////////// 회원가입
   @RequestMapping(value = "/signup", method = RequestMethod.GET)
   public String showUserForm() {
      return "signup";
   }

   @RequestMapping(value = "/signup", method = RequestMethod.POST)
   public String userJoin(@ModelAttribute MemberVO mv, Model m) {
      log.info("user==" + mv + ", user.getName() : " + mv.getUser_name());
      log.info("userService==" + this.userService);
      int n = 0;
      n = this.userService.createMember(mv);

      String msg = (n > 0) ? "회원가입 완료" : "회원가입 실패";
      String loc = (n > 0) ? "login" : "javascript:history.back()";

      m.addAttribute("msg", msg);
      m.addAttribute("loc", loc);

      return "message";
   }

   ///////////////////////// 중복체크
   @GetMapping(value = "/idcheck", produces = "application/json; charset=UTF-8;")
   public @ResponseBody Map<String, Integer> idCheck(@RequestParam("user_id") String user_id) {
      MemberVO idOkay = this.userService.memberChkByEmail(user_id);
      int n = (idOkay != null) ? -1 : 1;
      Map<String, Integer> map = new HashMap<>();
      map.put("idOkay", n);
      return map;
   }

   @GetMapping(value = "/nickcheck", produces = "application/json; charset=UTF-8;")
   public @ResponseBody Map<String, Integer> nickCheck(@RequestParam("nickName") String nickName) {
      MemberVO nickOkay = this.userService.memberChkByNick(nickName);
      int n = (nickOkay != null) ? -1 : 1;
      Map<String, Integer> map = new HashMap<>();
      map.put("nickOkay", n);
      return map;
   }

/////////////////////////마이페이지 창
   @GetMapping("/mypage")
   public String showMypageForm() {
      return "/mypage/mypageMain";
   }

////////////////////////마이페이지 레프트 바
   @RequestMapping("/mypageTop")
   public void showMypageTop() {

   }

////////////////////////내가 등록한 장소
   @GetMapping("/mypage/myPlace")
   public String showMyFavorite(Model m, HttpSession ses,
         @ModelAttribute PagingVO paging, HttpServletRequest req,
         @ModelAttribute PlaceVO place
         ) {
      int totalCount = placeService.getTotalPlaceCount();
      
      MemberVO user=(MemberVO)ses.getAttribute("user");
      paging.setTotalCount(totalCount); // 총 장소 수 셋팅
      paging.init(); // 페이징 처리관련 연산 수행
      ////////////////////////////////////////////////////
      paging.setP_user_no(user.getUser_no());
      log.info("paging: " + paging);
       
      
       paging.setP_user_no(user.getUser_no()); 
      
      List<PlaceVO> pList = placeService.getAllPlaceList(paging);
      List<PlaceVO> pList2 = placeService.getMyPlaceList(paging);
      String myctx = req.getContextPath();
      
      // 페이지 네비 문자열 받아오기
      String pageNavi = paging.getPageNavi(myctx, "mypage/myPlace");
      log.info("paging!!!"+paging);
      log.info("place!!!"+place);
      
      m.addAttribute("totalCount", totalCount);
      m.addAttribute("placeArr", pList);
      m.addAttribute("myPlace",pList2);
      m.addAttribute("paging", paging);
      m.addAttribute("pageNavi", pageNavi);
      m.addAttribute("place",place);
      return "mypage/myPlace";
      
   }
   //내가 등록한 경로
   @GetMapping("/mypage/myDirection")
   public String showMyFavorite(Model m, HttpSession ses,
         @ModelAttribute PagingVO paging, HttpServletRequest req,
         @ModelAttribute DirectionVO direction
         ) {
      int totalCount = placeService.getTotalPlaceCount();
      
      MemberVO user=(MemberVO)ses.getAttribute("user");
      paging.setTotalCount(totalCount); // 총 장소 수 셋팅
      paging.init(); // 페이징 처리관련 연산 수행
      ////////////////////////////////////////////////////
      paging.setP_user_no(user.getUser_no());
      log.info("paging: " + paging);
       
      
      List<DirectionVO> dList = placeService.getAllDirectionList(paging);
      List<DirectionVO> dList2 = placeService.getMyDirectionList(paging);
      String myctx = req.getContextPath();
      
      // 페이지 네비 문자열 받아오기
      String pageNavi = paging.getPageNavi(myctx, "mypage/myDirection");
      
      log.info("direction!!!"+direction);
      
      m.addAttribute("totalCount", totalCount);
      m.addAttribute("directionArr", dList);
      m.addAttribute("myDirection",dList2);
      m.addAttribute("paging", paging);
      m.addAttribute("pageNavi", pageNavi);
      m.addAttribute("direction",direction);
      return "mypage/myDirection";
      
   }


   

////////////////////////진행중인 여행
   @GetMapping("/mypage/planList")
   public String showTravelingList(Model m, HttpSession ses) {
      return "mypage/planList";
   }

/////////////////////////회원정보 수정
   @GetMapping("/mypage/myInfo")
   public String showMyInfo(Model m, HttpSession ses) {
      return "mypage/memberInfo";
   }

   @RequestMapping(value = "/mypage/myInfoEdit", method = RequestMethod.POST)
   public String myInfoEdit(
         @RequestParam String newPwd,
         @RequestParam("mypfile") MultipartFile mypfile,
         @RequestParam(defaultValue="") String old_mypfile,
         @ModelAttribute MemberVO mv, Model m, HttpSession ses) throws NotUserException {

      ServletContext sc=ses.getServletContext();
      String upDir=sc.getRealPath("/asset/images/user");
      log.info("upDir="+upDir);
      
      //////// 비밀번호 체크
      MemberVO user = (MemberVO) ses.getAttribute("user");
      boolean pwdisCorrect = user.getPwd().equals(mv.getPwd());

      if (pwdisCorrect == false) {
         throw new NotUserException("비밀번호가 일치하지 않습니다.");
      } else {
         System.out.println("패스워드 일치함");
         if (!newPwd.isEmpty()) {
            mv.setPwd(newPwd);
         }else {
            mv.setPwd(user.getPwd());
         }
         mv.setUser_id(user.getUser_id());
         mv.setUser_img(old_mypfile);
         //프로필 이미지 업로드
         String user_img=mypfile.getOriginalFilename();
         if(!mypfile.isEmpty()||mypfile!=null) { //프로필 이미지 등록
            try {
               mypfile.transferTo(new File(upDir,user_img));
               mv.setUser_img(user_img);   
               
               if(!old_mypfile.isEmpty()||old_mypfile!=null) { //예전 이미지는 삭제처리
               File delF=new File(upDir,old_mypfile);
               boolean b=delF.delete();
               log.error("예전파일 "+old_mypfile+" 삭제 처리 여부 : "+b);
               }
            }catch(Exception e) {
               log.error("파일 업로드 중 에러 : "+e.getMessage());
            }
         }
         int n = userService.editMember(mv);
         System.out.println("mv = " + mv);
         if(n>0) {
            ses.setAttribute("user", mv);
         }

         String msg = (n > 0) ? "회원정보 수정 완료" : "회원정보 수정 실패";
         String loc = (n > 0) ? "myInfo" : "javascript:history.back()";

         m.addAttribute("msg", msg);
         m.addAttribute("loc", loc);

         return "message";
      }//else------------------------------------------------------
   }
   
//////////////////회원 탈퇴
   @RequestMapping(value = "/mypage/unregisterMember", method = RequestMethod.POST)
   public String unregisterMember(
         @RequestParam String newPwd,
         @ModelAttribute MemberVO mv, Model m, HttpSession ses) throws NotUserException {
   
      ////////비밀번호 체크
      MemberVO user = (MemberVO) ses.getAttribute("user");
      boolean pwdisCorrect = user.getPwd().equals(mv.getPwd());

      if (pwdisCorrect == false) {
         throw new NotUserException("비밀번호가 일치하지 않습니다.");
      } else {
         int n=userService.quitMember(user.getUser_no());
         
         if(n>0) {
            ses.removeAttribute("user");
         }
         
         String msg = (n > 0) ? "성공적으로 탈퇴되었습니다" : "오류 발생";
         String loc = (n > 0) ? "myInfo" : "javascript:history.back()";

         m.addAttribute("msg", msg);
         m.addAttribute("loc", loc);

         return "message";
      }
   
   }
}