<script lang="ts">
import "../app.css";
import TilingWm from "$lib/TilingWm.svelte";
import Scaffold from "$lib/Scaffold.svelte";
import TopBar from "$lib/TopBar.svelte";

let bigTile: "niivue" | "datatable" = $state("niivue");

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
    <TilingWm big={bigTile === "niivue" ? "a" : "b"}>
      {#snippet a()}
        NiiVue component
      {/snippet}
      {#snippet b()}
        Data table
      {/snippet}
      {#snippet c()}
        Fun statistics
      {/snippet}
    </TilingWm>
  {/snippet}
</Scaffold>


