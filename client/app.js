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
      console.log(userName);
    } else {
      alert('What is your name?');
    }
  }
  
  function sendMessage(event) {
    event.preventDefault();
  
    let messageContent = data.messageContentInput.value;
    if (messageContent) {
      addMessage(userName, messageContent);
      data.messageContentInput.value = '';
    } else {
      alert('Write message...')
    }
  };
  
  function addMessage(author, content) {
  
    const message = document.createElement('list');
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