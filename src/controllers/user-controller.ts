import * as express from "express";
import { createUser, deleteUserById, getUserByEmail, getUserById, getUsers } from "../db/user";
import { authentication, random } from "../helpers";
export const Register = async (req: express.Request, res: express.Response) =>{
    try{
          const {name, surname, email, password, address, birthDate, gender} = req.body;
          if(!name || !surname || !email || !password || !address || !birthDate || !gender){
               return res.sendStatus(400);
          }
          const existingUser = await getUserByEmail(email);
          if (existingUser){
            return res.sendStatus(400);
          }
          const salt = random();
          const user = await createUser({
            name,
            surname, 
            email, 
            address, 
            birthDate, 
            gender,
            authentication: {
                salt,
                password: authentication(salt, password),
            }
          })
          return res.status(200).json(user).end();
     }catch(error){
          console.log(error)
          return res.sendStatus(400);
     }
}

export const Login = async (req: express.Request, res: express.Response) =>{
    try{
          const {email, password} = req.body;
          if(!email || !password){
               return res.sendStatus(400);
          }
          const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
          if (!user){
               return res.sendStatus(400);
          }
          const expectedHash = authentication(user.authentication.salt, password);
          if(user.authentication.password != expectedHash){
               return res.sendStatus(403);
          }
          const salt = random();
          user.authentication.sessionToken = authentication(salt, user._id.toString());
          await user.save();
          res.cookie("auth", user.authentication.sessionToken, {domain: 'localhost', path: '/', httpOnly: false, maxAge: 3600000, // 1hr
          secure: true,});
          return res.status(200).json(user).end();

     }catch(error){
          console.log(error)
          return res.sendStatus(400);
     }
}


export const GetAllUsers = async (req: express.Request, res: express.Response) =>{
     try{
           const users = await getUsers();
           return res.status(200).json(users);
 
      }catch(error){
           console.log(error)
           return res.sendStatus(400);
      }
 }

 export const DeleteUser = async (req: express.Request, res: express.Response) =>{
     try{
          const {id} = req.params;
          const deletedUSer = await deleteUserById(id);
          return res.status(200).json(deletedUSer);
 
      }catch(error){
           console.log(error)
           return res.sendStatus(400);
      }
 }

 export const UpdateUser = async (req: express.Request, res: express.Response) =>{
     try{
         const {id} = req.params;
         const {surname} = req.body;

         if (!surname){
          return res.sendStatus(400);
         }
 
         const user = await getUserById(id);
         user.surname = surname;
         await user.save();
         return res.sendStatus(200).json(user).end();
      }catch(error){
           console.log(error)
           return res.sendStatus(400);
      }
 }
