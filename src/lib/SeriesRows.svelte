<script lang="ts">
import { NeuroFetalMrSeriesStore } from "$houdini";
import { onMount } from "svelte";
import { seriesState } from "$lib/seriesState.svelte";

type Props = {
  pacs_id: number;
  StudyInstanceUID: string;
};
const { pacs_id, StudyInstanceUID }: Props = $props();
const store = new NeuroFetalMrSeriesStore();

onMount(() => {
  const variables = { pacs_id, StudyInstanceUID };
  (async () => {
    const {data} = await store.fetch({ variables, policy: "CacheOrNetwork" });
    if (data && data.pacsfile.length > 0) {
      seriesState.SeriesInstanceUID = data.pacsfile[0].SeriesInstanceUID;
    }
  })();
});
</script>

{#if $store.errors}
  Error: {JSON.stringify($store.errors)}
{:else if $store.fetching}
  Loading
{:else if $store.data}
  <div class="flex flex-col gap-y-1">
    {#each $store.data.pacsfile as series}
      <button
        class="text-left p-1 text-neutral-700 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-zinc-700 {series.SeriesInstanceUID === seriesState.SeriesInstanceUID && 'font-semibold text-neutral-800 dark:text-neutral-200 bg-gray-100 dark:bg-zinc-800'}"
        onclick={() => { seriesState.SeriesInstanceUID = series.SeriesInstanceUID; }}
      >
        {series.SeriesDescription}
      </button>
    {/each}
  </div>
{:else}
  BUG: <code>$store.data</code> is nullish
{/if}
