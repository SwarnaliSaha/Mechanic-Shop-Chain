import { startServer } from "./app/app";
import { config } from "dotenv";
import authService from "./app/feature-modules/auth/auth.service";
import userService from "./app/feature-modules/users/user.service";
import { Roles } from "./app/feature-modules/roles/role.type";

config();

const populateDb = async ()=>{
    const admin = {
        //_id :"",
        userName : "admin",
        role : Roles.admin,
        email : "admin@gmail.com",
        password : "admin"
    }
    
    // await userService.registerUser(admin);
}

populateDb();
startServer();