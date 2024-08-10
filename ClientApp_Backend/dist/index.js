"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const messages = [];
const AuthMiddleWare = (req, res, next) => {
    const secretHeader = req.headers['x-secret'];
    // console.log("secret header",secretHeader);
    if (secretHeader != "test") {
        return res.sendStatus(400);
    }
    next();
};
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/webhooklistener", AuthMiddleWare, (req, res) => {
    try {
        const { data } = req.body;
        //  console.log("data in client app",req.body);
        //console.log(req.headers);
        messages.push(data);
        res.sendStatus(200);
    }
    catch (ex) {
        res.json(ex);
    }
});
app.get("/", (req, res) => {
    res.send(messages);
});
app.listen(3001, () => {
    console.log("client app listening on 3001");
});
