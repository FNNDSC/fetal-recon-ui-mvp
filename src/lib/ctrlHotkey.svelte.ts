function ctrlHotkey(hotkey?: string, callback?: () => void) {
  let ctrlKeyDown = $state(false);
  return {
    get ctrlKeyDown() {
      return ctrlKeyDown;
    },
    onkeydown: (event: KeyboardEvent) => {
      if (event.key === "Control") {
        ctrlKeyDown = true;
      }
    },
    onkeyup: (event: KeyboardEvent) => {
      if (ctrlKeyDown && event.key === hotkey) {
        callback?.();
      } else if (event.key === "Control") {
        ctrlKeyDown = false;
      }
    },
  };
}

export default ctrlHotkey;
