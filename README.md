# 할 일 만들기

밀리의 서재 과제

## 실행

```
// install npm
$ npm install

// production mode
$ npm run build

// development mode
$ npm run dev

// run dev server
$ npm run devserver
```

dist 폴더 내 결과물 구현

## 구현사항

- 할 일 만들기
  - 할 일 내용(글자수 제한x), 종료시간(초 단위)
  - 필수 입력 사항
  - 추가 버튼
- 할 일 목록
  - 정렬 기능
    - 입력한 순(default), 남은 시간 순
    - 적용되고 있는 정렬 버튼에 활성화 UI
  - 종료 기능
    - 종료된 목록은 "종료된 할 일"로 이동
    - 전체 종료 기능
    - 선택 종료 기능(선택 된 목록이 없을 시 버튼에 비활성화 UI)
  - 목록 아이템
    - 시간이 0이 되면 종료처리
    - 남은 시간이 5초 이내인 경우 별도 UI처리
    - 종료 버튼(각 목록 별로)
    - 시간 종료
      - 설정된 시간이 0이 되면 종료
      - 시간종료 시에만 팝업 노출
- 종료된 할 일
  - 목록 아이템
    - 할 일 목록에서 종료된 아이템들 목록
    - 초기 설정된 종료 시간이 표기

## 폴더 구조

```
tree
.
├── dist
├── public
│   ├── index.html
│   └── style.css
├── src
│   ├── index.js
│   ├── App.js
│   ├── MakeToDo.js
│   ├── ListToDoHeader.js
│   ├── ListToDo.js
│   ├── ToDo.js
│   ├── DoneToDo.js
│   └── DonePopUp.js
├── package.json
├── README.md
├── babel.config.json
└── webpack.config.js

```

## 구현 상세도(UML)

- user case
  ![](https://github.com/Taewoong-H/millie_todoList/blob/master/public/KakaoTalk_20211012_221045419.jpg)

- class diagram
  ![](https://github.com/Taewoong-H/millie_todoList/blob/master/public/KakaoTalk_20211012_221045715.jpg)
