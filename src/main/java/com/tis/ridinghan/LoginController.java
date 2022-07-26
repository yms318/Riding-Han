package com.tis.ridinghan;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.tis.common.CommonUtil;
import com.tis.user.model.MemberVO;
import com.tis.user.model.NotUserException;
import com.tis.user.service.UserService;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
public class LoginController {
	
	private final Logger log = LoggerFactory.getLogger(UserController.class.getName());

	@Autowired
	private CommonUtil util;

	@Inject
	private UserService userService;

	///////////////////////// 로그인
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String showLoginForm() {
		return "login";
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String loginCheck(@RequestParam(name = "userId", defaultValue = "") String user_id,
			@RequestParam(defaultValue = "") String pwd, Model model, HttpSession ses, HttpServletResponse res)
			throws NotUserException {
		// name="userid" => html의 input name을 기술
		log.info("user_id=" + user_id + ", pwd=" + pwd);

		MemberVO user = userService.isLoginOk(user_id, pwd);
		log.info("user=" + user);
		if (user != null) {
			ses.setAttribute("user", user);
			ses.setAttribute("userMode", user.getState());
		} // -------------------------

		return "redirect:index";

	}// ---------------------------

	@RequestMapping("/logout")
	public String logout(HttpSession ses) {
		ses.invalidate();
		return "redirect:index";
	}
}
