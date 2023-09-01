import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const fighters = JSON.parse(fs.readFileSync(`./data/fighterData.json`));

const checkID = (req, res, next, val) => {
  console.log(`fighter ID is: ${val}, it is of type ${typeof val}`);
  const results = fighters.find((el) => el.id === val); // REMEMBER TO CHANGE TO el._id
  if (!results) {
    return res.status(404).json({ status: "fail", message: "Invalid ID" });
  }
  next();
};

const getAllFighters = (req, res) => {
  console.log(fighters);
  res.status(200).json({
    status: "success",
    results: fighters.length,
    data: {
      fighters,
    },
  });
};

const getFighter = (req, res) => {
  const id = req.params.id;
  // REMEMBER TO CHANGE TO el._id
  const fighter = fighters.find((el) => el.id === id);

  res.status(200).json({
    data: {
      fighter,
    },
  });
};

const addFighter = (req, res) => {
  const newId = uuidv4();
  const newFighter = Object.assign(
    {
      _id: newId,
      // REMEMBER TO REMOVE THE id ELEMENT BEFORE PROD
      id: (Number(fighters[fighters.length - 1].id) + 1).toString(),
    },
    req.body
  );

  fighters.push(newFighter);

  fs.writeFile(`./data/fighterData.json`, JSON.stringify(fighters), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        fighter: newFighter,
      },
    });
  });
};

export { getAllFighters, addFighter, getFighter, checkID };
