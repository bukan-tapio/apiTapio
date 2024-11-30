import express from "express";
import { auth } from "../firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { port } from "../server.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("auth running...");
});

// authorization
const ifUserLogin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ").at(-1);

  console.log("user token : ", token);

  const validToken = token !== undefined;
  if (validToken) {
    next();
  } else {
    res.status(401).send({
      message: "Unauthorized: Please log in first.",
    });
  }
};

// regist
app.post("/auth/signup", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log(result.user);

    res.send("Register success!");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// login
app.post("/auth/signin", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const result = await signInWithEmailAndPassword(auth, email, password);

    res.send(JSON.parse(JSON.stringify(result.user)));
    // res.status(200).send({
    //   message: "User success loggin",
    // });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// signOut
app.post("/auth/signout", async (req, res) => {
  try {
    await signOut(auth);

    res.status(200).send({
      message: "User success logged",
    });
  } catch (error) {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
});

app.listen(port, () => {
  console.log(`port : ${port}`);
});
