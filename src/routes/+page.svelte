<script lang="ts">
import "../app.css";
import TilingWm from "$lib/TilingWm.svelte";
import Scaffold from "$lib/Scaffold.svelte";
import TopBar from "$lib/TopBar.svelte";

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
    <TilingWm order={bigTile === "niivue" ? ['a', 'b', 'c'] : ['c', 'b', 'a']}>
      {#snippet a()}
        Recon NiiVue
      {/snippet}
      {#snippet b()}
        Stacks NiiVue
      {/snippet}
      {#snippet c()}
        Data table
      {/snippet}
    </TilingWm>
  {/snippet}
</Scaffold>


