// Properties
const port = 8080;
let eventSource;

function connectToServer() {
  eventSource = new EventSource(`http://localhost:${port}`);

  eventSource.onmessage = function (event) {
    updateMessage(event.data);
  };

  eventSource.onerror = function () {
    updateMessage("Server closed connection ❌");
    eventSource.close();
  };
}

function updateMessage(message) {
  const list = document.getElementById("messages");
  const item = document.createElement("p");

  item.textContent = message;
  list.appendChild(item);
}

// Start the connection
connectToServer();
