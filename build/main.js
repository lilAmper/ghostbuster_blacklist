"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = require("./App/Services/database");
exports.app = express_1.default();
require("./Routes/api");
exports.app.use(express_1.default.json());
database_1.connectDatabase();
exports.app.listen(3000);
