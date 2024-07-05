import "dotenv/config";

import path from "path";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { pusher, generateRandomBytes } from "./_helpers";

const app = express();

app.use(cors({
    origin: true,
    optionsSuccessStatus: 200
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client")));

app.get("/api", (req, res) => {
    res.status(200).send("!!! VIDEO CONFERENCE API LIVE !!!");
});

app.get("*", (req, res) => {  
    return res.sendFile(path.resolve(__dirname, "client", "index.html"));
});

app.listen(process.env.PORT, () => {
    console.log(`Server Running @ http://localhost:${process.env.PORT}`);    
});

app.post("/api/create-room/", async (req, res) => {
    try {
        const roomID = generateRandomBytes(8);
        res.status(200).send({ roomID });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/api/pusher/auth-user/", async (req, res) => {
    try {
        const socketID = req.body.socket_id;
        if (req.headers.userinfo === undefined) return res.status(400);

        const user = {
            id: generateRandomBytes(8),
            user_info: JSON.parse(req.headers.userinfo.toString())
        };
        pusher.authenticateUser(socketID, user);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/api/pusher/auth-channel/", async (req, res) => {
    try {
        const socketID = req.body.socket_id;
        const channel = req.body.channel_name;
        if (req.headers.userinfo === undefined) return res.status(400);

        const user = {
            user_id: generateRandomBytes(8),
            user_info: JSON.parse(req.headers.userinfo.toString())
        };
        const authChannel = pusher.authorizeChannel(socketID, channel, user);
        res.status(200).json(authChannel)
    } catch (error) {
        res.status(500).send(error);
    } 
});