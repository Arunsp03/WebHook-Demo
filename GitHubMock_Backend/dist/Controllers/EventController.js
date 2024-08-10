"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsController = void 0;
const express_1 = require("express");
const __1 = require("..");
const axios_1 = __importDefault(require("axios"));
exports.EventsController = (0, express_1.Router)();
exports.EventsController.post("/webhook", (req, res) => {
    try {
        const { webhook_url, secret, events } = req.body;
        events.forEach((element) => {
            // console.log("elem",element);
            if (element == 'Commit') {
                __1.webhooks_Events["Commit"].push({ url: webhook_url, secret });
            }
            else if (element == 'Push') {
                __1.webhooks_Events["Push"].push({ url: webhook_url, secret });
            }
            else {
                __1.webhooks_Events["Merge"].push({ url: webhook_url, secret });
            }
        });
        // console.log("events",webhooks_Events);
        res.sendStatus(201);
    }
    catch (e) {
        res.sendStatus(500);
    }
});
exports.EventsController.post('/emulate', (req, res) => {
    const { key, data } = req.body;
    try {
        switch (key) {
            case "Commit":
                //    console.log(webhooks_Events["Commit"]);
                __1.webhooks_Events["Commit"].map((item) => {
                    const { url, secret } = item;
                    // console.log("url",url);
                    // console.log("secret",secret); 
                    axios_1.default.post(url, { data: data }, {
                        headers: {
                            'Content-Type': 'application/json', // Ensure the content type is correct
                            'x-secret': secret // Your custom header
                        }
                    }).then(() => {
                        //    console.log("successfully sent ");
                    }).catch((err) => {
                        console.error(err);
                    });
                });
                break;
            case "Merge":
                //   console.log(webhooks_Events["Merge"]);
                __1.webhooks_Events["Merge"].map((item) => {
                    const { url, secret } = item;
                    // console.log("url",url);
                    // console.log("secret",secret);
                    axios_1.default.post(url, { data: "Merge Requests" }, {
                        headers: {
                            'Content-Type': 'application/json', // Ensure the content type is correct
                            'x-secret': secret // Your custom header
                        }
                    }).then(() => {
                        console.log("successfully sent ");
                    }).catch((err) => {
                        console.error(err);
                    });
                });
                break;
            case "Push":
                // console.log(webhooks_Events["Push"]);
                __1.webhooks_Events["Push"].map((item) => {
                    const { url, secret } = item;
                    // console.log("url",url);
                    // console.log("secret",secret);
                    let data = "testing data";
                    axios_1.default.post(url, { data: "Push" }, {
                        headers: {
                            'Content-Type': 'application/json', // Ensure the content type is correct
                            'x-secret': secret // Your custom header
                        }
                    })
                        .then(() => {
                        console.log("successfully sent ");
                    }).catch((err) => {
                        console.log("error");
                    });
                });
                break;
        }
        res.sendStatus(200);
    }
    catch (err) {
        res.sendStatus(500);
    }
});
exports.EventsController.get("/db", (req, res) => {
    res.json(__1.webhooks_Events);
});
