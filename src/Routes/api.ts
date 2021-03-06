import { app } from "../main";

import { serverList } from '../App/Controllers/Server.Controller';
import { addBan, banList } from '../App/Controllers/Ban.Controller';
import { accountList } from "../App/Controllers/Account.Controller";

app.route("/servers")
    .get(serverList);

app.route('/bans')
    .get(banList)
    .post(addBan);

app.route('/accounts')
    .get(accountList);