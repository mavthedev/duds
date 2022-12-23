import { auth } from '$lib/auth'
import { error } from '@sveltejs/kit'
import type { RequestEvent, RequestHandler } from './$types'

export const GET: RequestHandler = async (event: RequestEvent) => {
    try {
        const sessionId = auth.validateRequestHeaders(event.request)
        if(!sessionId) return new Response(null)
        await auth.invalidateSession(sessionId)
        event.locals.setSession(null)
        return new Response(null)
    } catch {
        throw error(500, "Internal Error")
    }
}