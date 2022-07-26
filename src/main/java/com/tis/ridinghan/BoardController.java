package com.tis.ridinghan;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.tis.board.model.BoardVO;
import com.tis.board.model.PagingVO;
import com.tis.board.model.ReplyVO;
import com.tis.board.service.BoardService;
import com.tis.user.model.MemberVO;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
public class BoardController {
   @Autowired
   private BoardService boardService;
   
   private final Logger log = LoggerFactory.getLogger(UserController.class.getName());

   @RequestMapping(value = "/boardInsert", method = RequestMethod.POST)
      public String insertBoard(@RequestParam("myfile") MultipartFile myfile, 
            @ModelAttribute BoardVO board, Model model, HttpSession ses) {
         MemberVO user=(MemberVO)ses.getAttribute("user");
        
         
         if(user==null) {
            String str="로그인 해야 이용가능합니다.";
            String loc="login";
            model.addAttribute("msg", str);
            model.addAttribute("loc", loc);
            
            return "message";
         }
         board.setBoard_user_no(user.getUser_no());
         board.setUser_id(user.getUser_id());
         board.setUser_nick(user.getNickName());
         log.info("user_no : "+board.getBoard_user_no()+", user_id : "+board.getUser_id());
         
         
         ServletContext sc=ses.getServletContext();
        String upDir=sc.getRealPath("/asset/images/board");
        
        log.info("upDir=="+upDir);
        
        File dir=new File(upDir);
        if(!dir.exists()) {
           dir.mkdirs(); //업로드 디렉토리 생성 
        }
        //파일을 업로드 했다면
        if(!myfile.isEmpty()) {
           //먼저 첨부파일, 파일크기를 알아내자
           String originfname=myfile.getOriginalFilename(); //원본파일명
           long fsize=myfile.getSize(); //파일크기
           
           //동일한 파일명일 경우 덮어쓰기를 방지하기 위해 랜덤한 값과 결합하자
           UUID uuid=UUID.randomUUID();
           String fname=uuid.toString()+"_"+originfname; //물리적 파일명
           log.info("fname=="+fname);
           
           board.setOriginFilename(originfname);
           board.setFilename(fname);
           board.setFilesize(fsize);
           
           //log.info(board);
           
           //업로드 처리 
           try {
              myfile.transferTo(new File(upDir,fname));
           }catch(Exception e) {
              log.error("게시글 업로드 중 예외: "+e.getMessage());
           }
           
        }//------------------------------------------------------if
         
        //DB에 게시글 insert
        
        int n = 0;
         n = this.boardService.insertBoard(board);
        
         String str = (n > 0) ? "글쓰기 성공" : "글쓰기 실패";
         String loc = (n > 0) ? "board" : "javascript:history.back()";
         model.addAttribute("msg", str);
         model.addAttribute("loc", loc);

         return "message";
      }
   @RequestMapping("/board")
   public String boardList(@ModelAttribute PagingVO paging, HttpServletRequest req, Model model) {
      int totalCount = boardService.getTotalCount();

      paging.setTotalCount(totalCount); // 총 게시글 수 세팅
      paging.setPageSize(10); // 한 페이지당 보여줄 회원목록 갯수
      paging.setPagingBlock(5); // 페이징 블럭
      paging.init(); // 페이징 처리 관련 연산수행

      List<BoardVO> bList = boardService.getAllBoardList(paging);
      
      List<BoardVO> bList2 = boardService.getTop5BoardList(paging);

      String myctx = req.getContextPath();
      // 페이지 네비 문자열 받아오기
      String pageNavi = paging.getPageNavi(myctx, "board");
      
      model.addAttribute("totalCount", totalCount);
      model.addAttribute("boardArr", bList);
      model.addAttribute("Top5BoardList", bList2);
      
      model.addAttribute("paging", paging);
      model.addAttribute("pageNavi", pageNavi);

      return "board/boardList";
   }
   
