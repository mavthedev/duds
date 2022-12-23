import lucia from "lucia-auth";
import adapter from "@lucia-auth/adapter-mongoose";
import "./db";
import mongoose from "mongoose";

export const auth = lucia({
    adapter: adapter(mongoose),
    env: import.meta.env.PROD? "PROD" : "DEV",
    transformUserData: (userData) => {
        console.log(userData)
        return userData
    }
})

export type Auth = typeof auth;