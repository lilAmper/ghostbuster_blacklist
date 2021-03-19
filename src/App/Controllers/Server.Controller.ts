import { Request, Response } from "express";
import { prisma } from "../Services/prismaClient";

import * as sampQuery from '../Services/sampQuery';
import { serverType } from '../Enum/serverTypes';
import { ServerData } from "../Interfaces/ServerData";

export async function serverList(req: Request, res: Response) {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

    const serverResponse = await prisma.server.findMany();

    if (!serverResponse.length) {
        const err = {
            message: "GhostBuster Blacklist hizmetini kullanan herhangi bir sunucu bulunamadı."
        }

        console.log(err);
        res.status(404).send(err);
        return;
    }

    const servers: any = await getServersGameData(serverResponse);

    Promise.all(servers)
        .then((server) => {
            console.log(server);
            res.status(200).send(server);
        })
        .catch((error) => {
            console.log(error.message);
            res.status(404).send(error);
        });
}

function getServersGameData(serverResponse: any) {
    const servers: any = [];
    servers.push(
        new Promise((resolve) => {
            serverResponse.forEach((server: any) => {
                if (server.type == serverType.SAMP) {
                    sampQuery.getServerInfo(server.ip, server.port, (error: boolean, response: any) => {
                        if (error)
                            console.log("[SAMP] " + server.name + " isimli sunucu ile iletişim kurulamadığı için veriler çekilemedi.");
                        else {
                            const serverData: ServerData = {
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