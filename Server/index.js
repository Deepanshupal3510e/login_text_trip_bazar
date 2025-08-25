import express from "express"
import { configDotenv } from "dotenv";
import connectDatabase from "./config/connect.db.js";
import { handleError } from "./config/handleError.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors"
configDotenv()
const app = express()

const port = process.env.PORT || 5000
connectDatabase()
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cors({
    origin : "*"
}))


app.use("/api/user" , userRouter)


app.use(handleError)
app.listen(port , () => {
    console.log("server is listning on port" , port , "....")
})