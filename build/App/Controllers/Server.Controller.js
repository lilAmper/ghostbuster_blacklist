"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.serverList = void 0;
var prismaClient_1 = require("../Services/prismaClient");
var sampQuery = __importStar(require("../Services/sampQuery"));
var serverTypes_1 = require("../Enum/serverTypes");
function serverList(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var serverResponse, err, servers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res.setHeader('Content-Type', 'text/html');
                    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
                    return [4 /*yield*/, prismaClient_1.prisma.server.findMany()];
                case 1:
                    serverResponse = _a.sent();
                    if (!serverResponse.length) {
                        err = {
                            message: "GhostBuster Blacklist hizmetini kullanan herhangi bir sunucu bulunamadı."
                        };
                        console.log(err);
                        res.status(404).send(err);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, getServersGameData(serverResponse)];
                case 2:
                    servers = _a.sent();
                    Promise.all(servers)
                        .then(function (server) {
                        console.log(server);
                        res.status(200).send(server);
                    })["catch"](function (error) {
                        console.log(error.message);
                        res.status(404).send(error);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.serverList = serverList;
function getServersGameData(serverResponse) {
    var servers = [];
    servers.push(new Promise(function (resolve) {
        serverResponse.forEach(function (server) {
            if (server.type == serverTypes_1.serverType.SAMP) {
                sampQuery.getServerInfo(server.ip, server.port, function (error, response) {
                    if (error)
                        console.log("[SAMP] " + server.name + " isimli sunucu ile iletişim kurulamadığı için veriler çekilemedi.");
                    else {
                        var serverData = {
                            id: server.id,
                            ip: server.ip,
                            name: response.servername,
                            port: server.port,
                            type: server.type,
                            players: response.players,
                            maxplayers: response.maxplayers
                        };
                        resolve(serverData);
                    }
                });
            }
        });
    }));
    return servers;
}
//# sourceMappingURL=Server.Controller.js.map