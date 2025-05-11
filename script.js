const chatContainer = document.getElementById("chat-container");
const inputForm = document.getElementById("input-form");
const inputField = document.getElementById("input");
const langSelect = document.getElementById("language-select");

inputForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = inputField.value.trim();
  if (message === "") return;

  addMessage("user", message);
  inputField.value = "";
  inputField.disabled = true;

  addMessage("bot", "Gondolkodom...");

  try {
    // 🔐 API-kulcs NEM kerül be hardcode-olva, csak szerveren keresztül használjuk majd.
    const lang = langSelect.value;

    // Itt kellene a backend proxy végpont meghívása, pl:
    // const res = await fetch("/api/chat", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ message, lang }),
    // });

    // Temporális dummy válasz (helyettesítsd a fentivel, ha lesz szervered)
    await new Promise(resolve => setTimeout(resolve, 1000));
    const dummyResponse = `Ez egy példaválasz a(z) ${lang} nyelven.`;

    replaceLastBotMessage(dummyResponse);

  } catch (err) {
    replaceLastBotMessage("⚠️ Hiba történt a válasz lekérése közben.");
    console.error(err);
  } finally {
    inputField.disabled = false;
    inputField.focus();
  }
});

function addMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.textContent = text;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function replaceLastBotMessage(newText) {
  const botMessages = [...document.querySelectorAll(".message.bot")];
  const lastBot = botMessages[botMessages.length - 1];
  if (lastBot) lastBot.textContent = newText;
}
