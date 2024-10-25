<script lang="ts">
import type { NeuroFetalMrStudies$result } from "$houdini";
import { Accordion, AccordionItem, Tooltip } from "flowbite-svelte";
import { format } from "date-fns";
type Props = {
  studies: NeuroFetalMrStudies$result["pacsfiles_pacsfile"];
};

const { studies }: Props = $props();
</script>

<div class="hidden lg:block">
  <div class="grid gap-4 grid-cols-3 p-2 font-bold">
    <div>MRN</div>
    <div>AccessionNumber</div>
    <div>Study Date</div>
  </div>
</div>

<Accordion class="overflow-y-auto h-full rounded-none">
  {#each studies as study}
    <AccordionItem
      class="group-first:rounded-none p-2"
      borderClass=""
    >
      <div slot="header" class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="truncate">
          {study.PatientID}
        </div>
        <Tooltip>MRN:&nbsp;{study.PatientID}</Tooltip>
        <div class="truncate">
          {study.AccessionNumber || "unknown"}
        </div>
        <div>
          {study.StudyDate ? format(study.StudyDate, "yyyy MMM dd") : "unknown"}
        </div>

      </div>
    </AccordionItem>
  {/each}
</Accordion>
