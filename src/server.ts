import express from "express"
import router from "./router"
import 'dotenv/config'
import { connectDB } from "./config/db"
import { corsConfig } from "./config/cors"
import cors from 'cors'
const app = express()
connectDB()
//cors
app.use(cors(corsConfig))
app.use(express.json())
app.use('/', router)




export default app