import express from "express";

// Properties
const app = express();
const port = 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));

app.get("/", (request, response) => {
  console.log("Client connected ✅");
  response.setHeader("Content-Type", "text/event-stream");
  response.setHeader("Cache-Control", "no-cache");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Connection", "keep-alive");

  const intervalId = setInterval(() => {
    const date = new Date().toLocaleString();

    response.write(`data: ${date}\n\n`);
  }, 1000);

  response.on("close", () => {
    console.log("Client closed connection ❌");
    clearInterval(intervalId);
    response.end();
  });

  response.on("error", (err) => {
    console.error("Response error:", err);
    clearInterval(intervalId);
    response.end();
  });
});
