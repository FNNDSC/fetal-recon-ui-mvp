type FeedState = {
  id: number | null;
};

const feed: FeedState = $state({
  id: null,
});

export { feed };
