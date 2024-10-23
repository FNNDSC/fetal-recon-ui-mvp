<script lang="ts">
import { Kbd } from "flowbite-svelte";
import hotkeys from "$lib/ctrlHotkey.svelte";
import type { Snippet } from "svelte";

type Props = {
  maximized?: boolean;
  onMaximize?: () => void;
  onMinimize?: () => void;
  ctrlHotkey?: string;
  class?: string;
  children: Snippet;
} & { [key: string]: any };

let {
  ctrlHotkey,
  maximized,
  onMaximize,
  onMinimize,
  class: klass = "",
  children,
}: Props = $props();
let hk = hotkeys(ctrlHotkey, toggleMaximize);
let { onkeydown, onkeyup } = hk;
let ctrlKeyDown = $derived(hk.ctrlKeyDown);

function toggleMaximize() {
  if (maximized) {
    onMinimize?.();
  } else {
    onMaximize?.();
  }
}
</script>

<svelte:window {onkeydown} {onkeyup}/>

<div
  class={`outline outline-2 outline-gray-200 dark:outline-gray-700 rounded-md shadow ${klass}`}
>
  <div class="relative">
    {@render children()}
    {#if onMaximize}
      {@const color = maximized ? 'bg-yellow-400' : 'bg-green-500'}
      {@const hoverColor = maximized ? 'hover:bg-yellow-400 dark:hover:bg-yellow-400' : 'hover:bg-green-500 dark:hover:bg-green-500'}
      {@const grey = 'bg-gray-200 dark:bg-zinc-800'}
      <button
        onclick={toggleMaximize}
        class="size-3 rounded-full absolute top-2 right-2 {ctrlKeyDown ? color : grey} {hoverColor}"
        aria-label="maximize"
      ></button>
    {/if}
    {#if ctrlKeyDown && ctrlHotkey}
      <div class="absolute top-1 right-6">
        <div>
          <Kbd>Ctrl</Kbd>
          <span>+</span>
          <Kbd>{ctrlHotkey}</Kbd>
        </div>
      </div>
    {/if}
  </div>
</div>
