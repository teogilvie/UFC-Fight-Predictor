import { v4 as uuidv4 } from "uuid";
import { spawn } from "child_process";

const testData = JSON.stringify({
  fighter1: { id: 1, name: "tyson" },
  fighter2: { id: 2, name: "levi" },
});

const testFunction = () => console.log("test successful");

const randomNumber = () =>
  console.log(Math.floor(Math.random() * Date.now()).toString(10));

const UUIDnumber = () => console.log(uuidv4());

const testFilter = () => console.log(testData.filter((el) => el.id === 3));

/*
const testPython = async () => {
  const childPython = await spawn("py", [
    "./api/functions/fightPrediction.py",
    testData,
  ]);

  const result = childPython.stdout?.toString()?.trim();
  const error = childPython.stderr?.toString()?.trim();

  if (result) console.log(result);
  if (error) console.error(error);
};
*/

const testPython = () => {
  let results;
  const childPython = spawn("py", ["./api/functions/fightPrediction.py"]);
  childPython.stdout.on("data", (data) => {
    results = data.toString();
  });

  childPython.on("close", (code) => {
    console.log(`Process closed with code: ${code}`);
    console.log(results);
  });
};

export { testFunction, randomNumber, UUIDnumber, testFilter, testPython };
