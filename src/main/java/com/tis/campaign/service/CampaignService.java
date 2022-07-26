package com.tis.campaign.service;


import java.util.List;

import com.tis.campaign.model.PagingVO;
import com.tis.campaign.model.CampaignVO;

public interface CampaignService {
	
	int getTotalCount();
	
	List<CampaignVO> getAllCampaignList(int start,int end);
	List<CampaignVO> getAllCampaignList(PagingVO paging);
	
}
