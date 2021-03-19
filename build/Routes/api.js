"use strict";
exports.__esModule = true;
var main_1 = require("../main");
var Server_Controller_1 = require("../App/Controllers/Server.Controller");
main_1.app.get("/servers", Server_Controller_1.serverList);
//# sourceMappingURL=api.js.map