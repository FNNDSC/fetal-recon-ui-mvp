<script lang="ts">
import TiledWindow from "$lib/TiledWindow.svelte";
import type { Snippet } from "svelte";
type Props = {
  big: "a" | "b";
  a: Snippet;
  b: Snippet;
  c: Snippet;
};
let { big, a, b, c }: Props = $props();
let maximized: "a" | "b" | null = $state(null);
const BIG_CLASS = "row-span-2 lg:row-span-5 col-span-8 lg:col-span-5";
const SMALL_CLASS = "row-span-2 lg:row-span-4 col-span-8 lg:col-span-3";
const MAXIMIZED = "row-span-5 col-span-8";
const aClass = $derived.by(() => {
  if (maximized === "a") {
    return MAXIMIZED;
  }
  if (maximized) {
    return "hidden";
  }
  return big === "a" ? BIG_CLASS : `${SMALL_CLASS} lg:order-last`;
});
const bClass = $derived.by(() => {
  if (maximized === "b") {
    return MAXIMIZED;
  }
  if (maximized) {
    return "hidden";
  }
  return big === "b"
    ? `${BIG_CLASS} order-first`
    : `${SMALL_CLASS} lg:order-last`;
});
const cClass = $derived.by(() => {
  if (maximized) {
    return "hidden";
  }
  return "row-span-1 col-span-8 lg:col-span-3";
});
</script>

<!--
@component
A tiling manager which is hard-coded with three panes (a), (b), and (c) where:

- either (a) or (b) is "big", occupying the majority of the screen space.
- either (a) or (b) can be "maximized", occupying 100% of the screen space.
- (c) is put in a small tile which cannot be "big" nor "maximized."
-->
<div class="grid gap-4 grid-cols-8 grid-rows-5 {maximized ? 'h-full' : 'h-[125%]'} lg:h-full">
  <TiledWindow
    class={aClass}
    maximized={maximized === "a"}
    onMaximize={() => (maximized = "a")}
    onMinimize={() => (maximized = null)}
    ctrlHotkey="1"
  >
    {@render a()}
  </TiledWindow>
  <TiledWindow
    class={bClass}
    maximized={maximized === "b"}
    onMaximize={() => (maximized = "b")}
    onMinimize={() => (maximized = null)}
    ctrlHotkey="2"
  >
    {@render b()}
  </TiledWindow>
  <TiledWindow class={cClass}>
    {@render c()}
  </TiledWindow>
</div>
