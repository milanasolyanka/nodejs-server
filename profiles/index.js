const express = require("express");
const net = require("net");
const app = express();
const port = 3001;

// LOGSTASH STUFF
const logstashHost = process.env.LOGSTASH_HOST || "logstash";
const logstashPort = process.env.LOGSTASH_PORT || 5000;

const client = net.connect({ host: logstashHost, port: logstashPort });

function log(message) {
  const logEntry = {
    service: "profiles",
    message,
    timestamp: new Date().toISOString(),
  };
  client.write(JSON.stringify(logEntry) + "\n");
  console.log(message);
}

// ENDPOINTS START HERE
app.get("/", (req, res) => {
  log("Received a get request");
  res.send("Howdy, I am a server ;)");
});

app.get("/:id", (req, res) => {
  const profileId = req.params.id;
  log(`Received a get request for profile ID: ${profileId}`);
  res.send(`Howdy! You asked bout a person w profile id: ${profileId}`);
});

app.post("/:id", (req, res) => {
  const profileId = req.params.id;
  log(`Received a post request for profile ID: ${profileId}`);
  res.send(
    `Howdy, I jus received your POST request on a profile w id: ${profileId} ;)`
  );
});

app.listen(port, () => {
  log(`Server started on http://localhost:${port}`);
});
