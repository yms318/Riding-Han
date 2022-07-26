package com.tis.chat.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

import com.tis.chat.model.ChatVO;
import com.tis.chat.model.Chat_MemberVO;
import com.tis.chat.model.PagingVO;
import com.tis.user.model.MemberVO;

public interface ChatService {
   List<ChatVO> showChatList (PagingVO paging);
   int getTotalCount(PagingVO paging);
   List<ChatVO> getSearchList(PagingVO paging);
   
   int createChat(ChatVO cvo, MemberVO mvo);
   int createChatMember(MemberVO vo);
   Chat_MemberVO chatMyInfo(Map<String, Object> map);
   int addChatMember(Map<String, Object> map);
   ChatVO chatRoomInfo(String room_code);
   List<ChatVO> showAllChat(Chat_MemberVO chatMyInfo);
   
   List<Chat_MemberVO> chatMemberList(String room_code);
   int addChatText(ChatVO cvo);
   int quitChatMember(Map<String, Object> map);
   int deleteChatRoom(String room_code);
   
}