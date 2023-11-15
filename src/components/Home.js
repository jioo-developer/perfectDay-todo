import React, { useState, useEffect } from "react";
import List from "./List";
import Editor from "./editor";
import { useSelector } from "react-redux";
import { FirstMount, createPost } from "../module/reducer";
import Notification from "./Notification";
function Home({ creation, currentUser, dispatch }) {
  const initialMount = useSelector((state) => state.mountState);
  // 첫 mount 조정 state
  const issueState = useSelector((state) => state.issue);
  // 알림창 닫혔는지 on / off
  const todoList = useSelector((state) => state.TodoList);
  // todoList
  const [clearList, setClearList] = useState(0);

  useEffect(() => {
    if (!initialMount) {
      dayMemo();
      loadData();
    }
  }, []);

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
      return Math.floor(diff / nowDay);
    }
  };

  const loadData = () => {
    const result = JSON.parse(localStorage.getItem("saveList"));
    dispatch(createPost(result !== null ? result : []));
  };

  useEffect(() => {
    if (todoList.length !== 0) clearCheck();
  }, [todoList]);

  function clearCheck() {
    const onNum = Array.from(document.querySelectorAll(".clearList")).length;
    const allNum = Array.from(document.querySelectorAll(".list")).length;
    setClearList(Math.floor((onNum / allNum) * 100));
  }

  useEffect(() => {
    if (clearList.length !== 0 && !initialMount) dispatch(FirstMount());
  }, [clearList]);
  return (
    <>
      <section className="section01 pd-x20">
        <div className="s1_wrap">
          <div className="s1_txt_wrap">
            <p className="today">
              오늘 <span>{currentUser}</span> 님은
            </p>
            <p className="parcent">{clearList}%</p>

            <p className="caption">만큼 완벽한 하루를 보내셨습니다!</p>
          </div>
          <img src="/img/wow.svg" alt="" />
        </div>
        <div className="race">
          <p className="member">{currentUser}</p>
          <div className="member_caption">
            님은 {dayMemo()}일째 완벽한 하루를 사용중!!
          </div>
        </div>
      </section>
      <List todoList={todoList} dispatch={dispatch} />
      <Editor dispatch={dispatch} />
      {issueState ? <Notification dispatch={dispatch} /> : null}
    </>
  );
}

export default Home;
