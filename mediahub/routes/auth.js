import  express  from "express";
import { adminSignin, adminsignup, googleAuth, signin, signup } from "../controllers/auth.js";


const router=express.Router();


//  create a user
router.post("/signup",signup)

//sign in 
router.post("/signin",signin)


//Admin A user Signin
router.post("/adminsignup",adminsignup)

//Admin A user Signin
router.post("/adminsignin",adminSignin)


//google auth aplication
router.post("/google",googleAuth)


export default router;