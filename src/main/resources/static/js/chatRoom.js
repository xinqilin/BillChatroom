
document.querySelector('#welcomeForm').addEventListener('submit', connect, true)
document.querySelector('#dialogueForm').addEventListener('submit', sendMessage, true)
document.querySelector('#kickout').addEventListener('submit', connectFail, true)
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

function connectFail(event) {
	name = '善平';

	if (name) {
//		document.querySelector('#welcome-page').classList.add('hidden');
//		document.querySelector('#dialogue-page').classList.remove('hidden');
		var socket = new SockJS('/websocketApp');
		stompClient = Stomp.over(socket);
		stompClient.connect({}, connectionFail);
	}
	event.preventDefault();
}

function buttonClick(user){
	name=user;
	
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

function connectionFail() {
	stompClient.subscribe('/topic/Bill', onMessageReceived);
	stompClient.send("/app/chatroom.Leave", {}, JSON.stringify({
		sender : name,
		type : 'Leave'
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
//		var element = document.createElement('i');
//		var text = document.createTextNode(message.sender[0]);
//		element.appendChild(text);
//		messageElement.appendChild(element);
		
		var i = document.createElement('i');
		var div=document.createElement('div');
		var img = document.createElement('img');
		var text = document.createTextNode(message.sender[0]);
		console.log(message.sender);
		
		var usernameElement = document.createElement('span');
		var usernameText = document.createTextNode(message.sender);
		
		if(message.sender=='Bill'){
			img.setAttribute("src","/pic/bill.jpg");
			messageElement.setAttribute("margin-left","100px");
			messageElement.appendChild(img);
		}else if(message.sender=='Paul'){
			img.setAttribute("src","/pic/paul.jpg");
			messageElement.appendChild(img);
		}else if(message.sender=='Lagagain'){
			img.setAttribute("src","/pic/lagain.jpg");
			messageElement.appendChild(img);
		}else if(message.sender=='善平'){
			img.setAttribute("src","/pic/david.jpg");
			messageElement.appendChild(img);
		}else if(message.sender=='Grant'){
			img.setAttribute("src","/pic/grant.jpg");
			messageElement.appendChild(img);
		}else{
			i.appendChild(text);
			messageElement.appendChild(i);
		}

		

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
//	var userName = document.createElement('i');
//	userName.setAttribute("value",message.sender);
//	document.querySelector('#userName').removeChild();
//	document.querySelector('#userName').appendChild(userName);
	
}
