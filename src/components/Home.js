import React, { useState, useEffect } from "react";
import List from "./List";
import Editor from "./editor";
import { useSelector } from "react-redux";
import { LoadSaveList, NumAction, FirstMount } from "../module/reducer";
import Notification from "./Notification";
function Home({ creation, currentUser, dispatch }) {
  const [plusDay, setplusDay] = useState(1);
  // 시작 한 일수 +
  const saveList = "saveList";
  const UserName = currentUser;

  const initialMount = useSelector((state) => state.mountState);

  const issueState = useSelector((state) => state.issue);
  // 알림창 닫혔는지 on / off

  const clearListNum = useSelector((state) => state.num);
  // 클리어된 list 갯수

  const [loadClearParcent, setLoadClear] = useState(0);
  // 불러와진 퍼센트

  const todolist = useSelector((state) => state.Todo);
  // todoList

  useEffect(() => {
    if (!initialMount) {
      dayMemo();
      loadData();
    }
  }, []);

  // 시작 한지 몇일이 지났는 지 알려주는 함수 start

  const dayMemo = () => {
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
  };

  // 시작 한지 몇일이 지났는 지 알려주는 함수 end

  // 저장한 할일 리스트 데이터가 있는지 확인 하는 함수

  const loadData = () => {
    const loadList = new Promise(function (res) {
      const result = JSON.parse(localStorage.getItem(saveList));
      if (result !== null) res(result);
    });

    loadList.then((result) => {
      if (typeof result === "object" && result != null) {
        let arr = [...result];
        dispatch(LoadSaveList(arr));
        // 로컬스토리지에서 저장된 할 일을 불러와서 todoLIst에 저장
      }
    });
  };

  // 저장한 할일 리스트 데이터가 있는지 확인 하는 함수

  // todolist를 불러 온 후 처리 할 useEffect

  useEffect(() => {
    if (todolist.length !== 0 && !initialMount) {
      clearCheck();
    } else if (todolist.length !== 0) {
      clearCheck();
      checkList();
    }
  }, [todolist]);

  // todolist를 불러 온 후 처리 할 useEffect

  // 저장된 데이터 중에 클리어 된 데이터가 있는 지 확인 하는 함수

  function clearCheck() {
    const onNum = Array.from(document.querySelectorAll(".clearList")).length;
    if (clearListNum === 0) {
      dispatch(NumAction(onNum));
    } else if (onNum !== clearListNum) {
      dispatch(NumAction(onNum));
    }

    // 클리어 된 데이터가 있는 지 확인 후 clearNum에 저장
  }

  // 저장된 데이터 중에 클리어 된 데이터가 있는 지 확인 하는 함수

  // 클리어 된 데이터를 불러와서 클리어 갯수 / 전체 갯수 처리 useEffect

  useEffect(() => {
    if (clearListNum !== 0 && !initialMount) {
      checkList();
      dispatch(FirstMount());
    } else {
      if (clearListNum !== 0) checkList();
    }
  }, [clearListNum]);

  // 클리어 된 데이터를 불러와서 클리어 갯수 / 전체 갯수 처리 useEffect

  function checkList() {
    const allNum = Array.from(document.querySelectorAll(".list")).length;
    setLoadClear(Math.floor((clearListNum / allNum) * 100));
    // 클리어 갯수 / 전체 리스트 갯수
  }

  return (
    <>
      <section className="section01 pd-x20">
        <div className="s1_wrap">
          <div className="s1_txt_wrap">
            <p className="today">
              오늘 <span>{UserName}</span> 님은
            </p>
            <p className="parcent">{loadClearParcent}%</p>

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
