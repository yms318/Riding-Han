package com.tis.plan.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.tis.plan.model.PagingVO;
import com.tis.plan.model.PlanVO;
import com.tis.plan.model.Plan_InfoVO;

@Service
public interface PlanService {
	
	PlanVO planMyInfo(int user_no);
	int createPlanInfo(PlanVO pv);
	int getTotalCount(PagingVO paging);
	List<PlanVO> getSearchList(PagingVO paging);
	
	PlanVO showOnePlan(String plan_code);
	List<PlanVO> showPlan(String plan_code);
	Plan_InfoVO showPlanInfo(String plan_code);
	List<Plan_InfoVO> planMemberList(String plan_code);
	
	int joinPlan(Map<String, Object> map);
	List<PlanVO> showPlanList(PagingVO paging);
	int createPlan(PlanVO pv);
}
