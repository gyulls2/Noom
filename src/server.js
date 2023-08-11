import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);

const wss = new WebSocket.Server({ server }); // 같은 서버에서 http, webSocket 둘 다 작동 (같은 포트 사용)

wss.on("connection", (socket) => {
  console.log("Connected to Browser ✅");
  socket.on("close", () => {
    console.log("Disconnected to Browser ❌");
  });
  socket.on("message", (message) => {
    console.log(message.toString("utf-8"));
  });
  socket.send("hello!!!");
});

server.listen(3000, handleListen);
