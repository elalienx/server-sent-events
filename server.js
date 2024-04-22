import express from "express";

// Properties
const app = express();
const port = 8080;

app.listen(port, () => console.log(`Server V2 on port ${port}`));

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.get("/", async (request, response) => {
  let limit = 0; // Initialize limit for each new connection
  console.log("Client connected ✅");
  response.setHeader("Content-Type", "text/event-stream");
  response.setHeader("Cache-Control", "no-cache");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Connection", "keep-alive");

  try {
    while (limit < 5) {
      const date = new Date().toLocaleString();
      response.write(`data: ${date}\n\n`);
      await sleep(1000);
      limit++;
    }
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    console.log("Client closed connection ❌");
    response.end();
  }
});
