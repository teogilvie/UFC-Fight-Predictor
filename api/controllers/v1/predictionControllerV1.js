import fs from "fs";
import { spawn } from "child_process";

const fighters = JSON.parse(fs.readFileSync(`./data/fighterData.json`));

const getPrediction = (req, res) => {
  // Get fighters from fighter object using request id
  const fighter1ID = req.body.fighter1.id;
  const fighter2ID = req.body.fighter2.id;
  const selectedFighters = {
    fighter1: fighters.find((el) => el.id === fighter1ID),
    fighter2: fighters.find((el) => el.id === fighter2ID),
  };
  const strSelectedFighters = JSON.stringify(selectedFighters);

  console.log(fighters);

  // Calling python script and returning object with status and winner
  let result;
  const command = "predict";
  const childPython = spawn("py", [
    "./api/functions/fightPrediction.py",
    strSelectedFighters,
    command,
  ]);

  childPython.stdout.on("data", (data) => {
    result = data?.toString()?.trim();
  });

  childPython.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
  });

  childPython.on("close", (code) => {
    console.log(`Process closed with code: ${code}`);
    res.status(200).json({
      status: "success",
      result,
    });
  });
};

export { getPrediction };
