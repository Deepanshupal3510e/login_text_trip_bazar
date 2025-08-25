import { configDotenv } from "dotenv"
import mongoose from "mongoose"

configDotenv()
const connectDatabase = async () => {
    try {
      await  mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Databse connected...")
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export default connectDatabase