"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../main");
main_1.app.get("/accounts", function (req, res) {
    res.status(200).send("naber");
});