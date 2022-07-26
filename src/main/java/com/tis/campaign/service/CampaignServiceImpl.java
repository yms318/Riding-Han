package com.tis.campaign.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.tis.campaign.mapper.CampaignMapper;
import com.tis.campaign.model.CampaignVO;
import com.tis.campaign.model.PagingVO;

@Service
public class CampaignServiceImpl implements CampaignService {
     
   @Inject
   private CampaignMapper campaignMapper;


   @Override
   public List<CampaignVO> getAllCampaignList(int start, int end) {
      return campaignMapper.getAllCampaignList(start, end);
   }

   @Override 
   public List<CampaignVO> getAllCampaignList(PagingVO paging) {
      return campaignMapper.getAllCampaignListPaging(paging);
   }

   @Override
   public int getTotalCount() {
      // TODO Auto-generated method stub
      return 0;
   }

   
}

   