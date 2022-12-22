import { get, writable } from 'svelte/store'
import { createLocalStorage, persist } from '@macfja/svelte-persistent-store'
import { browser } from '$app/environment'

type Theme = [string, string]

const theme = persist(writable<Theme>(["D", "U"]), createLocalStorage(true), "theme")
const scheme = persist(writable<boolean>(true), createLocalStorage(true), "scheme")

function name() {
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
    name
}