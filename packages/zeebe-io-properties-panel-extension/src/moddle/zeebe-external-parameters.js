export default {
  name: 'ZeebeExternalParametersExtension',
  prefix: 'specext',
  uri: 'http://camunda.org/schema/spec-extension/1.0',
  xml: {
    tagAlias: 'lowerCase'
  },
  associations: [],
  types: [
    {
      name: 'ExternalParameters',
      superClass: [ 'Element' ],
      properties: [
        {
          name: 'inputSpecification',
          type: 'InputSpecification',
          isMany: true,
          xml: { serialize: 'asElement' }
        }
      ]
    },
    {
      name: 'InputSpecification',
      superClass: [ 'Element' ],
      properties: [
        { name: 'name', isAttr: true, type: 'String' },
        { name: 'description', isAttr: true, type: 'String' },
        { name: 'type', isAttr: true, type: 'String' },
        { name: 'required', isAttr: true, type: 'Boolean' },
        { name: 'schema', isAttr: true, type: 'String' }
      ]
    }
  ],
  enumerations: []
};
