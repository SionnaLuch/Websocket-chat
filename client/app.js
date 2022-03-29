const socket = io();
socket.on('message', ({ author, content }) => addMessage(author, content))
const data = {
    loginForm: document.getElementById('welcome-form'),
    messagesSection: document.getElementById('messages-section'),
    messagesList: document.getElementById('messages-list'),
    addMessageForm: document.getElementById('add-messages-form'),
    userNameInput: document.getElementById('username'),
    messageContentInput: document.getElementById('message-content'),
  };
  
  let userName;
  data.loginForm.addEventListener('submit', event => login(event));
  data.addMessageForm.addEventListener('submit', event => sendMessage(event));
  
  function login(event) {
    event.preventDefault();
  
    if (data.userNameInput.value) {
      userName = data.userNameInput.value;
      data.loginForm.classList.remove('show');
      data.messagesSection.classList.add('show');
      socket.emit('join', userName);
    } else {
      alert('What is your name?');
    }
  }
  
  function sendMessage(e) {
    e.preventDefault();
  
    let messageContent = data.messageContentInput.value;
  
    if(!messageContent.length) {
      alert('You have to type something!');
    }
    else {
      addMessage(userName, messageContent);
      socket.emit('message', { author: userName, content: messageContent })
      data.messageContentInput.value = '';
    }
  
  }
  
  function addMessage(author, content) {
  
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if (author === userName) message.classList.add('message--self');
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author}</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    data.messagesList.appendChild(message);
  }