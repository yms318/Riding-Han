package com.tis.ridinghan;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.tis.campaign.model.CampaignVO;
import com.tis.campaign.model.PagingVO;
import com.tis.campaign.service.CampaignService;

@Controller(value="IndexController")
public class IndexController {
   @Autowired
   private CampaignService campaignService;
   
   @RequestMapping("/top")
   public void showTop() {
      
   }
   
   @RequestMapping("/foot")
   public void showFoot() {
      
   }
   
   @RequestMapping("/carousel")
   public void showCarousel() {
      
   }
   
   @RequestMapping("/policy")
   public void showPolicy() {
      
   }
   
   @RequestMapping("/service")
   public void showService() {
      
   }
   
   @RequestMapping("/index")
   public String hello(@ModelAttribute PagingVO paging, HttpServletRequest req, Model model) {
      
      int totalCount = campaignService.getTotalCount();

      paging.setTotalCount(totalCount); // 총 게시글 수 세팅
      paging.setPageSize(30); // 한 페이지당 보여줄 회원목록 갯수
      paging.setPagingBlock(5); // 페이징 블럭
      paging.init(); // 페이징 처리 관련 연산수행
 
      List<CampaignVO> cList = campaignService.getAllCampaignList(paging);
      model.addAttribute("campaignArr", cList);
      return "index";//뷰네임을 문자열로 변환
      //"WEB-INF/views/index.jsp를 찾아감
   }

}