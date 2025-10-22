import express from "express";
import { AppDataSource } from "./datasource";
import { User } from "./user.entity";

const app = express();
app.use(express.json());
app.use(express.static("public"));
const PORT = 8888;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/", (req, res) => {
  res.send(req.body);
});

app.put("/users/:id", (req, res) => {
  res.send(req.body);
});

app.delete("/users/:id", (req, res) => {
  res.send(req.params.id);
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const user = new User();
  user.name = name;
  user.email = email;

  const userRepository = AppDataSource.getRepository(User);
  const newUser = await userRepository.save(user);
  res.json(newUser);
});

app.get("/users", async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: parseInt(id) });
  res.json(user);
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const userRepository = AppDataSource.getRepository(User);

  const existingUser = await userRepository.findOneBy({ id: parseInt(id) });
});

app.listen(PORT, () => {
  console.log("サーバーが起動しました");
});

AppDataSource.initialize()
  .then(() => {
    console.log("データベースに接続しました");
  })
  .catch((error) => console.log(error));
