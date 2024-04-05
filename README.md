# 리액트 + audioContext 테스팅 프로젝트

리액트 실행환경에서 audioContext 사용법을 테스트하기 위한 프로젝트.

## audioContext?

- AudioContext 내에서는 AudioNode를 이용해 소리를 제어합니다. 
- AudioNode는 크게 Inputs(입력), Effects(수정), Destination(출력)으로 나뉩니다.
- AudioContext는 오디오 노드들의 연결로 이루어집니다. AudioContext 내의 노드들은 서로 연결되어 하나의 연결된 그래프를 형성합니다. 
- AudioContext를 이용해 새로운 AudioContext 객체를 생성하고 반환합니다

## 위 프로젝트를 적용하기 위한 프로젝트

- 아래 프로젝트에서의 활용을 위한 테스트 작업
- http://www.moemoechat.com/chat

## 처리내역

- 컨트롤러 UI는 숨기기
- 음원은 외부 페이지/컴포넌트에서의 버튼을 누를 때마다 재생
- 버튼을 반복적으로 눌러도 동일한 오디오 파일이 처음부터 다시 재생되어야 함
- 오디오 재생 로직은 컴포넌트로 빼고 해당 페이지에서 파일명만 받아와서 실행

## 해결된 에러/경고

### The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page

문제:
- 브라우저의 자동 재생 정책을 준수하라는 경고
- 사용자의 명시적인 상호작용(예: 클릭) 없이 AudioContext를 시작하려고 할 때 발생하는 오류

해결:
- AudioContext 생성과 resume() 호출을 사용자 상호작용 이벤트(버튼 클릭) 내부에서 처리
- 버튼 클릭 시 AudioContext를 생성 & 이미 생성되어 suspended 상태라면 resume() 호출하여 활성화

### "Construction of AudioBufferSourceNode is not useful when context is closed" 문제

문제
- AudioContext가 이미 닫힌 후 AudioBufferSourceNode를 생성하려고 시도할 때 발생하는 경고

해결
- AudioContext를 컴포넌트 생명주기와 무관하게 유지하도록 전역에서 관리하는 방식으로 변경
- 컴포넌트가 언마운트될 때 AudioContext를 닫지 않고, 필요할 때마다 적절한 AudioContext를 사용할 수 있도록 처리. 이 접근법은 - - - - - AudioBufferSourceNode 생성 시점에 항상 사용 가능한 AudioContext가 있음을 보장함

### "Connecting nodes after the context has been closed is not useful"

문제
- AudioContext가 닫힌 후에 오디오 노드를 연결하려고 시도할 때 나타나는 경고
- AudioContext를 잘못 관리하면서 발생하는 문제

해결
- AudioPlayer 컴포넌트 내에서 AudioContext의 생성과 관리 개선
- AudioContext가 닫힌 상태가 아닐 때만 오디오 노드를 생성하고 연결하도록 로직을 조정
- 또한, 전역 AudioContext 관리 방식을 채택하여, AudioContext가 필요할 때마다 안정적으로 접근하고 사용할 수 있도록 처리