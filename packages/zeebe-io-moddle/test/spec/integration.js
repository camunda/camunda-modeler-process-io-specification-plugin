import { expect } from 'chai';

import { BpmnModdle } from 'bpmn-moddle';

import ioModdle from 'zeebe-io-moddle/resources/ccon.json' with { type: 'json' };


describe('integration', function() {

  it('should extend bpmn-moddle', function() {

    // given
    var moddle = new BpmnModdle({
      ccon: ioModdle
    });

    // when
    var ioSpecification = moddle.create('ccon:IoSpecification');

    // then
    expect(ioSpecification.$instanceOf('Element')).to.be.true;
  });

});