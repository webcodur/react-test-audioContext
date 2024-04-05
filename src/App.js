import React, { useState } from 'react';
import AudioPlayer from './components/AudioPlayer';

const App = () => {
	const [audioInfo, setAudioInfo] = useState({ fileName: '', requestTime: 0 });

	const playAudio = (fileName) => {
		setAudioInfo({
			fileName,
			requestTime: Date.now(), // 현재 시간을 기준으로 requestTime 설정
		});
	};

	return (
		<div>
			<button onClick={() => playAudio('buttonClick.mp3')}>Audio</button>
			<button onClick={() => playAudio('backAndForth.mp3')}>Audio2</button>
			<button onClick={() => playAudio('selected1.mp3')}>Audio3</button>
			{audioInfo.fileName && (
				<AudioPlayer
					key={audioInfo.requestTime} // Key prop을 이용해 컴포넌트 강제 리렌더링
					fileName={audioInfo.fileName}
				/>
			)}
		</div>
	);
};

export default App;
