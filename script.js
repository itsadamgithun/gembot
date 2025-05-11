const messagesContainer = document.getElementById("messages");
const userInput = document.getElementById("userInput");

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = text;
  messagesContainer.appendChild(msg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  userInput.value = "";
  addMessage("Gondolkodom...", "bot");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    document.querySelector(".message.bot:last-child").remove();
    addMessage(data.reply || "Nem érkezett válasz.", "bot");
  } catch (err) {
    console.error(err);
    document.querySelector(".message.bot:last-child").remove();
    addMessage("Hiba történt a kapcsolat során.", "bot");
  }
}
