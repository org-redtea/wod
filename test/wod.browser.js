const Wod = require("../umd");

describe("Wod test", () => {

  it("throw error", (done) => {
    const inst = new Wod.Wod();

    inst.on("error", (event) => {
      expect(event.type).to.equal('error');
      expect(event.message).to.equal('Uncaught error');
      done();
    });

    inst.exec(function() {
      throw 'error';
    });
  });

  it("normal execution", (done) => {
    const inst = new Wod.Wod();

    inst.on("message", (event) => {
      expect(event.data).to.equal('done');
      done();
    });

    inst.exec(function() {
      this.postMessage('done');
    });
  });

  it("provide arguments", (done) => {
    const inst = new Wod.Wod();

    inst.on("message", (event) => {
      expect(event.data).to.equal(6);
      done();
    });

    inst.exec(function(a, b, c) {
      this.postMessage(a + b + c);
    }, [1, 2, 3]);
  });

  it("terminate", (done) => {
    const inst = new Wod.Wod();

    inst.terminate();

    expect(inst.$thread).to.equal(null);
    done();
  });
});

describe('decorator', () => {
  it('should work', (done) => {
    const inst = new Wod.Wod();

    const funct = function(a) {
      this.postMessage('work' + a);
    };

    const dFunct = Wod.useThread(inst)(funct);

    inst.on("message", (event) => {
      expect(event.data).to.equal('work!');
      done();
    });

    dFunct('!');
  });
});
