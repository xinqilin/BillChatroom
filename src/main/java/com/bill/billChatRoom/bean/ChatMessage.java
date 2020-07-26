package com.bill.billChatRoom.bean;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ChatMessage {
	
	private String type;
	private String content;
	private String sender;
	
}
