/*
 * Replace me with something better one day, like a chrs command...
 */

const SEARCH = {
  name: "Automatic Fetal Brain Reconstruction Pipeline v1.2.3",
};

const PATH =
  "./testing/Fetal_Brain_MRI_Reconstruction_Pipeline/fetal_brain_reconstruction_pipeline.yml";
const URL = "http://localhost:8000/api/v1/";

const headers = {
  Authorization: `Basic ${Buffer.from("chris:chris1234").toString("base64")}`,
  Accept: "application/json",
};

const qs = new URLSearchParams(SEARCH).toString();
const pipelinesReq = await fetch(`${URL}pipelines/search/?${qs}`, { headers });
if (!pipelinesReq.ok) {
  throw new Error(pipelinesReq.statusText);
}
const pipelines = await pipelinesReq.json();
if (pipelines.count === 0) {
  const formData = new FormData();
  const pipelineContent = await Bun.file(PATH).text();
  const blob = new Blob([pipelineContent], { type: "application/yaml" });
  formData.set("fname", blob, "DummyPipeline.yaml");
  formData.set("type", "yaml");
  const res = await fetch(`${URL}pipelines/sourcefiles/`, {
    method: "POST",
    body: formData,
    headers,
  });
  const pipeline = await res.json();
  if (!res.ok) {
    console.dir(pipeline);
    process.exit(1);
  }
  console.log(pipeline.url);
} else {
  console.log("already exists");
}
