<!--
TODO GraphQL subscription - get updates for when workflow is done.
-->

<script lang="ts">
import { selected } from "$lib/selectionState.svelte";
import { NeuroFetalMrSeriesStore, WorkflowStateStore } from "$houdini";

import { GradientButton } from "flowbite-svelte";
import { runPipeline, titleFor } from "$lib/runPipeline";
import type { Series, Study } from "$lib/types";
import Scaffold from "$lib/Scaffold.svelte";
import { CHRIS_URL, PIPELINE_NAME } from "$lib/config";
import { format } from "date-fns";
import { feed } from "$lib/feedState.svelte";
import NiiVue from "$lib/NiiVue.svelte";
import {browser} from "$app/environment";

const study = $derived(selected.study);

const seriesStore = new NeuroFetalMrSeriesStore();
const workflowStore = new WorkflowStateStore();

const plugininstances = $derived.by(() => {
  if (!$workflowStore.data) {
    return null;
  }
  return $workflowStore.data.workflow.flatMap((w) => w.plugin_instances);
});
const reconNii = $derived.by(() => {
  if (!plugininstances) {
    return null;
  }
  const files = plugininstances.flatMap((p) => p.files);
  return files[files.length - 1];
});
const reconNiiUrl = $derived.by(() => {
  if (!reconNii) {
    return;
  }
  const { id, fname } = reconNii;
  const basename = basenameOf(fname);
  return `${CHRIS_URL}files/${id}${basename}`;
});

$effect(() => {
  (async () => {
    if (selected.study === null) {
      return;
    }
    await fetchWorkflow(selected.study);
    if (plugininstances?.length === 0) {
      await fetchSeries(selected.study);
    }
  })();
});

async function fetchWorkflow(study: Study) {
  const variables = {
    title: titleFor(study),
    pipeline: PIPELINE_NAME,
  };
  const workflows = await workflowStore.fetch({
    variables,
    policy: "NetworkOnly",
  });
  // SMELL: global state syncing
  const feedId = workflows.data?.workflow.flatMap((w) => w.plugin_instances)[0]
    ?.feed_id;
  if (feedId) {
    feed.id = feedId;
  }
  return workflows;
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
  return data.pacsfile.map(({ SeriesDescription, fname }) => ({
    SeriesDescription,
    folder: seriesFolderOf(fname),
  }));
});

function seriesFolderOf(fname: string) {
  const i = fname.lastIndexOf("/");
  return fname.substring(0, i);
}

function basenameOf(fname: string) {
  const i = fname.lastIndexOf("/");
  return fname.substring(i);
}

const STATUSES = {
  waiting: new Set(["created", "waiting", "scheduled"]),
  running: new Set(["started", "registeringFiles"]),
  success: new Set(["finishedSuccessfully"]),
  error: new Set(["finishedWithError"]),
  cancelled: new Set(["cancelled"]),
};

const currentStatuses: ReadonlyArray<{
  status: keyof typeof STATUSES;
  count: number;
}> | null = $derived.by(() => {
  if (!plugininstances || plugininstances.length === 0) {
    return null;
  }
  const statuses = plugininstances.map((p) => p.status);
  return (Object.entries(STATUSES) as [keyof typeof STATUSES, Set<string>][])
    .map(([status, match]) => ({
      status,
      count: statuses.filter((s) => match.has(s)).length,
    }))
    .filter(({ count }) => count > 0);
});

const startDate = $derived.by(() => {
  if (!plugininstances || plugininstances.length === 0) {
    return null;
  }
  return plugininstances[0].start_date;
});

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
        {:else if reconNiiUrl}
          {#if browser}
            <NiiVue url={reconNiiUrl} />
          {/if}
        {:else if currentStatuses}
          <p>
            {#if (currentStatuses.find((s) => s.status === "error")?.count ?? 0) > 0}
              The pipeline had an error.
            {:else}
              The pipeline is currently running, please check back later.
            {/if}
          </p>
          <ul>
            {#if startDate}
              <ul>Started at: {format(startDate, "yyyy MMM dd HH:mm:ss")}</ul>
            {/if}
            {#each currentStatuses as {status, count}}
              <li>{status}: {count}</li>
            {/each}
          </ul>
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
