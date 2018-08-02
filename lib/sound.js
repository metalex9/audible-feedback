import context from './context';

const play = (audioBuffer, gainNode) => {
  const sourceNode = context.createBufferSource();
  sourceNode.buffer = audioBuffer;
  sourceNode.connect(gainNode);
  sourceNode.start(0);
};

const setGainNodeToValue = (gainNode, val) => {
  gainNode.gain.value = val;
};

const mute = gainNode => {
  setGainNodeToValue(gainNode, 0);
};

const unmute = gainNode => {
  setGainNodeToValue(gainNode, 1);
};

export default (audioBuffer, { muted = false } = {}) => {
  const gainNode = context.createGain();
  gainNode.connect(context.destination);
  let isMuted = Boolean(muted);
  if (isMuted) {
    mute(gainNode);
  }
  return {
    play: () => play(audioBuffer, gainNode),
    mute: () => {
      isMuted = true;
      mute(gainNode);
    },
    unmute: () => {
      isMuted = false;
      unmute(gainNode);
    },
    isMuted: () => isMuted,
  };
};
