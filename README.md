# 완벽한 그날 프로젝트

## ✏️ working day

작업일 : 개인 사이드 프로젝트
<br />

## 📃 using lang

TypeScript,React,React-Router-dom,ContextAPI,SCSS
<br />
<br />

## 프로젝트 아이디어

오늘 하루 일과를 기입하는 todoList 앱을 사용 중 나도 한번 만들어 볼까 하는 생각으로 시작

<br />
<br />

## Preview

  <img src="./public/img/preview1.PNG" alt=""  width="392" height="300" />
  <img src="./public/img/preview2.PNG" alt=""  width="392" height="300" />
  <img src="./public/img/preview3.PNG" alt=""  width="392" height="300" />
  <img src="./public/img/preview4.PNG" alt=""  width="392" height="300" />
  <img src="./public/img/preview5.PNG" alt=""  width="392" height="300" />

### 📝 기능 설계

- 하루 총 일과 / 완료된 일과를 퍼센트로 계산해서 50%/75%/100% 구간마다 이미지를 다르게 노출시켜 일과 완료 단계를 나눔
- 인터넷이 끊켜도 데이터를 저장할 수 있게 localstorage를 사용 (완벽한 하루 이기 때문에 하루 지나면 데이터는 사라짐)
- 생성일로부터 현재일까지 시간을 계산하여 몇일째 사용중인지 노출
- 이전에 완료한 일정을 확인 할 수 있는 알림함 추가
- 나만의 프로필을 설정 할 수 있는 마이 페이지를 추가
- 하루동안 일과 100프로를 채울 때 마다 점수 1점을 획득하여 특정 점수를 만족하게 되면 등급이 올라가는 랭킹 시스템 추가
- 캘린더를 추가하여 일정예약 시스템 추가

### ✔ 체크해야 할 사항

- [x] 일과 리스트를 추가 할 때 마다 계속 퍼센트가 바뀌어야 함
- [x] 일과 데이터는 하루 지나면 삭제 되어야함
- [x] 라이브러리를 쓰지 않고 캘린더 구현

### 🚀 기능 구현

- 기능 구현 1 : 할일이 늘어날 때 마다 객체 데이터의 clear가 true인 객체만 필터해서 추려지는 배열의 길이 / 총 할일의 배열길이 \* 100
  <br />
  <br />
  <img src="./public/img/initialObject.PNG" alt="" />
- 기능 구현 2 : 쿠키를 사용하여 오늘 자정이 되면 localstorage를 지우게 함
- 기능 구현 3 : 밑 이미지로 대체
<div>
  <img src="./public/img/month.PNG" alt=""  width="300" height="300" />
  <img src="./public/img/week.PNG" alt="" width="300" height="300" />
  <img src="./public/img/day.PNG" alt="" width="300" height="300" />
</div>
