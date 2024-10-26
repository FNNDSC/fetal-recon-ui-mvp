<!--
TODO GraphQL subscription - get updates for when workflow is done.
-->

<script lang="ts">
import { selected } from "$lib/selectionState.svelte";
import { NeuroFetalMrSeriesStore, WorkflowStateStore } from "$houdini";

import { GradientButton } from "flowbite-svelte";
import {runPipeline, titleFor} from "$lib/runPipeline";
import type { Series, Study } from "$lib/types";
import Scaffold from "$lib/Scaffold.svelte";

const study = $derived(selected.study);

const seriesStore = new NeuroFetalMrSeriesStore();
const workflowStore = new WorkflowStateStore();

const plugininstances = $derived.by(() => {
  if (!$workflowStore.data) {
    return null;
  }
  return $workflowStore.data.workflows.flatMap((w) => w.plugininstances);
})

$effect(() => {
  (async () => {
    if (selected.study === null) {
      return;
    }
    const workflows = await fetchWorkflow(selected.study);
    if (plugininstances?.length === 0) {
      await fetchSeries(selected.study);
    }
  })();
});

function fetchWorkflow(study: Study) {
  const variables = {
    title: titleFor(study)
  };
  return workflowStore.fetch({variables});
}

function fetchSeries(study: Study) {
  const variables = {
    StudyInstanceUID: study.StudyInstanceUID,
    pacs_id: study.pacs_id,
  };
  return seriesStore.fetch({ variables });
}

const series = $derived.by(() => {
  const data = $seriesStore.data;
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

let creatingWorkflow = $state(false);

async function startPipeline(study: Study, series: ReadonlyArray<Series>) {
  creatingWorkflow = true;
  await runPipeline(study, series);
  const fetchWorkflowPromise = fetchWorkflow(study);
  creatingWorkflow = false;
  await fetchWorkflowPromise;
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
        {#if creatingWorkflow}
          <div>Running pipeline&hellip;</div>
        {:else if $workflowStore.errors && $workflowStore.errors.length > 0}
          <div>
            Error: {JSON.stringify($workflowStore.errors)}
          </div>
        {:else if $workflowStore.fetching}
          <div>Searching for feed in <em>ChRIS</em>&hellip;</div>
        {:else if plugininstances?.length && plugininstances.length > 0}
          <pre>
            {JSON.stringify(plugininstances, undefined, 2)}
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
