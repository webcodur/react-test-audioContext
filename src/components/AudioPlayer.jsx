// AudioPlayer.js
import { useEffect } from 'react';
import { getAudioContext } from './audioContext';

const AudioPlayer = ({ fileName }) => {
	useEffect(() => {
		const play = async () => {
			const audioContext = getAudioContext();

			// AudioContext가 "suspended" 상태인 경우 resume을 시도합니다.
			if (audioContext.state === 'suspended') {
				await audioContext.resume();
			}

			const response = await fetch(`/audio/${fileName}`);
			const arrayBuffer = await response.arrayBuffer();
			const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

			const sourceNode = audioContext.createBufferSource();
			sourceNode.buffer = audioBuffer;
			sourceNode.connect(audioContext.destination);
			sourceNode.start();

			// 재생이 끝나면 자원을 해제합니다.
			sourceNode.onended = () => sourceNode.disconnect();
		};

		play().catch((error) => console.error('Error playing audio:', error));
	}, [fileName]);

	return null;
};

export default AudioPlayer;
