package com.tis.ridinghan;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.ServletContext;
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
import org.springframework.web.multipart.MultipartFile;

import com.tis.chat.model.ChatVO;
import com.tis.chat.model.Chat_MemberVO;
import com.tis.chat.model.PagingVO;
import com.tis.chat.service.ChatService;
import com.tis.common.CreateRandomCode;
import com.tis.user.model.MemberVO;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
public class ChatController {
	
	private final Logger log = LoggerFactory.getLogger(UserController.class.getName());
   
   @Inject
   private ChatService chatService;
   
   @RequestMapping(value="/chat",method=RequestMethod.GET)
   public String showChatList(@ModelAttribute PagingVO paging,
         HttpServletRequest req, Model m) {
         
      //채팅리스트 페이징////////////////////////
      int totalCount=chatService.getTotalCount(paging);
      paging.setTotalCount(totalCount);
      paging.setPageSize(10);
      paging.setPagingBlock(5);
      paging.init();
      
      List<ChatVO> arr=chatService.showChatList(paging);
      
      String myctx=req.getContextPath();
      String pageNavi=paging.getPageNavi(myctx, "chat");
      
      m.addAttribute("totalCount",totalCount);
      m.addAttribute("chatArr",arr);
      m.addAttribute("paging",paging);
      m.addAttribute("pageNavi",pageNavi);
      
      return "chat/chatMain";
   }
   
   @RequestMapping("/searchChat")
    public String searchChat(@ModelAttribute PagingVO paging, HttpServletRequest req, Model model) {
       //log.info(paging);
       int totalCount = chatService.getTotalCount(paging);

       paging.setTotalCount(totalCount);
       paging.setPageSize(10);  
       paging.setPagingBlock(5); 
       paging.init(); 

       List<ChatVO> cList = chatService.getSearchList(paging);

       //log.info(totalCount);
       //log.info(cList);
       String myctx = req.getContextPath();
       // 페이지 네비 문자열 받아오기
       String pageNavi = paging.getPageNavi(myctx, "chat");

       model.addAttribute("totalCount", totalCount);
       model.addAttribute("chatArr", cList);
       model.addAttribute("paging", paging);
       model.addAttribute("pageNavi", pageNavi);
       model.addAttribute("findKeyword",req.getParameter("findKeyword"));

       return "chat/chatMain";
    }

   
   @RequestMapping(value="/chat/newChat",method=RequestMethod.POST)
   public String createChat(@RequestParam("myfile") MultipartFile myfile,
         @ModelAttribute ChatVO cv, Model m, HttpSession ses) {
      
      ServletContext sc=ses.getServletContext();
      String upDir=sc.getRealPath("/asset/images/chat");
      log.info("upDir="+upDir);
      MemberVO user=(MemberVO)ses.getAttribute("user");
      
      String chat_img=myfile.getOriginalFilename();
      if(myfile.isEmpty()) {
         cv.setChat_img("bikeicon.jpg");
      }else {
         try {
            myfile.transferTo(new File(upDir, chat_img));
            cv.setChat_img(chat_img);
         }catch(IOException e) {
            log.error("파일 업로드 중 에러 : "+e.getMessage());
         }
      }
      cv.setChat_text("|start|");
      cv.setChat_user_no(user.getUser_no());   
      String room_code=new CreateRandomCode().createRandomCode();
      cv.setRoom_code(room_code);
      
      log.info("cv = "+cv);
      
      int n=this.chatService.createChat(cv, user);
         
      if(n<0) {
         String msg="채팅방 만들기에 실패하였습니다..";
         String loc="javascript:history.back()";
         
         m.addAttribute("msg", msg);
         m.addAttribute("loc", loc);
         
         return "message";
      }else {
         String msg="환영합니다."+user.getNickName()+"님";
         String loc="../chat";
         
         m.addAttribute("msg", msg);
         m.addAttribute("loc", loc);
         
         return "message";
      }
   }
   
   @RequestMapping(value="/chat/enterChat", method=RequestMethod.GET)
   public String enterChat(
         @RequestParam(value="room_code", defaultValue="", required=false) String room_code,
          Model m, HttpSession ses) {
      MemberVO vo=(MemberVO)ses.getAttribute("user");

      Map<String,Object> map=new HashMap<>();
      map.put("user_no", vo.getUser_no());
      map.put("room_code", room_code);
      
      Chat_MemberVO cmvo=chatService.chatMyInfo(map);//멤버가 방에 있는지 없는지 확인
      log.info("cmvo :"+cmvo);
      if(cmvo==null) {//방에 없는 경우
         int n=chatService.addChatMember(map);//Chat_Member에 추가
         if(n<0) {
            String msg="멤버 추가 실패";
            String loc="javascript:history().back";
            m.addAttribute("msg", msg);
            m.addAttribute("loc", loc);
            return "message";
         }
      }
      ChatVO chatRoomInfo=chatService.chatRoomInfo(room_code); //현 채팅방 정보
      List<Chat_MemberVO> chatMemberList=chatService.chatMemberList(room_code); //채팅방 멤버 목록
      Chat_MemberVO chatMyInfo=chatService.chatMyInfo(map);             
      List<ChatVO> allChat=chatService.showAllChat(chatMyInfo); //채팅방 대화 내용
      
      m.addAttribute("chatRoomInfo", chatRoomInfo);
      m.addAttribute("chatMemberList", chatMemberList);
      m.addAttribute("allChat", allChat);
      return "chat/chat";
   }
   
   @RequestMapping(value="/chat/quitChat")
   public @ResponseBody Map<String,Integer> quitChat(@RequestParam ("room_code") String room_code,
                  @RequestParam ("user_no") int user_no) throws Exception{
      Map<String,Object> map=new HashMap<>();
      
      //log.info("룸코드, 유저넘버 : "+room_code+" , "+user_no);
      
      map.put("user_no", user_no);
      map.put("room_code", room_code);
      Map<String,Integer> result=new HashMap<>();
      
      int n=chatService.quitChatMember(map);   
      if(n>0) {
         List<Chat_MemberVO> cmvo=chatService.chatMemberList(room_code);
         log.info("cmvo="+cmvo);
         if(cmvo==null) {//멤버가 없을 경우 모든 채팅과 방을 삭제
            log.info("삭제 됐냐 안됐냐222 n = "+result);
            n=chatService.deleteChatRoom(room_code);
            if(n>0) {   
               result.put("result",1);
               log.info("삭제 됐냐 안됐냐333 n = "+result);
               return result;
            }
         }else {
            result.put("result",0);
            return result; 
         }
         result.put("result",1);
         return result;
      }else {
         result.put("result",0);
         return result; 
      }
   }
   
   
   
}