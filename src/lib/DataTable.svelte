<script lang="ts">
import { untrack } from "svelte";
import type { NeuroFetalMrStudies$result } from "$houdini";
import { Accordion, AccordionItem, Tooltip } from "flowbite-svelte";
import Study from "$lib/Study.svelte";
import { format } from "date-fns";
type Props = {
  studies: NeuroFetalMrStudies$result["pacsfiles_pacsfile"];
};

const { studies }: Props = $props();
type State = {
  open: boolean;
  study: Props["studies"][0][0];
};
let states: State[] = $state([]);

// FIXME bad state syncing using $effect as a workaround.
// See https://github.com/themesberg/flowbite-svelte/issues/1469
$effect(() => {
  if (!studies || studies.length === 0) {
    untrack(() => {
      states = [];
    });
    return;
  }
  const nextState = studies.map((study) => ({ open: false, study }));
  nextState[0].open = true;
  untrack(() => {
    states = nextState;
  });
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
  {#each states as state (state.study.StudyInstanceUID)}
    {@const study = state.study }
    <AccordionItem
      class="group-first:rounded-none p-2"
      borderClass=""
      paddingDefault="p-2"
      bind:open={state.open}
    >
      <div slot="header" class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1">
        {@render studyInfo("MRN", study.PatientID)}
        {@render studyInfo("AccessionNumber", study.AccessionNumber || "unknown")}
        {@render studyInfo("Study Date", study.StudyDate ? format(study.StudyDate, "yyyy MMM dd") : "unknown")}
      </div>
      <Study />
    </AccordionItem>
  {/each}
</Accordion>
