import mongoose from 'mongoose'
import colors from 'colors'
export const connectDB = async () => {
    try {

        const connection = await mongoose.connect(process.env.MONGO_URI)
        const url2 = `${connection.connection.host}:${connection.connection.port}`
        console.log(colors.cyan.bold('BD conctada en'), url2)
    } catch (error) {
        console.log(colors.bgRed.white(error.message))
        process.exit(1)
    }
}