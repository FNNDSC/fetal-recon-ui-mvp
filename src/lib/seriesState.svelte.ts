type SeriesState = {
  SeriesInstanceUID: string | null;
};

const seriesState: SeriesState = $state({
  SeriesInstanceUID: null,
});

export { seriesState };
