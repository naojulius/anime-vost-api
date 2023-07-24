import { Schema, model } from "mongoose";
import { Authenticaton } from "../@core/authentication";

interface IUser {
    name: string;
    surname: string;
    email: string;
    // password: string;
    address: string;
    birthDate: Date;
    gender: string;
    authentication: Authenticaton;
  }

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    birthDate: { type: Date, required: true },
    gender: { type: String, required: true },
    authentication: {
        password: { type: String, required: true },
        salt: { type: String, required: false },
        sessionToken: { type: String, required: false },
    }
});
export const User = model<IUser>('User', userSchema);
export const getUsers = () => User.find().select("-authentication");
export const getUserByEmail = (email: string) => User.findOne({email});
export const getUSerBySessionToken = (sessionToken: string) => User.findOne({
    'authentication.sessionToken': sessionToken,
});
export const getUserById = (id: string) => User.findById(id);
export const createUser = (values: Record<string, any>) => new User(values).save().then((user)=>user.toObject());
export const deleteUserById = (id: string) => User.findOneAndDelete({_id: id});
export const updateUserById = (id: string, values: Record<string, any>) => User.findByIdAndUpdate(id, values);
