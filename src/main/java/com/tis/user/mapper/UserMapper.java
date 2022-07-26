package com.tis.user.mapper;

import com.tis.user.model.MemberVO;

public interface UserMapper {
	MemberVO memberChkByEmail(String email);
	MemberVO memberChkByNick(String nick);
	
	int createMember(MemberVO vo);
	int editMember(MemberVO vo);
	int quitMember(int user_no);
}
