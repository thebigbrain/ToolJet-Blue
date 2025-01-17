export default {
  $schema:
    "https://raw.githubusercontent.com/ToolJet/ToolJet/develop/plugins/schemas/manifest.schema.json",
  title: "ToolJetDb datasource",
  description: "A schema defining TooljetDb datasource",
  type: "database",
  source: {
    name: "ToolJetDb",
    kind: "tooljetdb",
    exposedVariables: {
      isLoading: false,
      data: [],
      rawData: [],
    },
    options: {},
  },
  defaults: {},
  properties: {},
};
