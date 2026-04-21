import { expect } from 'chai';

import ioModdle from 'zeebe-io-moddle/resources/ccon.json' with { type: 'json' };


describe('descriptor', function() {

  it('should provide model', function() {

    // then
    expect(ioModdle).to.exist;

    expect(ioModdle.uri).to.eql('http://ccon.camunda.io');
    expect(ioModdle.prefix).to.eql('ccon');
  });

});