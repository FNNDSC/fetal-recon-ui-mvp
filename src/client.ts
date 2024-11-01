import { HoudiniClient } from "$houdini";

import { CHRIS_GRAPHQL, HASURA_AUTH } from "$lib/config";

export default new HoudiniClient({
  url: CHRIS_GRAPHQL,

  // uncomment this to configure the network call (for things like authentication)
  // for more information, please visit here: https://www.houdinigraphql.com/guides/authentication
  fetchParams() {
    if (HASURA_AUTH) {
      return {
        headers: {
          Authorization: HASURA_AUTH,
        },
      };
    }
    return {};
  },
});
