const input = document.getElementById('newMessage');
const btn = document.getElementById('newMessageBtn');
const list = document.getElementById('messagesList');


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
		const xhr = new XMLHttpRequest();
		xhr.open("POST", "http://127.0.0.1:5000/send-messages", true);
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		xhr.send(message);
	}catch (e) {
		console.log(e);
	}
}

const getNewMessages = () => {
	const eventSource = new EventSource('http://127.0.0.1:5000/connect');
	eventSource.onmessage = (e) => {
		updateMessages(e.data);
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
