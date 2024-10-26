<script lang="ts">
import TiledWindow from "$lib/TiledWindow.svelte";
import type { Snippet } from "svelte";

type OrderList = ["a" | "b" | "c", "a" | "b" | "c", "a" | "b" | "c"];
type Props = { [key: string]: string } & {
  a: Snippet;
  b: Snippet;
  c: Snippet;
  order?: OrderList;
};
let { order = ["a", "b", "c"], a, b, c }: Props = $props();
let maximized: "a" | "b" | "c" | null = $state(null);

const GRID = "grid gap-4 grid-cols-12 grid-rows-12";
/** Top half of screen on mobile, majority left half of screen on desktop */
const BIG_CLASS = "row-span-4 lg:row-span-12 col-span-12 lg:col-span-7";
/** Bottom half of screen on mobile, one quadrant of screen on desktop */
const SMALL_CLASS = "row-span-4 lg:row-span-6 col-span-12 lg:col-span-5";
/** Occupies the entire grid */
const MAXIMIZED_CLASS = "row-span-12 col-span-12";

const getClassFor = $derived((x: "a" | "b" | "c") => {
  switch (order.indexOf(x)) {
    case 0:
      return `${BIG_CLASS} order-1`;
    case 1:
      return `${SMALL_CLASS} order-2`;
    case 2:
      return `${SMALL_CLASS} order-3`;
    default:
      return "hidden";
  }
});

const classes = $derived.by(() => {
  if (maximized) {
    const classes = {
      a: "hidden",
      b: "hidden",
      c: "hidden",
    };
    classes[maximized] = MAXIMIZED_CLASS;
    return classes;
  }

  const KEYS: OrderList = ["a", "b", "c"];
  return Object.fromEntries(KEYS.map((x) => [x, getClassFor(x)]));
});
</script>

<!--
@component
A tiling manager which is hard-coded with three panes (a), (b), and (c).
-->
<div class="{GRID} {maximized ? 'h-full' : 'h-[125%]'} lg:h-full">
  <TiledWindow
    class={classes.a}
    ctrlHotkey="1"
    maximized={maximized === "a"}
    onMaximize={() => (maximized = "a")}
    onMinimize={() => (maximized = null)}
  >
    {@render a()}
  </TiledWindow>
  <TiledWindow
    class={classes.b}
    ctrlHotkey="2"
    maximized={maximized === "b"}
    onMaximize={() => (maximized = "b")}
    onMinimize={() => (maximized = null)}
  >
    {@render b()}
  </TiledWindow>
  <TiledWindow
    class={classes.c}
    ctrlHotkey="3"
    maximized={maximized === "c"}
    onMaximize={() => (maximized = "c")}
    onMinimize={() => (maximized = null)}
  >
    {@render c()}
  </TiledWindow>
</div>
