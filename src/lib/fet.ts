import { browser } from '$app/environment'
import { get } from 'svelte/store'
import { user } from '$lib/state/store'


type Fetch = {
    headers?: HeadersInit | undefined,
    body?: BodyInit | null | undefined,
    method: "GET" | "OPTIONS" | "POST" | "PUT" | "PATCH" | "DELETE"
}

export default async function fet(input: RequestInfo | URL, init: Fetch): Promise<Response> {
    if(!browser) throw new Error('No browser detected')
    const { method, body, headers } = init
    return await fetch(input, {
        method,
        body,
        headers: {
            ...headers,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "x-lucia-auth": get(user).session,
        }
    })
}