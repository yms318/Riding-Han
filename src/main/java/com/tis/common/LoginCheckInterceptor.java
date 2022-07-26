package com.tis.common;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.tis.ridinghan.UserController;
import com.tis.user.model.MemberVO;

import lombok.extern.log4j.Log4j;

/*Interceptor
 * - 컨트롤러가 실행되기 전에 사전 처리할 일이 있으면 스프링에서는 인터셉터에서 구현한다.
 * - 구현방법
 * 1. 인터셉터 구현
 * 	[1] HandlerInterceptor인터페이스를 상속받는 방법
 *  [2] HandlerInterceptorAdapter 추상클래스를 상속받는 방법
 * 2. 인터셉터 등록 => shop-context.xml에서 등록하고 매핑 정보 설정
 * 
 *     <!-- Interceptor 설정 ================================ -->
    <interceptors>
    	<interceptor>
    		<mapping path="/user/**"/>
    		<mapping path="/admin/**"/>
    		<beans:bean class="com.tis.common.interceptor.LoginCheckInterceptor"></beans:bean>
    	</interceptor>
    </interceptors>
    <!-- ================================================ -->
 * */

@Log4j
public class LoginCheckInterceptor implements HandlerInterceptor {
	
	private final Logger log = LoggerFactory.getLogger(UserController.class.getName());
	
	//컨트롤러를 실행하기 전에 호출되는 메소드
	@Override
	public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object handler)
			throws Exception {
		log.info("preHandle()");
		HttpSession ses=req.getSession();
		MemberVO user=(MemberVO)ses.getAttribute("user");
		if(user!=null) return true; //false를 반환하면 Controller까지 못감
		
		req.setAttribute("msg", "로그인 해야 이용 가능합니다.");
		req.setAttribute("loc", req.getContextPath()+"/login");
		
		String viewName="/WEB-INF/views/message.jsp";
		RequestDispatcher disp=req.getRequestDispatcher(viewName);
		disp.forward(req,res);
		return false;//false반환
		//false를 반환하면 Controller까지 못간다
	}
	//컨트롤러를 실행한 후, 아직 뷰를 실행하기전에 호출되는 메소드
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		log.info("postHandle()");
		HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
	}
	
	//컨트롤러를 실행하고 뷰를 실해낳 후에 호출되는 메소드
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		log.info("afterCompletion() 호출");
		HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
	}

}
