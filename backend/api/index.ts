import express from "express"
import { bootstrap } from "../src/app.controller"

const app = express()
bootstrap(app, express)

export default app
