<script>
  import Lightswitch from "./Lightswitch.svelte";
  import { AppBar } from '@skeletonlabs/skeleton';
  import { appName, theme } from "$lib/state/store";
</script>
<AppBar>
	<svelte:fragment slot="lead">{appName($theme)}</svelte:fragment>
	
	<svelte:fragment slot="trail"><Lightswitch /></svelte:fragment>
</AppBar>