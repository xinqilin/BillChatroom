
document.querySelector('#welcomeForm').addEventListener('submit', connect, true)
document.querySelector('#dialogueForm').addEventListener('submit', sendMessage, true)
var stompClient = null;
var name = null;
function connect(event) {
	name = document.querySelector('#name').value.trim();
	if (name) {
		document.querySelector('#welcome-page').classList.add('hidden');
		document.querySelector('#dialogue-page').classList.remove('hidden');
		var socket = new SockJS('/websocketApp');
		stompClient = Stomp.over(socket);
		stompClient.connect({}, connectionSuccess);
	}
	event.preventDefault();
}
function connectionSuccess() {
	stompClient.subscribe('/topic/Bill', onMessageReceived);
	stompClient.send("/app/chatroom.newUser", {}, JSON.stringify({
		sender : name,
		type : 'newUser'
	}))
}
function sendMessage(event) {
	var messageContent = document.querySelector('#chatMessage').value.trim();
	if (messageContent && stompClient) {
		var chatMessage = {
			sender : name,
			content : document.querySelector('#chatMessage').value,
			type : 'CHAT'
		};
		stompClient.send("/app/chatroom.sendMessage", {}, JSON
				.stringify(chatMessage));
		document.querySelector('#chatMessage').value = '';
	}
	event.preventDefault();
}
function onMessageReceived(payload) {
	var message = JSON.parse(payload.body);
	var messageElement = document.createElement('li');
	if (message.type === 'newUser') {
		messageElement.classList.add('event-data');
		message.content = message.sender + ' 參加了Bill聊天室';
	} else if (message.type === 'Leave') {
		messageElement.classList.add('event-data');
		message.content = message.sender + ' 滾出了Bill聊天室';
	} else {
		messageElement.classList.add('message-data');
		var element = document.createElement('i');
		var text = document.createTextNode(message.sender[0]);
		element.appendChild(text);
		messageElement.appendChild(element);
		
//		messageElement.classList.add('message-data');
//		var div=document.createElement('div');
////		var element = document.createElement('img');
//		var text = document.createTextNode(message.sender[0]);
//		console.log(text);
//		if(text==="B")
//			messageElement.append("<img src='/pic/bill.jpg'></img>");
//		else if(text==="P")
//			messageElement.append("<img src='/pic/paul.jpg'></img>");
//		else if(text==="L")
//			messageElement.append("<img src='/pic/lagain.jpg'></img>");
//		else
//			messageElement.append("<i>"+text+"</i>");
		
		var usernameElement = document.createElement('span');
		var usernameText = document.createTextNode(message.sender);
		usernameElement.appendChild(usernameText);
		messageElement.appendChild(usernameElement);
	}
	var textElement = document.createElement('p');
	var messageText = document.createTextNode(message.content);
	textElement.appendChild(messageText);
	messageElement.appendChild(textElement);
	document.querySelector('#messageList').appendChild(messageElement);
	document.querySelector('#messageList').scrollTop = document
			.querySelector('#messageList').scrollHeight;
}