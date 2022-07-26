package com.tis.plan.service;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.tis.chat.model.Chat_MemberVO;
import com.tis.plan.mapper.PlanMapper;
import com.tis.plan.model.PagingVO;
import com.tis.plan.model.PlanVO;
import com.tis.plan.model.Plan_InfoVO;

@Service(value="planServiceImpl") 
public class PlanServiceImpl implements PlanService {
	
	@Inject
	private PlanMapper planMapper;
	
	public PlanVO planMyInfo(int user_no) {
		return planMapper.planMyInfo(user_no);
	}
	@Override
	public int createPlanInfo(PlanVO pv) {
		return planMapper.createPlanInfo(pv);
	}
	@Override
	public int getTotalCount(PagingVO paging) {
		return planMapper.getTotalCount(paging);
	}
	@Override
	public List<PlanVO> showPlanList(PagingVO paging) {
		return planMapper.showPlanList(paging);
	}
	@Override
	public List<PlanVO> getSearchList(PagingVO paging) {
		return planMapper.getSearchList(paging);
	}
	@Override
	public PlanVO showOnePlan(String plan_code) {
		return planMapper.showOnePlan(plan_code);
	}
	@Override
	public List<PlanVO> showPlan(String plan_code) {
		return planMapper.showPlan(plan_code);
	}
	@Override
	public Plan_InfoVO showPlanInfo(String plan_code) {
		return planMapper.showPlanInfo(plan_code);
	}
	@Override
	public List<Plan_InfoVO> planMemberList(String plan_code){
	      return this.planMapper.planMemberList(plan_code);
	}
	@Override
	public int joinPlan (Map<String, Object> map) {
		return planMapper.joinPlan(map);
	}
	@Override
	public int createPlan(PlanVO pv) {
		return planMapper.createPlan(pv);
	}
}
