// audioContext.js
let audioContext;

export function getAudioContext() {
	if (!audioContext) {
		audioContext = new AudioContext();
	}
	return audioContext;
}
