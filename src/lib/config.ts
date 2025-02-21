import { env } from "$env/dynamic/public";
import { dev } from "$app/environment";

const PIPELINE_NAME =
  env.CHRIS_PIPELINE_NAME ??
  "Automatic Fetal Brain Reconstruction Pipeline v1.2.3";

const CHRIS_UI = getRequired("CHRIS_UI");

const CONTACT_NAME = env.CHRIS_CONTACT_NAME ?? "FNNDSC Dev Team";
const CONTACT_EMAIL = env.CHRIS_CONTACT_EMAIL ?? "dev@babyMRI.org";
const CONTACT_MATRIX =
  env.CHRIS_CONTACT_MATRIX ?? "https://matrix.to/#/#chris-general:fedora.im";

// WARNING! THIS PROJECT IS JUST A MVP, SO WE WILL HAVE SECRETS IN CLIENT-SIDE CODE!!!
const CHRIS_URL = getRequired("CHRIS_URL");
const CHRIS_USERNAME = getRequired("CHRIS_USERNAME");
const CHRIS_PASSWORD = getRequired("CHRIS_PASSWORD");
const CHRIS_GRAPHQL = getRequired("CHRIS_GRAPHQL");
const HASURA_AUTH: string | null =
  dev && !("CHRIS_HASURA_AUTH" in env)
    ? null
    : getRequired("CHRIS_HASURA_AUTH");

function getRequired(name: keyof typeof env): string {
  if (!env[name]) {
    throw new Error(`Required environment variable ${name} is unset`);
  }
  return env[name];
}

export {
  CHRIS_UI,
  CHRIS_URL,
  CONTACT_NAME,
  CONTACT_EMAIL,
  CONTACT_MATRIX,
  CHRIS_USERNAME,
  CHRIS_PASSWORD,
  CHRIS_GRAPHQL,
  HASURA_AUTH,
  PIPELINE_NAME,
};
