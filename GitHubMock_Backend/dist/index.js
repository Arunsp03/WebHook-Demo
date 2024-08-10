"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhooks_Events = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const EventController_1 = require("./Controllers/EventController");
const app = (0, express_1.default)();
exports.webhooks_Events = {
    Commit: [],
    Push: [],
    Merge: []
};
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", EventController_1.EventsController);
app.listen(3000, () => {
    console.log("im listening in port 3000");
});
