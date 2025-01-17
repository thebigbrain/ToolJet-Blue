export default {
  $schema: 'https://raw.githubusercontent.com/ToolJet/ToolJet/develop/plugins/schemas/operations.schema.json',
  title: 'ToolJetDb datasource',
  description: 'A schema defining TooljetDb datasource',
  type: 'database',
  defaults: {
    table_name: '',
    operation: 'operations',
  },
  properties: {
    operations: {
      label: '',
      key: 'tooljetdb_operations',
      type: 'tooljetdb-operations',
      description: 'Component for ToolJetDb operations',
    },
  },
};
