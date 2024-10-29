<script lang="ts">
import { seriesState } from "$lib/seriesState.svelte";

const SeriesInstanceUID = $derived(seriesState.SeriesInstanceUID);
</script>

<div>
  {SeriesInstanceUID}
</div>
