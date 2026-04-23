import { expect } from 'chai';

import {
  createModdle,
  normalizeWhitespace
} from '../../helper.js';


describe('write', function() {

  var moddle = createModdle();


  async function write(element, options = {}) {

    const { xml } = await moddle.toXML(element, {
      ...options,
      preamble: false
    });

    return xml;
  }


  describe('should write extensions', function() {

    it('ccon:IoSpecification', async function() {

      // given
      var ioSpecification = moddle.create('ccon:IoSpecification', {
        inputs: [
          moddle.create('ccon:InputSpecification', {
            name: 'name',
            type: 'string',
            required: false
          })
        ]
      });

      var extensionElements = moddle.create('bpmn:ExtensionElements', {
        values: [
          ioSpecification
        ]
      });

      var startEvent = moddle.create('bpmn:StartEvent', {
        extensionElements
      });

      const expectedXML = normalizeWhitespace(`
        <bpmn:startEvent xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:ccon="http://ccon.camunda.io">
          <bpmn:extensionElements>
            <ccon:ioSpecification>
              <ccon:inputSpecification name="name" type="string" required="false" />
            </ccon:ioSpecification>
          </bpmn:extensionElements>
        </bpmn:startEvent>
      `);

      // when
      const xml = await write(startEvent);

      // then
      expect(xml).to.eql(expectedXML);
    });

  });

});
