const input = document.getElementById('newMessage');
const btn = document.getElementById('newMessageBtn');
const list = document.getElementById('messagesList');

const socket = new WebSocket('ws://127.0.0.1:3000');

socket.onopen = () => {
	console.log('Socket connected');
}

btn.addEventListener('click', () => {
	if(input.value === '') return;
	const message = getMessage();
	sendMessage(message);
	input.value = '';
})

input.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		if(input.value === '') return;
		const message = getMessage();
		sendMessage(message);
		input.value = '';
	}
})



const getMessage = () => {
	const newMessage = {message: input.value}
	const newMessageJSON = JSON.stringify(newMessage);
	return newMessageJSON;
}


const sendMessage = (message) => {
	try {
		socket.send(message);
	}catch (e) {
		console.log(e);
	}
}

const getNewMessages = () => {
	socket.onmessage = (e) => {
		updateMessages(e.data);
	}
	socket.onclose = () => {
		console.log('Socket close');
	}
	socket.onerror = () => {
		console.log('Socket error');
	}
}



const updateMessages = (newMessage) => {
	let messageObj = JSON.parse(newMessage);
	let message = messageObj.message;

	let li = document.createElement('li');
	li.className = "chat__message";
	li.innerText = message.toString();
  	list.append(li);
}




let firstTime = true;
if (firstTime) {
	list.scrollTop = list.scrollHeight;
	firstTime = false;
} else if (list.scrollTop + list.clientHeight === list.scrollHeight) {
	list.scrollTop = list.scrollHeight;
}
getNewMessages();
