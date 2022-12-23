<script>
	import ascii from 'ascii-text-generator'
	import { page } from "$app/stores";
	import { handleSession } from "@lucia-auth/sveltekit/client";
	handleSession(page);

	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount } from 'svelte';
	onMount(() => {
		console.log(`%c${ascii("DUDS", "2")}`, "color: #007acc; font-size: 2em; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14);")
		console.log("%cIf you were told to paste something here, do not do it unless you know what you are doing!", "color: red; font-weight: 900; font-size: 2em;")
	})
</script>

<Navbar />
<slot />