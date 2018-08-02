import sounds from './sounds';

export default fnName => (soundsParam = sounds) => {
  const soundsToFnCallOn = Array.isArray(soundsParam)
    ? soundsParam
    : [soundsParam];
  soundsToFnCallOn
    .filter(s => s && typeof s[fnName] === 'function')
    .forEach(s => s[fnName]());
};
