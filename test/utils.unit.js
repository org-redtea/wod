import chai from 'chai';
import {
  decodeMessage,
  encodeMessage
} from '../esnext/lib/utils';


const should = chai.should();

describe('test utils', () => {
  it('encodeMessage', () => {
    const prog = function a () {};
    const result = encodeMessage({prog, args: [1, 2, 3]});

    should.exist(result);
    should.exist(result.prog);
    should.exist(result.args);
    result.prog.should.be.a('string');
    result.prog.should.equal(prog.toString());
    result.args.should.to.deep.equal([1, 2, 3]);
  });

  it('decodeMessage', () => {
    const prog = function a () {};
    const result = decodeMessage({prog: prog.toString(), args: [1, 2, 3]});

    should.exist(result);
    should.exist(result.prog);
    should.exist(result.args);
    result.prog.should.be.a('function');
    result.prog.toString().should.equal(prog.toString());
    result.args.should.to.deep.equal([1, 2, 3]);
  });
});
