<script lang="ts">
import {
  DarkMode,
  Kbd,
  Modal,
  Navbar,
  NavBrand,
  NavHamburger,
  NavLi,
  NavUl,
} from "flowbite-svelte";
import Logo from "$lib/Logo.svelte";
import { CHRIS_UI } from "$lib/config";
import About from "$lib/About.svelte";
import { BrainSolid, TableColumnOutline } from "flowbite-svelte-icons";
import hotkeys from "$lib/ctrlHotkey.svelte";

let showAbout = $state(false);

type Props = {
  bigTile: "niivue" | "datatable";
  toggleBig: () => void;
  ctrlHotkey?: string;
};
let { bigTile, toggleBig, ctrlHotkey }: Props = $props();

let hk = hotkeys(ctrlHotkey, toggleBig);
let { onkeydown, onkeyup } = hk;
let ctrlKeyDown = $derived(hk.ctrlKeyDown);
</script>

<svelte:window {onkeydown} {onkeyup} />

<Navbar class="dark:bg-zinc-950 dark:text-white">
  <NavBrand href="/">
    <img alt="ChRIS Logo" class="size-11 m-2" src="/ChRISlogo-white.svg"/>
    <Logo/>
  </NavBrand>
  <NavHamburger />
  <NavUl>
    <!--
        note: styling is broken if hamburger menu is expanded.
        See https://github.com/themesberg/flowbite-svelte/issues/1467
    -->
    <NavLi
      class="cursor-pointer"
      on:click={() => (showAbout = true)}
    >
      About
    </NavLi>
    <NavLi href={CHRIS_UI}>
      Back to <em>ChRIS</em>
    </NavLi>
    <NavLi>
      <button onclick={toggleBig}>
        {#if ctrlKeyDown && ctrlHotkey}
          <div class="relative">
            <div class="absolute top-5 -right-2 w-16">
              <Kbd>Ctrl</Kbd>
              <span>+</span>
              <Kbd>{ctrlHotkey}</Kbd>
            </div>
          </div>
        {/if}

        {#if bigTile === "niivue"}
          <BrainSolid/>
        {:else }
          <TableColumnOutline/>
        {/if}
      </button>
    </NavLi>
    <NavLi>
      <DarkMode class="p-0"/>
    </NavLi>
  </NavUl>
</Navbar>

<Modal
  autoclose
  bind:open={showAbout}
  class="dark:bg-zinc-800 dark:text-white"
  classHeader="dark:bg-zinc-900 dark:text-white"
  title="About">
  <About/>
</Modal>
