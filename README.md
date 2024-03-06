# I-SOC 홈페이지 제작

fullName : ICT융합 해양스마트시티 방재인력양성교육사업단(대학원)

## ✏️ working day

작업일 : 2021.09 ~ 2021.12.31
<br />

## 👨‍💻 creators

jioo-developer
<br />

## 1단계

### 📝 요구 사항

- 대학원에 들어오고 싶은 학생들이 브로슈어 처럼 볼 수 있는 홈페이지 제작을 바람.
- 원내 직원이 게시판을 관리 할 수 있게 제작을 바람.
- 게시판이 최근별로 메인에 노출 되게 제작을 바람.
- 영문 페이지 추가 제작 바람.(번역 플러그인 X)
- 한문 페이지의 노출 내용과 영문 페이지의 노출 내용이 다르게 제작을 바람.

### ✔ 체크해야 할 사항

- [x] 개발 지식이 전무한 원내 직원이 어떻게 하면 혼자 게시판을 관리 할 수 있을지.
- [x] 게시판을 최근 게시물 순으로 어떤식으로 메인페이지로 끌어 와야 할 지
- [x] 한문 게시판에 작성된 게시물이 때론 영문 게시판에 미노출 되야 함.

### 🚀 기능 구현

- 퍼블리셔 1명에서 체크리스트의 기능들을 구현 해낼 수 있는 프레임워크를 서치
- 게시판 프레임워크 중 가장 가벼운 그누보드를 차용
- 그누보드 프레임워크 내부 관리자 페이지와 플러그인을 사용하도록 제작
- 그누보드 내 한문게시판과 영문게시판을 따로 만듬으로 써 게시판 연동을 막음

## 2단계

### 📝 요구 사항

- 관리자페이지가 먹통 일시 대처법
- 연구성과 페이지 리스트에 1년에 한번씩 내용이 추가 되어야함. 사진참조 (100개 가량)
  <br/>
  <img src="000.PNG" alt="" />

### ✔ 체크해야 할 사항

- [x] 호스팅 회사에서 PHPMYADMIN을 지원 하는 지 체크
- [x] 이건 유지보수 해주는 퍼블리셔나 개발자가 어떻게 하면 데이터와 html 코드를 편하게 넣을 수 있을 까 고민

### 🚀 기능 구현

- 관리자 페이지에 오류 해결이 안될 경우 유지보수 하는 사람이 PHYMYADMIN으로 강제 해결 할 수 있게 달아줌.
- 리액트에서 array.map으로 Element를 구현 하는 걸 모티브 삼아 reactMapLogic.js를 제작

```
export const txtData = [
  {
    title:
      "Bismuth FilmCoated Gold Ultramicroelectrode Array for Simultaneous Quantification of Pb(II) and Cd(II) by Square Wave Anodic Stripping Voltammetry",
    name: "Sensors",
    date: "2021.03",
    other: "SCI",
  }
]
```

이렇게 객체 데이터가 담인 배열을 준비 후<br />
reactMapLogic의 파라미터에 넣고 title,name,date,other에 맞게 reactMapLogic에서 Element를 뿌려줌
