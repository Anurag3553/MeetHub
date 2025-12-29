import express from 'express';
import {createServer} from 'node:http';
import {Server} from "socket.io";
import mongoose from 'mongoose';
import cors from "cors";
import userroutes from "./routes/usersroutes.js";

import { connectToSocket } from './controllers/socketManagerio.js';

const app = express();
const server = createServer(app);
const io =  connectToSocket(server);
app.use(cors());
app.use(express.json({limit : "40kb"}));
app.use(express.urlencoded({limit: "40kb" , extended: true}));
app.use("/api/v1/users", userroutes);

app.set("port", (process.env.PORT || 8000));
app.get("/home", (req, res) => {
    return res.json({"holoo" : "worrd"});
});

const start = async() => {
    const connectionmongDB = await mongoose.connect("mongodb+srv://anuragyadav731756_db_user:17ekPU49Z1Yj7cOs@meethubcluster.2ybxxbx.mongodb.net/");
    console.log(`Mongo Connected DB host : ${connectionmongDB.connection.host}`);
    server.listen(app.get("port"), () => {
        console.log("Server is listening on port 8000");
    });
};

start();