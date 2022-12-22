<script>
  import Lightswitch from "./Lightswitch.svelte";
  import { AppBar } from '@skeletonlabs/skeleton';
  import { name, theme } from "$lib/state/store";
</script>
<AppBar>
	<svelte:fragment slot="lead">{name($theme)}</svelte:fragment>
	(center)
	<svelte:fragment slot="trail"><Lightswitch /></svelte:fragment>
</AppBar>