import dgram from 'dgram';
import dns from 'dns';

var safeRequest = function (ipaddress: any, port: any, opcode: any, safeResponse: any) {
    if (validateIPAddress(ipaddress)) {
        request(ipaddress, port, opcode, function (error: any, response: any) { safeResponse.apply(ipaddress, [error, response]) });
    }
    else {
        dns.lookup(ipaddress, function (err, result) {
            if (err) safeResponse.apply(ipaddress, [err, result]);
            request(ipaddress, port, opcode, function (error: any, response: any) { safeResponse.apply(ipaddress, [error, response]) });
        })
    }
}

var request = function (ipaddress: any, port: any, opcode: any, response: any) {
    var socket = dgram.createSocket("udp4");
    var packet = Buffer.alloc(10 + opcode.length);

    packet.write('SAMP');
    packet[4] = ipaddress.split('.')[0];
    packet[5] = ipaddress.split('.')[1];
    packet[6] = ipaddress.split('.')[2];
    packet[7] = ipaddress.split('.')[3];
    packet[8] = port & 0xFF;
    packet[9] = port >> 8 & 0xFF;
    packet[10] = opcode.charCodeAt(0);

    try {
        socket.send(packet, 0, packet.length, port, ipaddress, function (error, bytes) {
            if (error) {
                console.log(error);
                return -1;
            }
        });
    }
    catch (error) { console.log(error); return -1; }


    var controller = setTimeout(function () {
        socket.close();
        return response.apply(ipaddress, [true, "[error] host unavailable - " + ipaddress + ":" + port]);
    }, 2000);

    socket.on('message', function (message) {
        if (controller) clearTimeout(controller);
        if (message.length < 11) {
            response.apply(ipaddress, [true, "[error] invalid socket on message - " + message]);
        }
        else {
            socket.close();
            message = message.slice(11);

            var offset = 0, object: any = {};

            if (opcode === 'i') {
                object.passworded = !!message.readUInt8(offset);
                object.players = message.readUInt16LE(offset += 1);
                object.maxplayers = message.readUInt16LE(offset += 2);

                object.servername = message.readUInt16LE(offset += 2);
                object.servername = message.slice(offset += 4, offset += object.servername).toString();

                object.gamemodename = message.readUInt16LE(offset);
                object.gamemodename = message.slice(offset += 4, offset += object.gamemodename).toString();

                object.language = message.readUInt16LE(offset);
                object.language = message.slice(offset += 4, offset += object.language).toString();
                return response.apply(ipaddress, [false, object]);
            }
            else if (opcode === 'r') {
                var propertiescount = message.readUInt16LE(offset); offset += 2;

                for (var i = 0; i < propertiescount; i++) {
                    var property: any = message.readUInt8(offset);
                    property = message.slice(++offset, offset += property).toString();

                    var propertyvalue: any = message.readUInt8(offset);
                    propertyvalue = message.slice(++offset, offset += propertyvalue).toString();

                    object[property] = propertyvalue;
                }
                return response.apply(ipaddress, [false, object]);
            }
            else if (opcode === 'd') {
                object = [];

                var playerslist = [], playercount = message.readUInt16LE(offset); offset += 2;

                for (var i = 0; i < playercount; i++) {
                    playercount--;
                    var player: any = {};

                    player.id = message.readUInt8(offset);
                    player.name = message.readUInt8(++offset);
                    player.name = message.slice(++offset, offset += player.name).toString();
                    player.score = message.readUInt16LE(offset);
                    player.ping = message.readUInt16LE(offset += 4);
                    offset += 4;

                    object.push(player);
                }
                return response.apply(ipaddress, [false, object]);
            }
            else if (opcode === 'c') {
                object = [];

                var playerslist = [], playercount = message.readUInt16LE(offset); offset += 2;

                for (var i = 0; i < playercount; i++) {
                    playercount--;
                    var player: any = {};

                    player.name = message.readUInt8(offset);
                    player.name = message.slice(++offset, offset += player.name).toString();
                    player.score = message.readUInt16LE(offset);
                    offset += 4;

                    object.push(player);
                }
                console.log(object);
                return response.apply(ipaddress, [false, object]);

            }
        }
    });
}

function validateIPAddress(ipaddress: any) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) return true;
    return false;
}

