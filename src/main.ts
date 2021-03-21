import express from "express";

export const app = express();

app.use(express.json());

import "./Routes/api";

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});