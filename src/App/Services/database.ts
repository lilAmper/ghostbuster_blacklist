import { createConnection, getConnectionOptions } from "typeorm";


export async function connectDatabase() {
    const connectionOptions = await getConnectionOptions();

    const gameDatabaseConnection = await createConnection(connectionOptions);
    return gameDatabaseConnection;
}