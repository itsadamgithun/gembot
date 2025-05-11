document.getElementById('sendMessage').addEventListener('click', function() {
    const message = document.getElementById('userMessage').value;
    const language = document.getElementById('language-selector').value;
    const messagesContainer = document.getElementById('messages');

    // Üzenet ellenőrzés
    if (message.trim() === '') return;

    // Felhasználó üzenetének hozzáadása
    addMessage('user', message);

    // Chatbot válasz (szerver nélküli egyszerű válasz szimuláció)
    setTimeout(() => {
        addMessage('bot', `Válasz a következő nyelven: ${language}`);
    }, 1000); // Késleltetés szimulálása

    // Töröljük az üzenet mezőt
    document.getElementById('userMessage').value = '';
});

function addMessage(role, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(role === 'user' ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    document.getElementById('messages').appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Görgetés az utolsó üzenetre
}
