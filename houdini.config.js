/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
  watchSchema: {
    url: "http://localhost:8090/v1/graphql",
  },
  plugins: {
    "houdini-svelte": {},
  },
  scalars: {
    date: {
      type: "Date",
      unmarshal(val) {
        return val ? new Date(val) : null;
      },
    },
    bigint: {
      type: "number",
      unmarshal: parseInt,
      // marshal: (i) => i
    },
  },
};

export default config;
