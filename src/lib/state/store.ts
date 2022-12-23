import { derived, get, writable, type Readable } from 'svelte/store'
import { createLocalStorage, persist } from '@macfja/svelte-persistent-store'
import { browser } from '$app/environment'
import { page } from '$app/stores'
import type { UserData } from 'lucia-auth'

type Theme = [string, string]

const theme = persist(writable<Theme>(["D", "U"]), createLocalStorage(true), "theme")
const scheme = persist(writable<boolean>(true), createLocalStorage(true), "scheme")
const user: Readable<{ 
    session: string,
} & UserData> = derived(page, (v) => {
    return {
        ...v.data._lucia.user,
        session: v.data.session?.sessionId
    }
})

function appName(t: Theme) {
    t // useless param to force svelte to be reactive
    return `${get(theme)[0]}${get(theme)[1]}${get(theme)[0]}`
}

scheme.subscribe((s) => {
    if(!browser) return
    const htmlElement = document.querySelector('html')
    // @ts-ignore
    s?htmlElement.classList.add('dark'):htmlElement.classList.remove('dark')
})

export {
    theme,
    scheme,
    user,
    appName
}