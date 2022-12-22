<script>
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
  import Navbar from '$lib/components/Navbar.svelte';
</script>
<Navbar />
<slot />
