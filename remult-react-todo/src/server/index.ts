import express from "express"
import { api } from "./api"
import session from "cookie-session"



const app = express()
app.use(
    session({
      secret: process.env["SESSION_SECRET"] || "my secret"
    })
  )
app.use(api)

app.listen(3002, () => console.log("Server started"));//change to env var
