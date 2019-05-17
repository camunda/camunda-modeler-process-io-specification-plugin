# Camunda Modeler Process I/O Specification Plug-in

[![Compatible with Camunda Modeler version 3](https://img.shields.io/badge/Camunda%20Modeler-3+-blue.svg)](https://github.com/camunda/camunda-modeler)

This [Camunda Modeler Plugin](https://github.com/camunda/camunda-modeler) adds the ability to document required inputs and produced outputs of a BPMN 2.0 process. To do that it adds a `I/O Specification` tab to the BPMN editor properties panel.

![Screenshot](./docs/screenshot.png)


## Details

The input and output mappings are not to be confused with [Camunda Input/Output variable mappings](https://docs.camunda.org/manual/latest/user-guide/process-engine/variables/#input-output-variable-mapping).

The meta-data is stored directly within the BPMN 2.0 diagram:

```xml
<bpmn:process id="process" isExecutable="true">
  <bpmn:extensionElements>
    <camunda:properties>
      <camunda:property name="input:orderNumber" value="int;The order number" />
      <camunda:property name="input:customerName" value="String;The customer's name" />
      <camunda:property name="output:billingAmount" value="double;The sum the customer has to pay" />
    </camunda:properties>
  </bpmn:extensionElements>
 ...
</bpmn:process>
```

It has __no execution semantics__ but may be read during process execution, i.e. via execution or BPMN parse listeners registered with the engine.


## Building

Install dependencies:

```sh
npm install
```

Package plugin to `client/client-bundle.js`:

```sh
npm run bundle

# or

npm run bundle:watch
```


## Additional Resources

* [Plugins documentation](https://github.com/camunda/camunda-modeler/tree/master/docs/plugins)


## Licence

MIT
