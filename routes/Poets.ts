const Joi = require("joi");
import express, { Response, Request } from "express";
const poets = express.Router();

const poetsArray = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
];
const validatePoet = (poetName: string) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(poetName);
};
//Get all poets
poets.get("/", (req: Request, res: Response) => {
  res.send(poetsArray);
});
//Create a new Poet
poets.post("/", (req: Request, res: Response) => {
  const { error } = validatePoet(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const poet = {
    id: poetsArray.length + 1,
    name: req.body.name,
  };
  poetsArray.push(poet);
  res.send(poetsArray);
});
//Get poet by Id
poets.get("/:id", (req: Request, res: Response) => {
  const poet = poetsArray.find((poet) => poet.id === Number(req.params.id));
  if (!poet) return res.status(404).send("Invalid Poet ID");
  res.send(poet);
});
//Update poet
poets.put("/:id", (req, res) => {
  const poet = poetsArray.find((p) => p.id === Number(req.params.id));
  if (!poet)
    return res.status(404).send("The poet with the given ID was not found.");

  const { error } = validatePoet(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  poet.name = req.body.name;
  res.send(poet);
});
//Delete poet
poets.delete("/:id", (req, res) => {
  const poet = poetsArray.find((p) => p.id === Number(req.params.id));
  if (!poet)
    return res.status(404).send("The poet with the given ID was not found.");

  const index = poetsArray.indexOf(poet);
  poetsArray.splice(index, 1);

  res.send(poet);
});

export default poets;
