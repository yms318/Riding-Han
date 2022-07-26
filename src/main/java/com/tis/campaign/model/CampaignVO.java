package com.tis.campaign.model;

import java.io.Serializable;

import lombok.Data;

@Data
public class CampaignVO implements Serializable {
    
   private int campaign_no;
   private String campaign_image;
   private String campaign_url;
   private String campaign_start_date;
   private String campaign_finish_date;
   private java.sql.Date wdate;
   
   
}