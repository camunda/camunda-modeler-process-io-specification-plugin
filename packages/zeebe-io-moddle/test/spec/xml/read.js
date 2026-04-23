import {
  expect
} from '../../expect.js';

import {
  readFile,
  createModdle
} from '../../helper.js';


describe('read', function() {

  describe('should read extensions', function() {

    var moddle;

    beforeEach(function() {
      moddle = createModdle();
    });


    describe('ccon:IoSpecification', function() {

      it('on StartEvent', async function() {

        // given
        var xml = readFile('test/fixtures/xml/startEvent-ioSpecification.part.bpmn');

        // when
        const {
          rootElement: startEvent
        } = await moddle.fromXML(xml, 'bpmn:StartEvent');

        // then
        expect(startEvent).to.jsonEqual({
          $type: 'bpmn:StartEvent',
          id: 'start_via_agent',
          extensionElements: {
            $type: 'bpmn:ExtensionElements',
            values: [
              {
                $type: 'ccon:IoSpecification',
                inputs: [
                  {
                    $type: 'ccon:InputSpecification',
                    name: 'firstName',
                    description: 'The first name',
                    type: 'string',
                    required: false,
                    schema: ''
                  },
                  {
                    $type: 'ccon:InputSpecification',
                    name: 'lastName',
                    description: 'The last name of the user to withdraw money for',
                    type: 'string',
                    required: true,
                    schema: ''
                  },
                  {
                    $type: 'ccon:InputSpecification',
                    name: 'amount',
                    description: 'The amount to withdraw',
                    type: 'integer',
                    required: true,
                    schema: ''
                  }
                ]
              },

            ]
          }
        });
      });

    });

  });

});
