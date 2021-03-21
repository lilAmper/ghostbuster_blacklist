import { Request, Response } from "express";

import { BanData } from "../Interfaces/BanData";
import { prisma } from "../Services/prismaClient";

export async function banList(req: Request, res: Response) {
    const bans = await prisma.bans.findMany();

    if (!bans.length) {
        const err = {
            message: "Herhangi bir sunucudan herhangi bir ban bilgisi alınamadı."
        }

        console.log(err);
        res.status(404).send(err);
        return;
    }

    let response: any = [];
    bans.forEach((ban) => {
        const banData: BanData = {
            id: ban.id,
            user_name: ban.user_name,
            reason: ban.reason,
            server_id: ban.serverId
        }

        response.push(banData);
    });

    console.log(response);
    res.status(200).send(response);
}

export async function addBan(req: Request, res: Response) {

}