import express from "express";
import { spawn } from "child_process";

const app = express();

app.get("/", (req, res) => {
  let results;
  const childPython = spawn("py", ["./api/functions/fightPrediction.py"]);
  childPython.stdout.on("data", (data) => {
    results = data.toString();
  });

  childPython.on("close", (code) => {
    console.log(`Process closed with code: ${code}`);
    res.send(results);
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
