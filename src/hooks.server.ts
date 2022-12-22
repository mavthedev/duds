import { auth, type Auth } from "$lib/auth";
import { handleHooks } from "@lucia-auth/sveltekit";
import { disableWarnings } from "@macfja/svelte-persistent-store";
import { sequence } from "@sveltejs/kit/hooks";
import type { RequestEvent } from '@sveltejs/kit';
import type { Session, User } from "lucia-auth";

disableWarnings()

function handleHooksHeader(header: string, auth: Auth) {
    return async ({ event, resolve }: { event: RequestEvent; resolve: (event: RequestEvent, options?: { transformPageChunk: (data: { html: string }) => string; }) => Promise<Response> | Response }) => {
        let getSessionPromise: Promise<Session | null> | undefined;
        let getSessionUserPromise: Promise<{ user: User; session: Session } | { user: null; session: null; }> | undefined;

        event.locals.Hvalidate = async () => {
            if (getSessionPromise) return getSessionPromise;
            if (getSessionUserPromise) return (await getSessionUserPromise).session;
            getSessionPromise = new Promise(async (resolve) => {
                try {
                    const sessionId = event.request.headers.get(header) || ""
                    const session = await auth.validateSession(sessionId)
                    resolve(session)
                } catch {
                    resolve(null)
                }
            })
            return await getSessionPromise
        };

        event.locals.HvalidateUser = async () => {
			if (getSessionUserPromise) return getSessionUserPromise;
			getSessionUserPromise = new Promise(async (resolve) => {
				try {
					auth.validateRequestHeaders(event.request);
					const sessionId = event.request.headers.get(header) || "";
					const { session, user } = await auth.validateSessionUser(sessionId);
					resolve({ session, user });
				} catch {
					resolve({
						session: null,
						user: null
					});
				}
			});
			return getSessionUserPromise;
		};

        return await resolve(event)
    }
}

export const handle = sequence(handleHooks(auth), handleHooksHeader('x-lucia-auth', auth));