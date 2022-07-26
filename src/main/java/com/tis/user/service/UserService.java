package com.tis.user.service;

import com.tis.user.model.MemberVO;
import com.tis.user.model.NotUserException;

public interface UserService{
		
	MemberVO memberChkByEmail(String email);
	MemberVO memberChkByNick(String nick);
	MemberVO isLoginOk(String email, String pwd) throws NotUserException;
	
	int createMember(MemberVO vo);
	int editMember(MemberVO vo);
	int quitMember(int user_no);
		
}
	
