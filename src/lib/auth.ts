import lucia from "lucia-auth";
import adapter from "@lucia-auth/adapter-mongoose";
import mongoose from "mongoose";

export const auth = lucia({
    adapter: adapter(mongoose),
    env: import.meta.env.PROD?"PROD":"DEV"
})

export type Auth = typeof auth;