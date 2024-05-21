// Properties
const port = 8080;
let eventSource;

function connectToServer() {
  eventSource = new EventSource(`http://localhost:${port}`);

  eventSource.onmessage = function (event) {
    updateMessage(event.data);
  };

  eventSource.onerror = function () {
    endMessage("Server finished connection 🏁");
    eventSource.close();
  };
}

function updateMessage(message) {
  const list = document.getElementById("messages");
  const item = document.createElement("li");

  item.textContent = message;
  list.appendChild(item);
}

// Pending...
function endMessage(message) {
  const status = document.getElementById("status");
  const item = document.createElement("p");

  item.textContent = message;
  status.append(item);
}

// Start the connection
connectToServer();
