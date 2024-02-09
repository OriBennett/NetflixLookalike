import { BackendMethod, remult } from "remult"
import { Content } from "./Content"
import { User } from "./User"
import * as database from "../../db/data" 
import { ALL } from "dns"

export class SeedController {
  @BackendMethod({ allowed: true })
  static async seedData(data: any) {
    const userRepo = remult.repo(User)
    const contentRepo = remult.repo(Content)
    const localData = database.data
    await userRepo.delete
    await userRepo.insert(localData.users)
    await contentRepo.insert(localData.content)

    
  }
}