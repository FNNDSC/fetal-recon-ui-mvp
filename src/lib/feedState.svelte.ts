import type { Feed } from "$lib/types";

type FeedState = {
  current: Feed | "loading" | null;
};

let feed: FeedState = $state({
  current: null,
});

export { feed };
