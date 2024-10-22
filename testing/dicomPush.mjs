import { $ } from 'bun';
import path from "node:path";

const IMAGE = 'quay.io/biocontainers/dcmtk:3.6.7--h92a7bdf_0';

const HERE = path.dirname(Bun.main);
const dataDir = path.join(HERE, 'data');

await $`docker run --rm --net=minichris-local -v ${dataDir}:/data:ro ${IMAGE} storescu +sd +r -aet STORESCU -aec ChRIS oxidicom 11111 /data`;
