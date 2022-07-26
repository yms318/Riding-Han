package com.tis.campaign.mapper;

import java.util.List;

import com.tis.campaign.model.CampaignVO;
import com.tis.campaign.model.PagingVO;

public interface CampaignMapper {
	
	List<CampaignVO> getAllCampaignList(int start,int end);
	
	List<CampaignVO> getAllCampaignListPaging(PagingVO paging);
}
