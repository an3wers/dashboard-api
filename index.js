// Создаем простой сервер через библиотеку express

import express from "express";
import { userRouter } from "./users/users.js";

const port = 8000;

const app = express();

// Middleware
// app.all("/hello", (req, res, next) => {
//   console.log("All");
//   next();
// });

// const cb = (req, res, next) => {
//   console.log("CB");
//   next();
// };

// app.route("/user").get("/hello", (req, res) => {
//         res.send("Hello get!");
//     })

//  Способ на один ройт подвесить несколько методов
// app.route("/hello")
//     .get((req, res) => {
//         res.send('Hello get')
//     })
//     .post((req, res) => {
//         res.send('Hello post')
//     })

app.use((req, res, next) => {
  console.log("Время: ", Date.now());
  next();
});

app.get("/hello", (req, res) => {
  res.cookie("token", "jhjh8298jdhsf", {
    domain: "",
    path: "/",
    secure: true,
  });
  res.type("json");
//   res.send({ success: true });
throw new Error('error')
});

// Обрабатываем роутер userRouter
app.use("/users", userRouter);

// Обработка ошибки 

app.use((error, req, res, next) => {
    console.log(error.message)
    res.status(500).send(error.message)
})

app.listen(port, () => {
  console.log(`Сервер запушен: http://localhost:${port}`);
});
