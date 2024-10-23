import { $ } from "bun";
import * as path from "node:path";
import { existsSync } from "node:fs";

const URL =
  "https://github.com/user-attachments/files/17442096/mri_in_utero_neuro_dummy_dicoms.tar.gz";
const HERE = path.dirname(Bun.main);
const dataDir = path.join(HERE, "data");

if (!existsSync(dataDir)) {
  await $`mkdir ${dataDir}`;
  await $`curl -sSfL ${URL} | tar xz --directory=${dataDir}`;
}
