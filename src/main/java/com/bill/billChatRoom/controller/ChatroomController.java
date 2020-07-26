package com.bill.billChatRoom.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bill.billChatRoom.bean.ChatMessage;

@Controller
public class ChatroomController{
	
//	@RequestMapping("/")
//    public void hello(){
//		
//	}
	
	@MessageMapping("/chatroom.sendMessage")
	@SendTo("/topic/Bill")
	public ChatMessage sendMessage(@Payload ChatMessage webSocketChatMessage) {
		return webSocketChatMessage;
	}
	@MessageMapping("/chatroom.newUser")
	@SendTo("/topic/Bill")
	public ChatMessage newUser(@Payload ChatMessage webSocketChatMessage,
			SimpMessageHeaderAccessor headerAccessor) {
		headerAccessor.getSessionAttributes().put("username", webSocketChatMessage.getSender());
		return webSocketChatMessage;
	}
}
