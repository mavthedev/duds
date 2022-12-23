import restServer from "$lib/api.server";
import type { RequestEvent } from "./$types";
import { json } from "@sveltejs/kit"
import { db } from "$lib/db";

export const GET: RequestEvent = async (event) => {
    return json(await db.Game.find().lobbyGames().exec())
}