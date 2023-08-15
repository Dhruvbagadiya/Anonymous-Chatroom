// // admin.js

// // Display user information
// const userInfoContainer = document.getElementById('user-info-container');
// const userInfo = document.getElementById('user-info');
// const closeUserInfo = document.getElementById('close-user-info');

// // Block/Unblock User
// const blockUserContainer = document.getElementById('block-user-container');
// const blockUserControls = document.getElementById('block-user');
// const closeBlockUser = document.getElementById('close-block-user');

// // Function to display user information
// async function displayUserInfo(username) {
//   // Fetch user data from the server
//   const response = await fetch(`/chat/user/${username}`);
//   const userData = await response.json();

//   // Populate user information in the UI
//   userInfo.innerHTML = `
//     <p><strong>Username:</strong> ${userData.username}</p>
//     <p><strong>Email:</strong> ${userData.email}</p>
//     <p><strong>Mobile:</strong> ${userData.mobile}</p>
//     <!-- Add more user details as needed -->
//   `;

//   // Display the user info container
//   userInfoContainer.style.display = 'block';
// }

// // Function to block/unblock a user
// async function toggleUserBlock(username, isBlocked) {
//   // Send a request to block/unblock the user
//   const response = await fetch(`/chat/block/${username}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ isBlocked }),
//   });

//   // Display a success message or handle the response as needed
//   const data = await response.json();
//   alert(data.message);
// }

// // Close user info container
// closeUserInfo.addEventListener('click', () => {
//   userInfoContainer.style.display = 'none';
// });

// // Close block user container
// closeBlockUser.addEventListener('click', () => {
//   blockUserContainer.style.display = 'none';
// });

// // Attach event listeners to UI elements to trigger actions
// // For example, when clicking on a username, display user info
// document.addEventListener('click', (event) => {
//   if (event.target.classList.contains('username')) {
//     const username = event.target.textContent;
//     displayUserInfo(username);
//   }
// });

// // For example, when clicking on a "Block" or "Unblock" button, toggle user block status
// document.addEventListener('click', (event) => {
//   if (event.target.classList.contains('block-user')) {
//     const username = event.target.getAttribute('data-username');
//     const isBlocked = event.target.getAttribute('data-isBlocked') === 'true';
//     toggleUserBlock(username, !isBlocked);
//   }
// });
