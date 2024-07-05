"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const _helpers_1 = require("./_helpers");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: true,
    optionsSuccessStatus: 200
}));
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "client")));
app.get("/api", (req, res) => {
    res.status(200).send("!!! VIDEO CONFERENCE API LIVE !!!");
});
app.get("*", (req, res) => {
    return res.sendFile(path_1.default.resolve(__dirname, "client", "index.html"));
});
app.listen(process.env.PORT, () => {
    console.log(`Server Running @ http://localhost:${process.env.PORT}`);
});
app.post("/api/create-room/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomID = (0, _helpers_1.generateRandomBytes)(8);
        res.status(200).send({ roomID });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.post("/api/pusher/auth-user/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const socketID = req.body.socket_id;
        if (req.headers.userinfo === undefined)
            return res.status(400);
        const user = {
            id: (0, _helpers_1.generateRandomBytes)(8),
            user_info: JSON.parse(req.headers.userinfo.toString())
        };
        _helpers_1.pusher.authenticateUser(socketID, user);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.post("/api/pusher/auth-channel/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const socketID = req.body.socket_id;
        const channel = req.body.channel_name;
        if (req.headers.userinfo === undefined)
            return res.status(400);
        const user = {
            user_id: (0, _helpers_1.generateRandomBytes)(8),
            user_info: JSON.parse(req.headers.userinfo.toString())
        };
        const authChannel = _helpers_1.pusher.authorizeChannel(socketID, channel, user);
        res.status(200).json(authChannel);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
//# sourceMappingURL=app.js.map