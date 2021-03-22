import { Request, Response } from "express";

import { AccountData } from "../Interfaces/AccountData";
import { prisma } from "../Services/prismaClient";

export async function accountList(req: Request, res: Response) {
    const accounts = await prisma.accounts.findMany();

    if (!accounts.length) {
        const err = {
            message: "Ghostbuster hizmetine bağlı yetkili kullanıcı bulunamadı."
        }

        console.log(err);
        res.status(404).send(err);
        return;
    }

    let response: any = [];
    accounts.forEach((account) => {
        const accountData: AccountData = {
            name: account.name
        }

        response.push(accountData);
    });

    console.log(response);
    res.status(200).send(response);
}