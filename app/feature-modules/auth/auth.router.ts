import {Router , Request,Response,NextFunction} from "express"
import authService from "./auth.service";
import { ResponseHandler } from "../../utility/response-handler";
import { LOGIN_VALIDATOR, REFRESH_TOKEN_VALIDATOR } from "./auth-validator";

const router = Router();

router.post("/login",LOGIN_VALIDATOR,async (req:Request,res:Response,next:NextFunction)=>{
    try{
        console.log("router")
        const credential = req.body;
        const result = await authService.login(credential)
        res.send(new ResponseHandler(result));
    }
    catch(e){
        console.log(e)
        next(e);
    }
})

router.post('/refresh',REFRESH_TOKEN_VALIDATOR,async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const refreshToken = req.body.refreshToken;
        const result = authService.refreshToken(refreshToken);

        res.send(new ResponseHandler(result))
    } 
    catch (error) {
        next(error)
    }
})

export default router;