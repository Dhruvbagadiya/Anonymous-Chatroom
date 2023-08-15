document.addEventListener('DOMContentLoaded', () => {
    const addMembersForm = document.getElementById('add-members-form');
  
    addMembersForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(addMembersForm);
      const chatroomName = formData.get('chatroom-name');
      const usernames = formData.get('usernames');
  
      try {
        // Make a POST request to add members to the chatroom
        const response = await fetch(`/auth/addmembers/${chatroomName}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ usernames: usernames.split(',') })
        });
  
        if (response.ok) {
          const data = await response.json();
          alert(data.message);
        } else {
          const data = await response.json();
          alert(data.error);
        }
      } catch (error) {
        console.error('Error adding members:', error);
        alert('An error occurred while adding members. Please try again later.');
      }
    });
  });
  