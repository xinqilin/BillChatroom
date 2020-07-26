package com.bill.billChatRoom;

import org.junit.jupiter.api.Test;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BillChatRoomApplicationTests {

	@Autowired
	RabbitTemplate rabbitTemplate;
	
	
//	@Test
//	void contextLoads() {
//		rabbitTemplate.send(exchange,routeKey,message);
//		rabbitTemplate.convertAndSend("amq.topic","key","你好哦!");
//		
//	}
	
	@Test
	public void sendMsg() {
		rabbitTemplate.convertAndSend("amq.topic","Bill","群發");
	}
	
	@Test
	public void receive() {
		Object msg=rabbitTemplate.receiveAndConvert("stomp-subscription-dh9OPvOzF419XMEgqYmsKA");
		System.out.println("msg:"+msg);
		
	}

}
