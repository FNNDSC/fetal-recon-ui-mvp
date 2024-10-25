<script lang="ts">
import { selected } from "$lib/selectionState.svelte";

const study = $derived(selected.study);
</script>

<div>
  Selected AccessionNumber: {study?.AccessionNumber ?? 'none'}
</div>
