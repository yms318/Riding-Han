package com.tis.websocket;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.tis.chat.model.ChatVO;
import com.tis.chat.service.ChatService;
import com.tis.ridinghan.ChatController;
import com.tis.ridinghan.UserController;
import com.tis.user.model.MemberVO;

import lombok.extern.log4j.Log4j;

@Log4j
public class WebSocketHandler extends TextWebSocketHandler {
	
	private final Logger log = LoggerFactory.getLogger(UserController.class.getName());
	
	@Autowired
	ChatService  chatservice;
	ChatController chatcontroller;
	
	//메시지를 날리기 위한 웹소켓전용 세션
	private List<WebSocketSession> sesList=new ArrayList<>();
	//실제 세션의 아이디정보, 웹소켓정보
	private Map<WebSocketSession,String> mapList=new HashMap<>();
	//실제 세션의 아이디정보, 방정보
	private Map<WebSocketSession,Object> roomList=new HashMap<>();
	
	private Map<String,String> map=new HashMap<>();
	
	//연결되었을 때
	@Override
	public void afterConnectionEstablished(WebSocketSession ses) throws Exception{
		log.info("채팅방 연결 성공, sesList : "+ses); 
		//채팅방 입장시 창 켜지면서
		//(sesList : StandardWebSocketSession[id=1, uri=ws://localhost:9090/RidingHan/echo])
		
		Map<String, Object> map=ses.getAttributes();
		MemberVO mvo=(MemberVO)map.get("user");
		
		log.info("mvo : "+mvo);
		String user_no=String.valueOf(mvo.getUser_no());
		mapList.put(ses, user_no);
		sesList.add(ses);
		log.info("user_no 넣고 나서 mapList : "+mapList);
		log.info("user_no 넣고 나서 sesList: "+sesList);
		
	}

	@Override
	protected void handleTextMessage(WebSocketSession ses, TextMessage msg) throws Exception{
		//log.info(ses.getId()+"방으로 "+msg.getPayload()+"입장하였음");
		String str=msg.getPayload();
		String tokens[]=str.split("@!\\|");

		String room_code;
		String nickName;
		int user_no;
		String user_img;
		
		//log.info("room_code : "+room_code);
		if(tokens!=null) {
			switch(tokens[0]) {
			case "100":
				room_code=tokens[1];
				user_no=Integer.parseInt(tokens[2]);
				nickName=tokens[3];
				
				ChatVO roomInfo=chatservice.chatRoomInfo(room_code);
				roomInfo.setChat_user_no(user_no);
				roomList.put(ses, roomInfo);
				log.info("roomList : "+roomInfo);
				
				//채팅방 입장했딴 말 보내기...흑흑
				for(WebSocketSession webSocketSession:sesList) {						
					if(room_code.equals(((ChatVO)roomList.get(webSocketSession)).getRoom_code())){
						if(!ses.getId().equals(webSocketSession.getId())) {
						if(webSocketSession.isOpen()) {
							webSocketSession.sendMessage(new TextMessage("100@!|"+nickName));
							}
						}
					}
				}//for--------------------------
				
				break;
			case "200":	
				String text=tokens[1];
				room_code=tokens[2];
				nickName=tokens[3];
				user_img=tokens[4];
				
				ChatVO chat=(ChatVO)roomList.get(ses);
				chat.setChat_text(text);
				
				log.info("room_code : "+chat.getRoom_code());
				if(!text.equals("")&&!(text.trim().isEmpty())) {		
					for(WebSocketSession webSocketSession:sesList) {						
						if(room_code.equals(((ChatVO)roomList.get(webSocketSession)).getRoom_code())){
							if(!ses.getId().equals(webSocketSession.getId())) {
							if(webSocketSession.isOpen()) {
								webSocketSession.sendMessage(new TextMessage("200@!|"+nickName+"@!|"+text+"@!|"+user_img));
								}
							}
						}
					}//for--------------------------
					int n=chatservice.addChatText(chat);
					if(n>0) {
						log.info("메시지 저장 성공이욤 : "+text);
					}else {
						log.info("메시지 전송 실패");
					}
				}//if--------------------------
				break;
			case "300":
				room_code=tokens[1];
				nickName=tokens[2];
				
				for(WebSocketSession webSocketSession:sesList) {						
					if(room_code.equals(((ChatVO)roomList.get(webSocketSession)).getRoom_code())){
						if(!ses.getId().equals(webSocketSession.getId())) {
						if(webSocketSession.isOpen()) {
							webSocketSession.sendMessage(new TextMessage("300@!|"+nickName));
							}
						}
					}
				}//for--------------------------
				
			}//switch------------------------			
		}//if------------------------------
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession ses, CloseStatus status) throws Exception{
		log.info("연결 끝~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		sesList.remove(ses);
		
	}
	
	
}
