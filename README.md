# BillChatroom

### setting
docker run -d -p 5672:5672 -p 15672:15672 -p 61613:61613 --name "chatroom" <br>
docker exec -it imageName bash<br>
rabbitmq-plugins enable rabbitmq-web-stomp<br>
