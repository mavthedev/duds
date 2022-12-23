<script lang=ts>
    import { user } from "$lib/state/store";
    import { onMount } from "svelte";
    onMount(() => {
        console.table($user)
    })
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
