import cors from "cors";
import express from "express";
import AuthRoutes from "./modules/auth/auth.routes.js";
import OfferRoutes from "./modules/offer/offer.routes.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
import DeletedRoutes from "./modules/deleted-all/deleted.routes.js";
import {
  createNewMessage,
  getMessages,
} from "./modules/messages/messages.socket.controller.js";
import { getAllChats } from "./modules/messages/messages.socket.controller.js";

const app = express();
app.use(cors({ origin: "*" }));

export const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("getMessages", async (data) => {
    const messages = await getMessages(data);
    socket.emit("getMessages", messages);
  });
  socket.on("sendMessage", async (data) => {
    await createNewMessage(data);
    const messages = await getMessages(data);
    io.emit("responseMessages", messages);
    io.emit("updateAllChats");
  });
  socket.on("getAllChats", async (data) => {
    const chats = await getAllChats(data);
    socket.emit("responseAllChats", chats);
  });
  socket.on("disconnect", () => {});
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/auth", AuthRoutes);
app.use("/api/offer", OfferRoutes);
app.use("/api/delete", DeletedRoutes);

const port = 3001;
const IP_ADDRESS = "192.168.0.104";
server.listen(port, IP_ADDRESS, () => {
  console.log(`server start ${port}`);
});
