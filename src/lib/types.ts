import type { NeuroFetalMrStudies$result } from "$houdini";

type Studies = NeuroFetalMrStudies$result["pacsfiles_pacsfile"];
type Study = Studies[0];

export type { Study };
