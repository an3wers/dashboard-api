// Создаем простой сервер через библиотеку http

import http from "http";

const host = "127.0.0.1";
const port = 8000;

const server = http.createServer((req, res) => {
  // Обработка запроса на серсвер

  // Ответ от сервера
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end('Hello!')


});

server.listen(port, host, () => {
  console.log(`Сервер запушен: ${host}:${port}`);
});
