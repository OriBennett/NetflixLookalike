import { remultExpress } from "remult/remult-express"
import { Task } from "../shared/Task"
import { MongoClient } from "mongodb"
import { MongoDataProvider } from "remult/remult-mongo"
import { Content } from "../shared/Content"


export const api = remultExpress({
  entities: [Task,Content],dataProvider: async () => {
    const client = new MongoClient("mongodb+srv://oribennett:DevDev@cluster0.8peh6zz.mongodb.net/NetflixLookalike?retryWrites=true&w=majority")
    await client.connect()
    return new MongoDataProvider(client.db("NetflixLookalike"), client)
  }

})