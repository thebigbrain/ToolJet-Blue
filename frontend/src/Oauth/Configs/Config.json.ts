export default {
  git: {
    name: "GitHub",
    responseType: "query",
    params: {
      token: "code",
    },
  },
  google: {
    name: "Google",
    responseType: "hash",
    params: {
      token: "id_token",
    },
  },
};
