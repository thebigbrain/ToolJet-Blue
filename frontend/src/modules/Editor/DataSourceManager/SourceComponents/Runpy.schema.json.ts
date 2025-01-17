export default {
  $schema: "https://json-schema.org/",
  $id: "https://tooljet.io/Runpy.schema.json",
  title: "Runpy datasource",
  description: "A schema defining runpy datasource",
  type: "object",
  source: {
    name: "Run Python",
    kind: "runpy",
    exposedVariables: {
      isLoading: false,
      data: {},
      rawData: {},
    },
    customTesting: true,
    disableTransformations: true,
  },
};
