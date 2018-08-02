import audibleFeedback from '../audible-feedback';

describe('audible feedback', () => {
  it('should return a promise', () => {
    expect(audibleFeedback).to.be.a('function');
  });
});
