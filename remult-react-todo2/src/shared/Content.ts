import { Entity, Fields} from "remult"

@Entity("contents", {
    allowApiCrud: true
  })
export class Content {

  @Fields.string({
    dbName: '_id',
    valueConverter: {
      fieldTypeInDb: 'dbid',
    },
  })
  id = ""

  @Fields.string({
    
  })
  title = ""

  @Fields.string({
    
  })
  description = ""

  @Fields.string()
  img = ""

  @Fields.string()
  imgTitle = ""

  @Fields.string()
  imgThumb = ""

  @Fields.string()
  imgVertical = ""

  @Fields.string({
    
  })
  trailer = ""

  @Fields.string({
    
  })
  movie = ""

  @Fields.string()
  duration = ""

  @Fields.number({
    
  })
  year = ""

  @Fields.number({
    
  })
  limit = ""

  @Fields.string()
  genre = ""

  @Fields.boolean()
  isSeries = ""

  @Fields.createdAt()
  createdAt?: Date;

}