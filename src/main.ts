import express from "express";
import { prisma } from './App/Services/prismaClient';

export const app = express();

import "./Routes/api";

app.use(express.json());

const port = process.env.PORT || 3000;

console.log("hallovv" + port);
app.listen(port);