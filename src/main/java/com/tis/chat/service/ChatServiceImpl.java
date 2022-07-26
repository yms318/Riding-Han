package com.tis.chat.service;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.tis.chat.mapper.ChatMapper;
import com.tis.chat.model.ChatVO;
import com.tis.chat.model.Chat_MemberVO;
import com.tis.chat.model.PagingVO;
import com.tis.user.model.MemberVO;

import lombok.extern.log4j.Log4j;

@Log4j
@Service(value="chatServiceImpl")
public class ChatServiceImpl implements ChatService {
   
   @Inject
   private ChatMapper chatMapper;
   
   @Override
   public List<ChatVO> showChatList(PagingVO paging) {
      return this.chatMapper.showChatList(paging);
   }
   
   @Override
   public int getTotalCount(PagingVO paging) {
      return this.chatMapper.getTotalCount(paging);
   }
   
   @Override
   public List<ChatVO> getSearchList(PagingVO paging) {
      return this.chatMapper.getSearchList(paging);
   }
   
   @Override
   public int createChat(ChatVO cvo, MemberVO mvo) {
      int n=this.chatMapper.createChat(cvo);
      if(n>0) {
         n=createChatMember(mvo);
         return n;//채팅방 정보 생성 실패
      }else {
         return n;
      }
   }
   @Override
   public int createChatMember(MemberVO vo) {
      return this.chatMapper.createChatMember(vo);
   }
   @Override
   public int addChatMember(Map<String, Object> map) {
      return this.chatMapper.addChatMember(map);
   }
   @Override
   public ChatVO chatRoomInfo(String room_code) {
      return this.chatMapper.chatRoomInfo(room_code);
   }
   @Override
   public Chat_MemberVO chatMyInfo(Map<String, Object> map) {
      return this.chatMapper.chatMyInfo(map);
   }
   @Override
   public List<ChatVO> showAllChat(Chat_MemberVO vo){
      return this.chatMapper.showAllChat(vo);
   }
   @Override
   public List<Chat_MemberVO> chatMemberList(String room_code){
      return this.chatMapper.chatMemberList(room_code);
   }
   @Override
   public int addChatText(ChatVO cvo) {
      return this.chatMapper.addChatText(cvo);
   }
   @Override
   public int quitChatMember(Map<String, Object> map) {
      return this.chatMapper.quitChatMember(map);
   }
   @Override
   public int deleteChatRoom(String room_code) {
      return this.chatMapper.deleteChatRoom(room_code);
   }

}