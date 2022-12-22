<script>
	import { page } from "$app/stores";
	import { handleSession } from "@lucia-auth/sveltekit/client";
	handleSession(page, function data() {
		console.log(arguments)
	});

	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import Navbar from '$lib/components/Navbar.svelte';
	import Block from '$lib/components/Block.svelte';
</script>
<Navbar />
<slot />
