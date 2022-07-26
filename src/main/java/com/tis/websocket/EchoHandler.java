package com.tis.websocket;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.tis.ridinghan.UserController;

import lombok.extern.log4j.Log4j;

@Log4j
public class EchoHandler extends TextWebSocketHandler {
	
	private final Logger log = LoggerFactory.getLogger(UserController.class.getName());
	
	private List<WebSocketSession> sesList=new ArrayList<WebSocketSession>();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession ses) throws Exception{
		sesList.add(ses);
		log.info("["+ses.getId()+"]연결됨");
		
		System.out.println("채팅방 입장 : "+ses.getPrincipal().getName());;
		
	}
	@Override
	protected void handleTextMessage(WebSocketSession ses, TextMessage msg) throws Exception{
		log.info(ses.getId()+"로부터 "+msg.getPayload()+"받음");
		
		for(WebSocketSession sess:sesList) {
			sess.sendMessage(new TextMessage
			(sess.getPrincipal().getName()+"|"+msg.getPayload()));
		}
	}
	@Override
	public void afterConnectionClosed(WebSocketSession ses, CloseStatus status) throws Exception{
		sesList.remove(ses);
		log.info(ses.getId()+"와 연결 끊김");
		System.out.println("채팅방 퇴장자 : "+ses.getPrincipal().getName());
	}
}
