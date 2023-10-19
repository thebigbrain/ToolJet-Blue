export default {
  $schema: "https://json-schema.org/",
  $id: "https://tooljet.io/Runjs.schema.json",
  title: "Runjs datasource",
  description: "A schema defining runjs datasource",
  type: "object",
  source: {
    name: "Run JavaScript",
    kind: "runjs",
    exposedVariables: {
      isLoading: false,
      data: {},
      rawData: {},
    },
    customTesting: true,
    disableTransformations: true,
  },
};