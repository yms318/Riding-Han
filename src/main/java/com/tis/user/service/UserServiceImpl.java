package com.tis.user.service;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.tis.ridinghan.UserController;
import com.tis.user.mapper.UserMapper;
import com.tis.user.model.MemberVO;
import com.tis.user.model.NotUserException;

import lombok.extern.log4j.Log4j;

@Service(value="userServiceImpl")
@Log4j
public class UserServiceImpl implements UserService {
	
	private final Logger log = LoggerFactory.getLogger(UserController.class.getName());

	@Inject
	private UserMapper userMapper;
	
	@Override
	public MemberVO memberChkByEmail(String user_id) {
		return this.userMapper.memberChkByEmail(user_id);
	}

	@Override
	public MemberVO memberChkByNick(String nick) {
		return this.userMapper.memberChkByNick(nick);
	}

	@Override
	public MemberVO isLoginOk(String user_id, String pwd) throws NotUserException {
		log.info("user_id=="+user_id);
		MemberVO mv=this.memberChkByEmail(user_id);
		if(mv==null||mv.getState()==-1) throw new NotUserException("탈퇴한 회원이거나 등록된 회원이 아닙니다");
		if(!mv.getPwd().contentEquals(pwd))
			throw new NotUserException("비밀번호를 잘못 입력하셨습니다");
		return mv;
		}

	@Override
	public int createMember(MemberVO vo) {
		return this.userMapper.createMember(vo);
	}

	@Override
	public int editMember(MemberVO vo) {		
		return this.userMapper.editMember(vo);
	}
	
	@Override
	public int quitMember(int user_no) {
		return this.userMapper.quitMember(user_no);
	}

}
