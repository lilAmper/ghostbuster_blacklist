import express from "express";

export const app = express();

import "./Routes/api";

app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});