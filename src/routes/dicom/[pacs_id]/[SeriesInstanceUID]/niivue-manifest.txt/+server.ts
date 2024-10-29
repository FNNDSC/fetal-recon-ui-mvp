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
    .map(parseSeries)
    .toSorted(compareSeries)
    .map(toUrl)
    .join("\n");

  return new Response(niivueManifest, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

type ParsedSeries = {
  id: number;
  basename: string;
  num: number;
};

function parseSeries({id, fname}: {id: number, fname: string}): ParsedSeries {
  const basename = basenameOf(fname);
  const num = parseInt(basename.substring(0, 4));
  return { id, basename, num };
}

function compareSeries(a: ParsedSeries, b: ParsedSeries): boolean {
  return a.num - b.num;
}

function toUrl({id, basename}: ParsedSeries): string {
  return `../../file/${id}/${basename}`;
}
