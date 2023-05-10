import express from 'express'
import { connectToMongo } from './connections/connection'
import { registerRoutes } from './router/routes';

export const startServer = async() => {
    try{
        const app = express();
        await connectToMongo();
        registerRoutes(app)
        const {PORT} = process.env;

        app.listen(PORT||3000,()=>console.log(`listeing at port ${PORT||3000}`))
    }
    catch(e){
        console.log("could not start server");
        process.exit(1)
    }
}