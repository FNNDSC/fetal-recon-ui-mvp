import type { Study } from "$lib/types";

type SelectionState = {
  study: Study | null;
};

const selected: SelectionState = $state({
  study: null,
});

/**
 * An object which provides a bind-able field conveying whether
 * this study is the currently selected one.
 *
 * See https://github.com/themesberg/flowbite-svelte/issues/1469#issuecomment-2438530187
 */
class OpenState {
  private readonly study: Study;
  constructor(study: Study) {
    this.study = study;
  }
  get open() {
    return selected.study?.StudyInstanceUID === this.study.StudyInstanceUID;
  }
  set open(x: boolean) {
    if (x) {
      selected.study = this.study;
    }
  }
}

export { selected, OpenState };
