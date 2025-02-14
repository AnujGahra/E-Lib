import { config as conf } from "dotenv";

conf();

const _config = {
    port: process.env.PORT,
    databaseUrl: process.env.MONGO_URI,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    cloudinaryCloud: process.env.CLOUD_NAME,
    cloudinaryApiKet: process.env.CLOUDINARY_API_KEY,
    cloudinarySecret: process.env.CLOUDINARY_API_SECRET_KEY,
    frontendDomain: process.env.FRONTEND_URL
};

export const config = Object.freeze(_config);
