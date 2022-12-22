import { writable } from 'svelte/store'
import { createLocalStorage, persist } from '@macfja/svelte-persistent-store'

type Theme = {
    scheme: boolean,
    letters: [string, string]
}

const theme = persist(writable<Theme>({
    scheme: true, // dark by default
    letters: ["D", "U"]
}), createLocalStorage(true), "theme")