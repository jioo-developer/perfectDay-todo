# 완벽한 그날 프로젝트

## ✏️ working day

작업일 : 개인 사이드 프로젝트
<br />

## 📃 using lang

TypeScript,React,React-Router-dom,ContextAPI,SCSS
<br />
<br />

<div style="border-bottom:none; font-size:20px;">프로젝트 아이디어 : 오늘 하루 일과를 기입하는 todoList 앱을 사용 중 나도 한번 만들어 볼까 하는 생각으로 시작</div>

## 1단계

### 📝 기능 설계

- 하루 총 일과 / 완료된 일과 를 퍼센트로 계산 해서 50%,75%,100 각 퍼센트 이상 마다 이미지를 다르게 보여주여 재미요소를 넣어줌
- 웹앱이다보니 인터넷을 끌 때를 대비하여 localstorage를 DB로 사용하여 인터넷을 꺼도 이미 기입한 일과를 보여줌
- 생성일로 부터 현재일 까지 몇일이 지났는지 노출시켜 몇일째 완벽하게 살고 있다는 느낌을 주게함
- 내가 이전에 완료한 일정이 어떤 것이 있는지 확인 할 수 있는 알림함 제작
- 마이 페이지를 만들어 나만의 공간을 가질 수 있게 설계
- 나만의 프로필을 선택해 고를 수 있으며, 하루 일과 100%를 채우면 rank점수를 + 1 시켜줌

- 한문 페이지의 노출 내용과 영문 페이지의 노출 내용이 다르게 제작을 바람.

### ✔ 체크해야 할 사항

- [x] 개발 지식이 전무한 원내 직원이 어떻게 하면 혼자 게시판을 관리 할 수 있을지.
- [x] 게시판을 최근 게시물 순으로 어떤식으로 메인페이지로 끌어 와야 할 지
- [x] 한문 게시판에 작성된 게시물이 때론 영문 게시판에 미노출 되야 함.

### 🚀 기능 구현

- 퍼블리셔 1명에서 체크리스트의 기능들을 구현 해낼 수 있는 프레임워크를 서치
- 게시판 프레임워크 중 가장 가벼운 그누보드를 차용
- 그누보드 프레임워크 내부 관리자 페이지와 최근게시판 플러그인을 채택
- 그누보드 내 한문게시판과 영문게시판을 따로 만듬으로 써 게시판 연동을 막음
