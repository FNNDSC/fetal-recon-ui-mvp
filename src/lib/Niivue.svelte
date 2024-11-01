<script lang="ts">
import SizedNiivue from "$lib/SizedNiivue";
import PlusOutline from "flowbite-svelte-icons/PlusOutline.svelte";
import { Tooltip } from "flowbite-svelte";
import { onMount } from "svelte";
import { SLICE_TYPE } from "@niivue/niivue";

type Props = {
  url: string;
  isManifest?: boolean;
  initialSlice?: SLICE_TYPE;
  initialCrosshairsShown?: boolean;
};

const {
  url,
  isManifest,
  initialSlice = SLICE_TYPE.MULTIPLANAR,
  initialCrosshairsShown = true,
}: Props = $props();

let canvas: HTMLCanvasElement;
const nv = new SizedNiivue({ sagittalNoseLeft: true });
nv.setRadiologicalConvention(true);
nv.opts.dragMode = nv.dragModes.measurement;
let notLoadedYet = true;

onMount(() => {
  (async () => {
    await nv.attachToCanvas(canvas);
    if (url && notLoadedYet) {
      notLoadedYet = false;
      await nv.loadVolumes([{ url, isManifest }]);
    }
  })();
});

$effect(() => {
  if (url && nv.canvas) {
    notLoadedYet = false;
    nv.loadVolumes([{ url, isManifest }]);
  }
});

const SLICE_TYPES = [
  { name: "Multi", value: nv.sliceTypeMultiplanar },
  { name: "Axial", value: nv.sliceTypeAxial },
  { name: "Coronal", value: nv.sliceTypeCoronal },
  { name: "Sagittal", value: nv.sliceTypeSagittal },
];

let sliceTypeIndex = $state(
  (() => {
    const i = SLICE_TYPES.findIndex(({ value }) => value === initialSlice);
    if (i === -1) {
      throw new Error(`Invalid prop value initialSlice=${initialSlice}`);
    }
    return i;
  })(),
);

function nextSliceType() {
  if (sliceTypeIndex === SLICE_TYPES.length - 1) {
    sliceTypeIndex = 0;
  } else {
    sliceTypeIndex += 1;
  }
}

$effect(() => {
  nv.setSliceType(SLICE_TYPES[sliceTypeIndex].value);
});

let hideCrosshair = $state(!initialCrosshairsShown);
$effect(() => {
  nv.setCrosshairHidden(hideCrosshair);
});
</script>

<div class="relative size-full">
  <canvas bind:this={canvas}>
  </canvas>
  <div class="absolute left-0 top-0 m-1 text-gray-200 dark:text-gray-200 flex flex-col gap-y-1">
    <div>
      <button onclick={nextSliceType}>
        {SLICE_TYPES[sliceTypeIndex].name}
      </button>
      <Tooltip placement="right">
        Change&nbsp;slice
      </Tooltip>
    </div>
    <div>
      <button class:text-gray-600={hideCrosshair} onclick={() => {hideCrosshair = !hideCrosshair}} >
        <PlusOutline  />
      </button>
      <Tooltip placement="right">
        {hideCrosshair ? "Show" : "Hide"}&nbsp;crosshairs
      </Tooltip>
    </div>
  </div>
</div>