   @RequestMapping("/searchBoard")
      public String searchBoard(@ModelAttribute PagingVO paging, HttpServletRequest req, Model model) {
         //log.info(paging);
         int totalCount = boardService.getTotalCount(paging);

         paging.setTotalCount(totalCount);
         paging.setPageSize(10);  
         paging.setPagingBlock(5); 
         paging.init(); 

         List<BoardVO> bList = boardService.getSearchList(paging);
         List<BoardVO> bList2 = boardService.getTop5BoardList(paging);
         model.addAttribute("Top5BoardList", bList2);
         
         //log.info(totalCount);
         //log.info(bList);
         String myctx = req.getContextPath();
         // 페이지 네비 문자열 받아오기
         String pageNavi = paging.getPageNavi(myctx, "board");

         model.addAttribute("totalCount", totalCount);
         model.addAttribute("boardArr", bList);
         model.addAttribute("paging", paging);
         model.addAttribute("pageNavi", pageNavi);
         model.addAttribute("findKeyword",req.getParameter("findKeyword"));

         return "board/boardList";
      }

   @GetMapping("/boardView")
   public String boardView(@ModelAttribute PagingVO paging,HttpSession ses,Model model,
         @RequestParam(defaultValue = "0") int board_idx
        ) {
       if(board_idx==0) {
          return "redirect:boardView";
       }
      /* BoardVO user_nick=(BoardVO)ses.getAttribute("user"); */
      
      /* MemberVO user=(MemberVO)ses.getAttribute("user"); */
     
     this.boardService.updateReadnum(board_idx); //조회수 증가  
      BoardVO board = (BoardVO) boardService.selectBoardView(board_idx); 
      
      List<BoardVO> bList2 = boardService.getTop5BoardList(paging);
      List<ReplyVO> rList=boardService.getReplyList(board_idx);
      log.info("rList="+rList);
      MemberVO loginCheck=(MemberVO)ses.getAttribute("user");
      /* int m=this.boardService.loginCheck("loginCheck", loginCheck); */
      
      model.addAttribute("loginCheck",loginCheck);
      model.addAttribute("Top5BoardList", bList2);
      model.addAttribute("replyArr",rList);
      
      int n=this.boardService.countReply(board_idx);
      
      model.addAttribute("count",n);
      //log.info(board);
      model.addAttribute("bi", board);
      /* model.addAttribute("usernick",user_nick.getUser_nick()); */
      return "board/boardView";
   }
   
   @PostMapping("/boardReply")
   public String boardRePly( @ModelAttribute ReplyVO reply,Model m, @RequestParam(defaultValue="0") int board_idx,
         @RequestParam(defaultValue="") String board_title,
         HttpSession ses) {   
      log.info(Integer.toString(board_idx));
      MemberVO user=(MemberVO)ses.getAttribute("user");
      
      reply.setReply_wname(user.getNickName());
      reply.setBoard_idx_fk(board_idx);
      reply.setReply_id(user.getUser_id());
      
      //log.info(reply); 
      
      int n=boardService.insertReply(reply);
      /*
       * List<ReplyVO> replyArr=boardService.getReplyList(board_idx);
       * m.addAttribute("replyArr",replyArr);
       */
      
    
      
      return "redirect:boardView?board_idx="+board_idx;
   }
   
   
   
   
   @RequestMapping(value="/fileDown",produces="application/octet-stream")
   @ResponseBody
   public ResponseEntity<Resource> download(HttpServletRequest req,
            @RequestHeader("User-Agent") String userAgent,
            @RequestParam("filename") String fname,
            @RequestParam("origin") String originfname){
         log.info("userAgent: "+userAgent+", fname: "+fname);
          
         String upDir=req.getServletContext().getRealPath("/asset/images/board");
         log.info("upDir= "+upDir);
         
         //업로드된 디렉토리의 절대경로 얻기
         String filePath=upDir+"/"+fname;
         log.info("filePath="+filePath);
         FileSystemResource resource=new FileSystemResource(filePath);
         if(!resource.exists()) {
            //해당 파일이 없다면
            return new ResponseEntity(HttpStatus.NOT_FOUND);
         }
         //브라우저 유형별로 인코드 처리
         boolean checkIE = (userAgent.indexOf("MSIE")>-1 || userAgent.indexOf("Trident")> -1);
         //MSIE, Trident 둘 중 하나가 붙으면 익스플로어
         
         String downfname=null;
         
      try {
         if(checkIE) {
            //IE일 경우
            downfname=URLEncoder.encode(originfname,"UTF8").replaceAll("\\+", " "); 
            //+를 공백문자로 전환
         }else {
            //IE이외의 브라우저일 경우
            downfname=new String(originfname.getBytes("UTF-8"),"ISO-8859-1");
         }
      }catch(UnsupportedEncodingException e){
         // TODO Auto-generated catch block
         log.info("파일명 인코딩 중 에러: " + e.getMessage());
      }
         HttpHeaders header = new HttpHeaders();
         header.add("Content-Disposition", "attachment; filename= " + downfname);
         return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
      }

