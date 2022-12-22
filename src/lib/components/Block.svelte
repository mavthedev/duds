<script lang=ts>
    export let value: string = ""
    $: {
        if(value.length > 1) throw new Error("Blocks cannot be more than 1 character")
    }
</script>

<div class="rounded-none border-primary-200-700-token flex justify-center items-center h-10 w-10 border-2">
    {value}
</div>