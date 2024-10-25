<script lang="ts">
import type { Study } from "$lib/types";
import { Accordion, AccordionItem, Tooltip } from "flowbite-svelte";
import SeriesRows from "$lib/SeriesRows.svelte";
import { format } from "date-fns";
import { selected, OpenState } from "$lib/selectionState.svelte";
import { onMount } from "svelte";
type Props = {
  studies: Study[];
};

const { studies }: Props = $props();
const states = $derived(studies.map((s) => new OpenState(s)));

onMount(() => {
  selected.study = studies[0] ?? null;
});
</script>

<div class="hidden md:block">
  <div class="grid gap-x-4 grid-cols-3 p-2 font-bold">
    <div>MRN</div>
    <div>AccessionNumber</div>
    <div>Study Date</div>
  </div>
</div>

{#snippet studyInfo(name, value)}
  <div class="flex">
    <div class="flex-none text-neutral-600 dark:text-neutral-400 md:hidden">
      {name}:&nbsp;
    </div>
    <div class="flex-1 truncate text-neutral-800 dark:text-neutral-200 md:text-neutral-700 dark:md:text-neutral-300">
      {value}
    </div>
  </div>
  <Tooltip>{name}:&nbsp;{value}</Tooltip>
{/snippet}

<Accordion class="overflow-y-auto h-full rounded-none">
  {#each studies as study, i (study.StudyInstanceUID)}
    <AccordionItem
      class="group-first:rounded-none p-2"
      borderClass=""
      paddingDefault="p-2"
      bind:open={states[i].open}
    >
      <div slot="header" class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1 size-full">
        {@render studyInfo("MRN", study.PatientID)}
        {@render studyInfo("AccessionNumber", study.AccessionNumber || "unknown")}
        {@render studyInfo("Study Date", study.StudyDate ? format(study.StudyDate, "yyyy MMM dd") : "unknown")}
      </div>
      <SeriesRows />
    </AccordionItem>
  {/each}
</Accordion>
