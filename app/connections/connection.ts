import { connect } from "mongoose";

export const connectToMongo = async()=>{
    try{
        const {MONGO_CONNECTION} = process.env;
        await connect(MONGO_CONNECTION||"");
        console.log("connected");
        return true;
    }
    catch(e){
        console.log("Could not connect to mongodb");
        throw {message:"Connection error",error:e}
    }
}