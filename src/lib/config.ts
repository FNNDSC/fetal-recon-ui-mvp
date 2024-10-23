import { env } from "$env/dynamic/public";

if (!env.CHRIS_UI) {
  throw new Error("Required environment variable CHRIS_UI is unset.");
}

const CHRIS_UI = env.CHRIS_UI;

const CONTACT_NAME = env.CHRIS_CONTACT_NAME ?? "FNNDSC Dev Team";
const CONTACT_EMAIL = env.CHRIS_CONTACT_EMAIL ?? "dev@babyMRI.org";
const CONTACT_MATRIX =
  env.CHRIS_CONTACT_MATRIX ?? "https://matrix.to/#/#chris-general:fedora.im";

export { CHRIS_UI, CONTACT_NAME, CONTACT_EMAIL, CONTACT_MATRIX };
