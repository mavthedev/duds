import { handleServerSession } from "@lucia-auth/sveltekit";
import type { LayoutServerLoad } from "./$types";

// export const load = handleServerSession();

export const load: LayoutServerLoad = async (event) => {
    const baseData = await (handleServerSession())(event)
    baseData.session = event.locals.validate()
    baseData._lucia = await baseData._lucia
    return baseData
}