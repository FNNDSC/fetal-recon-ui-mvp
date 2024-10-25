<script lang="ts">
import { selected } from "$lib/selectionState.svelte";
import { NeuroFetalMrSeriesStore } from "$houdini";

import { GradientButton } from "flowbite-svelte";
import runPipeline from "$lib/runPipeline";
import type { Series, Study } from "$lib/types";
import { feed } from "$lib/feedState.svelte";
import Scaffold from "$lib/Scaffold.svelte";

const study = $derived(selected.study);

const store = new NeuroFetalMrSeriesStore();

$effect(() => {
  if (selected.study) {
    const variables = {
      StudyInstanceUID: selected.study.StudyInstanceUID,
      pacs_id: selected.study.pacs_id,
    };
    store.fetch({ variables });
  }
});

const series = $derived.by(() => {
  const data = $store.data;
  if (!data) {
    return null;
  }
  return data.pacsfiles_pacsfile.map(({ SeriesDescription, fname }) => ({
    SeriesDescription,
    folder: seriesFolderOf(fname),
  }));
});

function seriesFolderOf(fname: string) {
  const i = fname.lastIndexOf("/");
  return fname.substring(0, i);
}

async function startPipeline(study: Study, series: ReadonlyArray<Series>) {
  feed.current = "loading";
  const created = await runPipeline(study, series);
  feed.current = created.feed;
}
</script>

<div class="size-full">
  {#if study}
    <Scaffold>
      {#snippet topBar()}
        <div class="p-1 dark:bg-gray-700">
          {study.StudyDescription} ({study.AccessionNumber})
        </div>
      {/snippet}
      {#snippet main()}
        {#if feed.current === "loading"}
          <div>Searching for feed in <em>ChRIS</em>&hellip;</div>
        {:else if feed.current !== null}
          <pre>
            {JSON.stringify(feed.current, undefined, 2)}
          </pre>
        {:else if series}
          <div class="size-full flex items-center justify-center">
            <GradientButton
              color="pinkToOrange"
              on:click={() => startPipeline(study, series)}
              class="place-content-center size-min"
            >
              Run&nbsp;Pipeline
            </GradientButton>
          </div>
        {:else}
          <div>Getting DICOM series from <em>ChRIS</em>&hellip;</div>
        {/if}
      {/snippet}
    </Scaffold>
  {/if}
</div>
