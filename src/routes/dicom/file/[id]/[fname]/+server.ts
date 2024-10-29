import { CHRIS_URL, CHRIS_USERNAME, CHRIS_PASSWORD } from "$lib/config";

export async function GET({ params: { id, fname } }): Response {
  const url = `${CHRIS_URL}pacsfiles/${id}/${fname}`;
  const headers = {
    Authorization: `Basic ${btoa(`${CHRIS_USERNAME}:${CHRIS_PASSWORD}`)}`,
    Accept: "application/dicom",
  };
  return await fetch(url, { headers });
}
