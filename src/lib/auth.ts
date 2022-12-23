import lucia from "lucia-auth";
import adapter from "@lucia-auth/adapter-mongoose";
import { db } from './db';
import mongoose from "mongoose";

export const auth = lucia({
    adapter: adapter(mongoose),
    env: import.meta.env.PROD? "PROD" : "DEV",
    transformUserData: async (userData) => {
        const userOBJ = (await db.User.findById(userData.id).exec()).toObject({ virtuals: true })
        console.log(userOBJ)
        return {
            id: userOBJ.id,
            exp: userOBJ.exp,
            username: userOBJ.username,
            level: userOBJ.level,
            expNeeded: userOBJ.nextExp
        }
    }
})

export type Auth = typeof auth;