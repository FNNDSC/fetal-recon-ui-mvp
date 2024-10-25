<script lang="ts">
import type { Snippet } from "svelte";

const { topBar, main }: { [key: string]: Snippet } = $props();
</script>

<div class="h-full flex flex-col">
  <div>
    {@render topBar()}
  </div>
  <div class="flex-2 h-full">
    <main class="h-full">
      {@render main()}
    </main>
  </div>
</div>
