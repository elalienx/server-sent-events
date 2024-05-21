import express from "express";

// Properties
const app = express();
const port = 8080;

app.listen(port, () => console.log(`Backend V1 on port ${port}`));

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.get("/", async (request, response) => {
  console.log("📡 Connected");

  // Properties
  let limit = 0; // Initialize limit for each new connection

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
    console.error("❌ Error:", error);
  } finally {
    console.log("🏁 Completed transfer");
    response.end();
  }
});
