import { remultExpress } from "remult/remult-express"
import { Task } from "../shared/Task"
import { TasksController } from "../shared/TasksController"
import { MongoClient } from "mongodb"
import { MongoDataProvider } from "remult/remult-mongo"
import { Content } from "../shared/Content"
import { User } from "../shared/User"
import { SeedController } from "../shared/SeedController"


export const api = remultExpress({
    dataProvider: async () => {
        const connectionString = "mongodb+srv://oribennett:DevDev@cluster0.8peh6zz.mongodb.net/NetflixLookalike?retryWrites=true&w=majority";
        if (!connectionString) {
            throw new Error('MongoDB connection string not found in environment variables');
        }
        const client = new MongoClient(connectionString)
        await client.connect()
        return new MongoDataProvider(client.db("NetflixLookalike"), client)
    },
    entities: [Task, User, Content],
    controllers: [TasksController, SeedController],
    getUser: req => req.session!["user"]
})

