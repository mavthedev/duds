import { handleServerSession } from "@lucia-auth/sveltekit";
import type { LayoutServerLoad, PageData } from "./$types";
import type { Session, UserData } from "lucia-auth";

// export const load = handleServerSession();

export const load: LayoutServerLoad = async (event): Promise<{ session: Session | null, _lucia: { user: UserData, sessionChecksum: string } }> => {
    const baseData = await (handleServerSession())(event) as PageData
    baseData.session = await event.locals.validate()
    baseData._lucia = {
        user: await baseData._lucia.user,
        sessionChecksum: await baseData._lucia.sessionChecksum
    } // incase the _lucia data is a promise, automatically handle it here before it causes an error
    return baseData
}