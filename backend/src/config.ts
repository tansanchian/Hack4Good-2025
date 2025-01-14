import dotenv from 'dotenv';

dotenv.config({ path:'./.env' });

if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
}

export const PORT: string | number = process.env.PORT || 4000;
export const MONGO_URI = process.env.MONGODB_URI;