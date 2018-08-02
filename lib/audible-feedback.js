import context from './context';
import sounds from './sounds';
import sound from './sound';

const audibleFeedback = (source, opts) => {
  if (typeof source === 'string') {
    // fetch it
  } else if (source instanceof ArrayBuffer) {
    return context.decodeAudioData(source).then(arrayBuffer => {
      const playableSound = sound(arrayBuffer, opts);
      sounds.push(playableSound);
      return playableSound;
    });
  } else {
    return Promise.reject('Unsupported source type passed to audibleFeedback');
  }
};

export default audibleFeedback;
