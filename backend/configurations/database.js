/* In this will we will make database configurations 
to connect to the MongoDB database */
import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        /* here is means connection is successfully established */
        console.log(`MongoDB Connection Established: ${conn.connection.host}`)
    }
    catch(error){
        /* if an error occurs while connecting to the database */
        console.error(`Error while connecting to the MongoDB: ${error.message}`)
        
        const FAILURE = 1
        process.exit(FAILURE)
    }
};

export default connectDB
