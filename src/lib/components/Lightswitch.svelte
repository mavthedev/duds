<script lang="ts">
    import { scheme } from "$lib/state/store";
    import { SlideToggle } from '@skeletonlabs/skeleton'
</script>

<SlideToggle bind:checked={$scheme}></SlideToggle>