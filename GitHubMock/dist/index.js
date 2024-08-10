"use strict";
const submitform = () => {
    let url = document.getElementById("webhook_url");
    let secret = document.getElementById("secret");
    let eventElementsArray = Array.from(document.getElementsByClassName("events"));
    let newArray = [];
    eventElementsArray.map((item) => {
        if (item.checked) {
            newArray.push(item.name);
        }
    });
    let requestObj = {
        webhook_url: url === null || url === void 0 ? void 0 : url.value,
        secret: secret === null || secret === void 0 ? void 0 : secret.value,
        events: newArray
    };
    fetch("http://localhost:3000/api/webhook", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestObj)
    }).then(() => {
        console.log("success");
    }).catch((err) => {
        console.error(err);
    });
    console.log(requestObj);
};
const handleMock = (key) => {
    let data = {
        key,
        data: key + " initiated"
    };
    fetch("http://localhost:3000/api/emulate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(() => {
        console.log("success");
    }).catch((err) => {
        console.error(err);
    });
};
