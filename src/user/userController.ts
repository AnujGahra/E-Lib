import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from "./userModal";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

// Bussiness Logic for Create User
export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }

    // Database call.
    try {
        const user = await User.findOne({ email });
        if (user) {
            const error = createHttpError(
                400,
                "User already exists with this email."
            );
            return next(error);
        }
    } catch (error) {
        console.error("Error during register:", error);
        return next(createHttpError(500, "Error while getting user"));
    }

    /// password -> hash

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser: User;
    try {
        newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });
    } catch (error) {
        console.error("Error during create user:", error);
        return next(createHttpError(500, "Error while creating user."));
    }

    try {
        // Token generation JWT
        const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
            expiresIn: "7d",
            algorithm: "HS256",
        });
        // Response
        res.status(201).json({ accessToken: token });
    } catch (error) {
        console.error("Error during register:", error);
        return next(createHttpError(500, "Error while signing the jwt token"));
    }
};

// Bussiness Logic for Login User
export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(createHttpError(400, "All fields are required"));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return next(createHttpError(404, "User not found."));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(createHttpError(400, "Username or password incorrect!"));
        }

        // Create access token
        const token = sign({ sub: user._id }, config.jwtSecret as string, {
            expiresIn: "7d",
            algorithm: "HS256",
        });

        res.json({ accessToken: token });
    } catch (error) {
        // Log the error for debugging
        console.error("Error during login:", error);

        // Pass the error to the error-handling middleware
        next(createHttpError(500, "An internal server error occurred"));
    }
};

