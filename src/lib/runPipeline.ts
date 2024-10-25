import {
  CHRIS_URL,
  CHRIS_USERNAME,
  CHRIS_PASSWORD,
  PIPELINE_NAME,
} from "$lib/config";
import type { FeedAndWorkflow, Study } from "$lib/types";
import CubeClient from "$lib/CubeClient";

async function runPipeline(
  study: Study,
  inputs: ReadonlyArray<{ folder: string }>,
): Promise<FeedAndWorkflow> {
  const client = new CubeClient(CHRIS_URL, CHRIS_USERNAME, CHRIS_PASSWORD);
  const paths = inputs.map((x) => x.folder);
  const dircopy = await client.runDircopy(paths);
  const [workflow, feed] = await Promise.all([
    client.createWorkflow(PIPELINE_NAME, dircopy, titleFor(study)),
    client.modifyFeedOf(
      dircopy,
      `Fetal brain MRI reconstruction (AccessionNumber: ${study.AccessionNumber})`,
      true,
    ),
  ]);
  return { workflow, feed };
}

function titleFor({ pacs_id, StudyInstanceUID }: Study) {
  return `fetal-recon-${pacs_id}-${StudyInstanceUID}`;
}

export default runPipeline;
