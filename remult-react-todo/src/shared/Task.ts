// src/shared/Task.ts

import { Entity, Fields, Validators } from "remult"

@Entity("tasks", {
  allowApiCrud: true
})
export class Task {
  @Fields.cuid()
  id = ""

  

  @Fields.string({
    //validate: Validators.required this is a remult made validator
    validate: (task) => {
        if (task.title.length < 3) throw "Too Short"
      }

  })
  title = ""

  @Fields.boolean()
  completed = false

  @Fields.createdAt()
  createdAt?: Date
}