export var getServerInfo = (serverip: any, serverport: any, reply: any) => {
    safeRequest.call(1, serverip, serverport, "i", function (error: any, response: any) {
        if (error) return reply.apply(serverip, [true, response]);
        var serverinfo = response;

        safeRequest.call(1, serverip, serverport, "r", function (error: any, response: any) {
            if (error) return reply.apply(serverip, [true, response]);
            serverinfo["properties"] = response;

            /*if (parseInt(serverinfo.players) < 100) {
                safeRequest.call(1, serverip, serverport, "d", function (error: any, response: any) {
                    if (error) return reply.apply(serverip, [true, response]);
                    serverinfo["playerlist"] = response;

                    return reply.apply(serverip, [false, serverinfo]);
                });
            }*/
            return reply.apply(serverip, [false, serverinfo]);
        });
    });
}

var getServerProperties = function (serverip: any, serverport: any, reply: any) {
    safeRequest.call(1, serverip, serverport, "r", function (error: any, response: any) {
        if (error) return reply.apply(serverip, [true, response]);
        return reply.apply(serverip, [false, response]);
    });
}

var getServerOnline = function (serverip: any, serverport: any, reply: any) {
    safeRequest.call(1, serverip, serverport, "i", function (error: any, response: any) {
        if (error) return reply.apply(serverip, [true, response]);
        return reply.apply(serverip, [false, parseInt(response.players)]);
    });
}

var getServerMaxPlayers = function (serverip: any, serverport: any, reply: any) {
    safeRequest.call(1, serverip, serverport, "i", function (error: any, response: any) {
        if (error) return reply.apply(serverip, [true, response]);
        return reply.apply(serverip, [false, parseInt(response.maxplayers)]);
    });
}

var getServerName = function (serverip: any, serverport: any, reply: any) {
    safeRequest.call(1, serverip, serverport, "i", function (error: any, response: any) {
        if (error) return reply.apply(serverip, [true, response]);
        return reply.apply(serverip, [false, response.servername]);
    });
}

var getServerGamemodeName = function (serverip: any, serverport: any, reply: any) {
    safeRequest.call(1, serverip, serverport, "i", function (error: any, response: any) {
        if (error) return reply.apply(serverip, [true, response]);
        return reply.apply(serverip, [false, response.gamemodename]);
    });
}

var getServerLanguage = function (serverip: any, serverport: any, reply: any) {
    safeRequest.call(1, serverip, serverport, "i", function (error: any, response: any) {
        if (error) return reply.apply(serverip, [true, response]);
        return reply.apply(serverip, [false, response.language]);
    });
}

var getServerVersion = function (serverip: any, serverport: any, reply: any) {
    safeRequest.call(1, serverip, serverport, "r", function (error: any, response: any) {
        if (error) return reply.apply(serverip, [true, response]);
        return reply.apply(serverip, [false, response.version]);
    });
}

var getServerWeather = function (serverip: any, serverport: any, reply: any) {
    safeRequest.call(1, serverip, serverport, "r", function (error: any, response: any) {
        if (error) return reply.apply(serverip, [true, response]);
        return reply.apply(serverip, [false, response.weather]);
    });
}

var getServerWebSite = function (serverip: any, serverport: any, reply: any) {
    safeRequest.call(1, serverip, serverport, "r", function (error: any, response: any) {
        if (error) return reply.apply(serverip, [true, response]);
        return reply.apply(serverip, [false, response.weburl]);
    });
}

var getServerWorldTime = function (serverip: any, serverport: any, reply: any) {
    safeRequest.call(1, serverip, serverport, "r", function (error: any, response: any) {
        if (error) return reply.apply(serverip, [true, response]);
        return reply.apply(serverip, [false, response.worldtime]);
    });
}

export var getServerPlayers = function (serverip: any, serverport: any, reply: any) {
    getServerOnline.call(1, serverip, serverport, function (error: any, response: any) {
        if (!isFinite(response) || response > 100) return reply.apply(serverip, [true, "[error] more 100 players on server"]);

        safeRequest.call(1, serverip, serverport, "c", function (error: any, response: any) {
            if (error) return reply.apply(serverip, [true, response]);
            return reply.apply(serverip, [false, response]);
        });
    });
}

var getServerPlayersDetailed = function (serverip: any, serverport: any, reply: any) {
    getServerOnline.call(1, serverip, serverport, function (error: any, response: any) {
        if (!isFinite(response) || response > 100) return reply.apply(serverip, [true, "[error] more 100 players on server"]);

        safeRequest.call(1, serverip, serverport, "d", function (error: any, response: any) {
            if (error) return reply.apply(serverip, [true, response]);
            return reply.apply(serverip, [false, response]);
        });
    });
}

var getServerPing = function (serverip: any, serverport: any, reply: any) {

    var timenow = new Date().getTime();

    safeRequest.call(1, serverip, serverport, "i", function (error: any, response: any) {
        if (error) return reply.apply(serverip, [true, response]);
        return reply.apply(serverip, [false, new Date().getTime() - timenow]);
    });
}