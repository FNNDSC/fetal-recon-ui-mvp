<script lang="ts">
import type { Snippet } from "svelte";

const { topBar, main }: { [key: string]: Snippet } = $props();
</script>

<div class="h-full flex flex-col">
  <div>
    {@render topBar()}
  </div>
  <div class="flex-2 h-full">
    <main class="p-3 h-full">
      {@render main()}
    </main>
  </div>
</div>
