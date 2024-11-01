<script lang="ts">
import { seriesState } from "$lib/seriesState.svelte";
import { selected } from "$lib/selectionState.svelte";
import Niivue from "$lib/Niivue.svelte";
import { SLICE_TYPE } from "@niivue/niivue";

const SeriesInstanceUID = $derived(seriesState.SeriesInstanceUID);
const pacs_id = $derived(selected.study?.pacs_id);

const manifestUrl = $derived(
  SeriesInstanceUID &&
    pacs_id &&
    `/dicom/${pacs_id}/${SeriesInstanceUID}/niivue-manifest.txt`,
);
</script>

<div class="size-full">
  {#if manifestUrl}
    <Niivue
      isManifest
      url={manifestUrl}
      initialSlice={SLICE_TYPE.SAGITTAL}
      initialCrosshairsShown={false}
    />
  {/if}
</div>
