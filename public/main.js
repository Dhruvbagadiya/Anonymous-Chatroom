
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const showRegisterForm = document.getElementById('show-register-form');
  const showLoginForm = document.getElementById('show-login-form');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatroomName = document.getElementById('chatroom-name');
  const loginFormSubmit = document.getElementById('login-form-data');
  const registerFormSubmit = document.getElementById('register-form-data');
  const createChatroomFormSubmit = document.getElementById('create-chatroom-form-data');
  const joinChatroomFormSubmit = document.getElementById('join-chatroom-form-data');

  const socket = io();

  socket.emit('joinChatroom', chatroomName);


  if (showRegisterForm && showLoginForm) {
    showRegisterForm.addEventListener('click', (event) => {
      event.preventDefault();
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
    });

    showLoginForm.addEventListener('click', (event) => {
      event.preventDefault();
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
    });
  }


 

  if (loginFormSubmit) {
    loginFormSubmit.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(loginFormSubmit);
      const username = formData.get('username');
      const password = formData.get('password');

      try {
        // Make a POST request to handle login
        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        // Handle the response as per your application's logic
        if (response.ok) {
          // Redirect to chatroom on successful login
          window.location.replace('/chatroom');
          // console.log('Redirecting to chatroom...')
        } else {
          const data = await response.json();
          alert(data.error);
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again later.');
      }
    });
  }

  if (registerFormSubmit) {
    registerFormSubmit.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(registerFormSubmit);
      const email = formData.get('email');
      const username = formData.get('username');
      const mobile = formData.get('mobile');
      const password = formData.get('password');
      const userType = formData.get('user-type');
      const isAdmin = userType === 'admin';

      try {

        const response = await fetch('/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, mobile, username, password, isAdmin }),
        });

        if (response.ok) {
          const data = await response.json();
          alert(data.message);
          window.location.replace('/');
        } else {
          const data = await response.json();
          alert(data.error);
        }
      } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred during registration. Please try again later.');
      }
    });
  }

  
  

  if (createChatroomFormSubmit) {
    createChatroomFormSubmit.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(createChatroomFormSubmit);
      const chatroomName = formData.get('chatroomName');
      const members = formData.get('members');
      const username = formData.get('username');
    
      try {
        
        const response = await fetch('/chat/chatroom', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ chatroomName, members, username }),
        });
    
        if (response.ok) {
          const data = await response.json();
          alert(data.message);
          window.location.replace(`/group/${chatroomName}`);
        } else {
          const data = await response.json();
          alert(data.error);
        }
      } catch (error) {
        console.error('Error creating chatroom:', error);
        alert('An error occurred while creating the chatroom. Please try again later.');
      }
    });
  }

  
  if (joinChatroomFormSubmit) {
    joinChatroomFormSubmit.addEventListener('submit', joinChatroom);
  }

async function joinChatroom(event) {
  event.preventDefault();
  const chatroomNameInput = document.getElementById('chatroom-name');
  const chatroomName = chatroomNameInput.value;
  const username = document.getElementById('username');

  try {

    const response = await fetch('/chat/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatroomName ,username}),
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message);
      
      window.location.replace(`/group/${chatroomName}`);
    } else {
      const data = await response.json();
      alert(data.error);
    }
  } catch (error) {
    console.error('Error joining chatroom:', error);
    alert('An error occurred while joining the chatroom. Please try again later.');
  }
}

if (chatForm) {
  chatForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = chatInput.value;

    try {
      const response = await fetch('/test-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      console.log('Server response:', data.message);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    chatInput.value = '';
  });
}


// socket.on('joinChatroom', (chatroomName) => {
//   socket.join(chatroomName);
//   chatroomHeader.textContent = `Chatroom: ${chatroomName}`; 
// });


socket.on('message', (data) => {
  if (data.hasOwnProperty('message') && data.hasOwnProperty('isSent')) {
    displayMessage(data.message, !data.isSent);
  }
});

});


