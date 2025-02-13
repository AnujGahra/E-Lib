import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from "./userModal";

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {name, email, password} = req.body;

    // Validation
    if(!name || !email || !password){
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }

    // Database call
    const user = await User.findOne({email});
    if(user){
        const error = createHttpError(400, 'User already exists with this email.');
        return next(error);
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    
    // Process
    // Response
    res.json({ message: "User created" });
};
