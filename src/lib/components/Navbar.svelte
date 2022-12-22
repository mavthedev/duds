<script>
  import Lightswitch from "./Lightswitch.svelte";
  import { AppBar } from '@skeletonlabs/skeleton';
  import { name } from "$lib/state/store";
</script>
<AppBar>
	<svelte:fragment slot="lead">{name()}</svelte:fragment>
	(center)
	<svelte:fragment slot="trail"><Lightswitch /></svelte:fragment>
</AppBar>