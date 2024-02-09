

import { Entity, Fields} from "remult"


@Entity("users", {
  allowApiCrud: true
})
export class User {
    @Fields.string({
        dbName: '_id',
        valueConverter: {
          fieldTypeInDb: 'dbid',
        },
      })
      id = ""

   @Fields.string({
    validate: (user) => {
        if (user.userName.length < 3) throw "Too Short"
      }
   })
   userName= ""
   
   @Fields.string({
    validate: (user) => {
        if (user.password.length < 3) throw "Too Short"
      }
   })
   password= ""
   
   @Fields.string({
    validate: (user) => {
        if (user.email.length < 3) throw "Too Short"
      }
   })
   email= ""
      
   @Fields.string({    
   })
   profilePicture= ""
   
   @Fields.boolean({    
   })
   isAdmin= false
   
   
   @Fields.object({    
   })
   myList= []

}