import * as express from "express";
import { GetAllUsers, Login, Register, UpdateUser } from "../controllers/user-controller";
import { isAuthenticated, isOwner } from "../middlewares";



export default (router: express.Router)=>{
    router.post("/auth/register", Register);
    router.post("/auth/login", Login);

    router.get("/user/all", isAuthenticated, GetAllUsers);
    router.get("/user/delete/:id", isAuthenticated,  isOwner, GetAllUsers);
    router.get("/user/update/:id", isAuthenticated,  isOwner, UpdateUser);
}