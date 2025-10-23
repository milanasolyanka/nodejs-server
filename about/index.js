const express = require("express");
const net = require("net");
const app = express();
const port = 3002;

//  LOGSTASH STUFF
const logstashHost = process.env.LOGSTASH_HOST || "logstash";
const logstashPort = process.env.LOGSTASH_PORT || 5000;

const client = net.connect({ host: logstashHost, port: logstashPort });

function log(message) {
  const logEntry = {
    service: "about",
    message,
    timestamp: new Date().toISOString(),
  };
  client.write(JSON.stringify(logEntry) + "\n");
  console.log(message);
}

// ENDPOINTS
app.get("/", (req, res) => {
  log("Received a get request for /");
  res.send("Ahh, it will be a long story bout me ;)");
});

app.listen(port, () => {
  log(`Server started on http://localhost:${port}`);
});
