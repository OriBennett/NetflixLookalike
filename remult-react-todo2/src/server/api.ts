import { remultExpress } from "remult/remult-express"
import { Task } from "../shared/Task"
import { TasksController } from "../shared/TasksController"
import { MongoClient } from "mongodb"
import { MongoDataProvider } from "remult/remult-mongo"


export const api = remultExpress({
    dataProvider: async () => {
        const connectionString = process.env.MONGODB_CONNECTION_STRING;
        if (!connectionString) {
            throw new Error('MongoDB connection string not found in environment variables');
        }
        const client = new MongoClient(connectionString)
        await client.connect()
        return new MongoDataProvider(client.db("NetflixLookalike"), client)
    },
    entities: [Task],
    controllers: [TasksController],
    getUser: req => req.session!["user"]
})

