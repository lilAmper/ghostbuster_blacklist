import express from "express";
import { connectDatabase } from './App/Services/database';

export const app = express();

import "./Routes/api";

app.use(express.json());

connectDatabase();
app.listen(3000);