   @PostMapping("/boardEditForm")
   public String boardEdit(Model model, @RequestParam(defaultValue = "0") int board_idx,
         @RequestParam(defaultValue = "0") String board_pwd) {
      BoardVO vo = (BoardVO) boardService.selectBoardView(board_idx);
      model.addAttribute("bi", vo);
      if (vo.getBoard_pwd().equals(board_pwd)) {
         return "board/boardEdit";
      }else {
         String str = "비밀번호가 틀렸습니다.";
         String loc = "javascript:history.back()";
         model.addAttribute("msg", str);
         model.addAttribute("loc", loc);
         return "message";
      }
      
   }

   @PostMapping("/boardEdit")
   public String boardEditEnd(Model model, @ModelAttribute BoardVO board) {
      
      int n = 0;
      n = this.boardService.editBoard(board);

      String str = (n > 0) ? "수정 성공" : "수정 실패";
      String loc = (n > 0) ? "board" : "javascript:history.back()";
      model.addAttribute("msg", str);
      model.addAttribute("loc", loc);

      return "message";
   }
   @PostMapping("/delReply")
   public String delReply(Model model,HttpSession ses,
         @RequestParam(defaultValue="0")int reply_idx,
         @RequestParam(defaultValue="0") int board_idx) {
      BoardVO vo=boardService.selectBoardView(board_idx);
      MemberVO user=(MemberVO)ses.getAttribute("user");
      ReplyVO replyVo=boardService.selectReply(reply_idx);
      
      /*
       * 
       * if(vo==null) { String str="존재하지 않는 게시글 입니다."; String loc="board";
       * model.addAttribute("msg", str); model.addAttribute("loc",loc); return
       * "message"; }
       */
      log.info("vo.getUser_nick() ="+vo);
      log.info("board_idx="+board_idx);
      if(replyVo.getReply_id().equals(user.getUser_id())) {
         int n=boardService.delReply(board_idx,reply_idx);
         if(n>0) {
            String str="삭제 성공";
            String loc="boardView?board_idx="+board_idx;
            model.addAttribute("msg", str);
            model.addAttribute("loc", loc);
            return "message";
         }
      }else{
         String str="작성자만 삭제할 수 있습니다.";
         String loc="boardView?board_idx="+board_idx;
         model.addAttribute("msg",str);
         model.addAttribute("loc", loc);
         return "message";
      }
      
      return "redirect:boardView?board_idx="+board_idx;
      
   }

   @PostMapping("/boardDel")
   public String boardDel(Model model, @RequestParam(defaultValue = "0") int board_idx,
         @RequestParam(defaultValue = "0") String board_pwd) {
      BoardVO vo = boardService.selectBoardView(board_idx);
      if (vo == null) {
         String str = "존재하지 않는 게시글 입니다.";
         String loc = "board";
         model.addAttribute("msg", str);
         model.addAttribute("loc", loc);
         return "message";
      }
      if (vo.getBoard_pwd().equals(board_pwd)) {

         int n = boardService.deleteBoard(board_idx);
         if (n > 0) {
            String str = "삭제 성공";
            String loc = "board";
            model.addAttribute("msg", str);
            model.addAttribute("loc", loc);
            return "message";
         }else {
            String str = "삭제 실패";
            String loc = "board";
            model.addAttribute("msg", str);
            model.addAttribute("loc", loc);
            return "message";
         }
      } else {
         String str = "비밀번호가 틀렸습니다.";
         String loc = "javascript:history.back()";
         model.addAttribute("msg", str);
         model.addAttribute("loc", loc);
         return "message";

      }

   }
}