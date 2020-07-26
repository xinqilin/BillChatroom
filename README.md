# BillChatroom

### setting
docker run -d -p 5672:5672 -p 15672:15672 -p 61613:61613 --name "chatroom"
docker exec -it imageName bash
rabbitmq-plugins enable rabbitmq-web-stomp
