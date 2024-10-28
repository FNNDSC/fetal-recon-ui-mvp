<!--
TODO

- pagination
- search
-->

<script lang="ts">
import { onMount } from "svelte";
import { NeuroFetalMrStudiesStore } from "$houdini";
import { Skeleton } from "flowbite-svelte";
import { CHRIS_UI } from "$lib/config";
import DataTable from "$lib/DataTable.svelte";

const store = new NeuroFetalMrStudiesStore();
const studies = $derived($store.data?.pacsfile);

onMount(() => {
  store.fetch();
});
</script>

  {#if $store.fetching}
    <Skeleton size="md" class="m-4" />
  {:else if $store.errors}
    <pre>{JSON.stringify($store.errors, undefined, 2)}</pre>
  {:else if !studies}
    <pre>BUG: studies is undefined.</pre>
  {:else if studies.length === 0}
    No relevant studies found. Please head to
    <a
      href="{CHRIS_UI}/pacs"
      class="text-primary-800 dark:text-primary-600"
    >
      <em>ChRIS_ui</em>
    </a>
    and pull some fetal MRI data.
  {:else}
    <DataTable studies={studies} />
  {/if}
