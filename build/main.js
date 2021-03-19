"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var express_1 = __importDefault(require("express"));
exports.app = express_1["default"]();
require("./Routes/api");
exports.app.use(express_1["default"].json());
var port = process.env.PORT || 3000;
console.log("hallovv" + port);
exports.app.listen(port);
//# sourceMappingURL=main.js.map