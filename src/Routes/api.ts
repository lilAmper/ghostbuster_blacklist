import { app } from "../main";
import { serverList } from '../App/Controllers/Server.Controller';

app.get("/servers", serverList);