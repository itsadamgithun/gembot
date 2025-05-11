document.getElementById('sendMessage').addEventListener('click', async function() {
  const message = document.getElementById('userMessage').value;
  const language = document.getElementById('language-selector').value; // Nyelv beállítása
  const messagesContainer = document.getElementById('messages');

  if (message.trim() === '') {
    return;
  }

  // Felhasználó üzenete
  addMessage('user', message);

  // Üzenet küldése a backendnek
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, language }), // Nyelv is bekerül a kérésbe
    });

    const data = await response.json();

    if (data.reply) {
      addMessage('bot', data.reply);
    } else {
      addMessage('bot', 'Hiba történt.');
    }
  } catch (error) {
    console.error('Hiba történt a kérés során:', error);
    addMessage('bot', 'Nem sikerült üzenetet küldeni.');
  }

  document.getElementById('userMessage').value = ''; // Üzenet mező törlése
});

function addMessage(role, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(role === 'user' ? 'user-message' : 'bot-message');
  messageElement.textContent = message;
  document.getElementById('messages').appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // Görgetés az utolsó üzenetre
}
