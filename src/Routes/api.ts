import { app } from "../main";
import { Request, Response } from "express";

app.get("/accounts", function (req: Request, res: Response) {
    res.status(200).send("naber");
});