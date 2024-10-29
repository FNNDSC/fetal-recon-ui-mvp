function seriesFolderOf(fname: string) {
  const i = fname.lastIndexOf("/");
  return fname.substring(0, i);
}

function basenameOf(fname: string) {
  const i = fname.lastIndexOf("/");
  return fname.substring(i + 1);
}

export { seriesFolderOf, basenameOf };
