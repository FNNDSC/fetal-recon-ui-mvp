import { DicomFilesStore } from "$houdini";
import { basenameOf } from "$lib/helpers";

export async function GET(event): Response {
  const store = new DicomFilesStore();
  const { data } = await store.fetch({
    variables: event.params,
    event,
  });

  if (!data) {
    return new Response(null, { status: 404 });
  }

  const niivueManifest = data.pacsfile
    .map(({ id, fname }) => `../../file/${id}/${basenameOf(fname)}`)
    .join("\n");

  return new Response(niivueManifest, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
