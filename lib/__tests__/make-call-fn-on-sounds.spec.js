import makeCallFnOnSounds from '../make-call-fn-on-sounds';
import sounds from '../sounds';

const TEST_FN_NAME = 'mute';

const mockSound = () => {
  const obj = {
    [TEST_FN_NAME]: () => {
      obj[TEST_FN_NAME].called = true;
    },
  };
  return obj;
};

const assertCalled = mock =>
  expect(mock[TEST_FN_NAME]).to.have.property('called', true);

const callFnOnSounds = makeCallFnOnSounds(TEST_FN_NAME);

describe('makeCallFnOnElements', () => {
  it('should call the given function on the elements of the passed array', () => {
    const arr = [mockSound(), mockSound()];
    callFnOnSounds(arr);
    arr.forEach(mock => assertCalled(mock));
  });
  it('should call the given function on a single object', () => {
    const mock = mockSound();
    callFnOnSounds(mock);
    assertCalled(mock);
  });
  it('should default to sounds if nothing was passed in', () => {
    const mock = mockSound();
    sounds.push(mock);
    callFnOnSounds();
    assertCalled(mock);
    sounds.pop();
  });
  it("should skip objects which don't have the specified function", () => {
    const arr = [1, 'hello', [], { [TEST_FN_NAME]: "don't call me!" }];
    callFnOnSounds(arr); // will throw an error if it fails
  });
});
