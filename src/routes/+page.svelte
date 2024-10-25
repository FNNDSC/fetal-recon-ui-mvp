<script lang="ts">
import "../app.css";
import TilingWm from "$lib/TilingWm.svelte";
import Scaffold from "$lib/Scaffold.svelte";
import TopBar from "$lib/TopBar.svelte";
import DataPanel from "$lib/DataPanel.svelte";
import ReconPanel from "$lib/ReconPanel.svelte";

let bigTile: "niivue" | "datatable" = $state("datatable");

function toggleBigTile() {
  if (bigTile === "niivue") {
    bigTile = "datatable";
  } else {
    bigTile = "niivue";
  }
}
</script>

<Scaffold>
  {#snippet topBar()}
    <TopBar bigTile={bigTile} toggleBig={toggleBigTile} ctrlHotkey="0" />
  {/snippet}
  {#snippet main()}
    <div class="p-2 size-full">
      <TilingWm order={bigTile === "niivue" ? ['a', 'b', 'c'] : ['c', 'b', 'a']} class="p-2">
        {#snippet a()}
          <ReconPanel />
        {/snippet}
        {#snippet b()}
          Stacks NiiVue
        {/snippet}
        {#snippet c()}
          <DataPanel />
        {/snippet}
      </TilingWm>
    </div>
  {/snippet}
</Scaffold>


