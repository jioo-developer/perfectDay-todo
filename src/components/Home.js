import React, { useState, useEffect, useCallback } from "react";
import Header from "./header";
import List from "./List";
import Editor from "./editor";
import { useSelector } from "react-redux";
import { LoadSaveList, NumAction } from "../module/reducer";
import Notification from "./Notification";
function Home({ creation, currentUser, dispatch, todolist }) {
  const [plusDay, setplusDay] = useState(1);
  // 시작 한 일수 +
  const [domReady, setDomReady] = useState(false);
  // document.ready
  const saveList = "saveList";
  const UserName = currentUser;
  const issueState = useSelector((state) => state.issue);
  // 알림창 닫혔는지 on / off

  const ListNum = useSelector((state) => state.num);
  // 클리어된 list 갯수
  const [startClearNum, setStart] = useState(0);
  // 불러와진 퍼센트

  useEffect(() => {
    setDomReady(true);
    dayMemo();
  }, []);

  // 저장한 할일 리스트 데이터가 있는지 확인 하는 useEffect

  useEffect(() => {
    if (domReady) {
      const loadList = new Promise(function (res) {
        const result = JSON.parse(localStorage.getItem(saveList));
        res(result);
      });

      loadList.then((result) => {
        if (typeof result === "object" && result != null) {
          let arr = [...result];
          dispatch(LoadSaveList(arr));
          // 로컬스토리지에서 저장된 할 일을 불러와서 state.todo에 저장
        }
      });
    }
  }, [domReady]);

  // 저장한 데이터가 있는지 확인 하는 useEffect

  // 시작 한지 몇일이 지났는 지 알려주는 함수 start

  const dayMemo = useCallback(() => {
    const loadCreator = JSON.parse(creation);
    //생성 날짜를 불러옴
    if (loadCreator != null) {
      let start = new Date(
        `${loadCreator.year},${loadCreator.month},
        ${loadCreator.date - 1}`
      );
      // 생성일자
      const diff = new Date() - start;
      // 현재 일에서 생성일자를 뺌
      const nowDay = 1000 * 60 * 60 * 24;
      setplusDay(Math.floor(diff / nowDay));
    }
  }, [plusDay]);

  // 시작 한지 몇일이 지났는 지 알려주는 함수 end

  // 저장된 데이터 중에 클리어 된 데이터가 있는 지 확인

  function loadNum() {
    if (todolist.length !== 0 && domReady === true) {
      const onNum = Array.from(document.querySelectorAll(".clearList")).length;
      dispatch(NumAction(onNum));
    }
  }

  // 저장된 데이터 중에 클리어 된 데이터가 있는 지 확인

  // 할일이 새로 만들 어 질 때 실행되는 useEffect

  useEffect(() => {
    loadNum();
    const allNum = Array.from(document.querySelectorAll(".list")).length;
    if (ListNum !== 0) {
      setStart(Math.floor((ListNum / allNum) * 100));
      // 클리어 갯수 / 전체 리스트 갯수
    }
  }, [todolist]);

  // 할일이 새로 만들 어 질 때 실행되는 useEffect

  useEffect(() => {
    if (ListNum !== 0) {
      const allNum = Array.from(document.querySelectorAll(".list")).length;
      setStart(Math.floor((ListNum / allNum) * 100));
    }
  }, [ListNum]);

  // 퍼센트 업데이트 함수

  return (
    <>
      <section className="section01 pd-x20">
        <div className="s1_wrap">
          <div className="s1_txt_wrap">
            <p className="today">
              오늘 <span>{UserName}</span> 님은
            </p>
            <p className="parcent">{startClearNum}%</p>

            <p className="caption">만큼 완벽한 하루를 보내셨습니다!</p>
          </div>
          <img src="/img/wow.svg" alt="" />
        </div>
        <div className="race">
          <p className="member">{UserName}</p>
          <div className="member_caption">
            님은 {plusDay}일째 완벽한 하루를 사용중!!
          </div>
        </div>
      </section>
      <List saveList={saveList} todolist={todolist} />
      <Editor />
      {issueState ? <Notification dispatch={dispatch} /> : null}
    </>
  );
}

export default Home;
