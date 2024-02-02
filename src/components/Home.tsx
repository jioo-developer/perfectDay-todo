import React, { useState, useEffect } from "react";
import List from "./List";
import Editor from "./editor";
import { useSelector } from "react-redux";
import {
  FirstMount,
  calendarFunc,
  createPost,
  successDate,
} from "../module/reducer";
import Notification from "./Notification";
function Home({ currentUser, creation, dispatch }: HomeProps) {
  const initialMount = useSelector((state: HomeRootState) => state.mountState);
  // 첫 mount 조정 state
  const issueState = useSelector((state: HomeRootState) => state.issue);
  // 알림창 닫혔는지 on / off
  const TodoList = useSelector((state: HomeRootState) => state.TodoList);
  // todoList
  const [clearList, setClearList] = useState(0);

  useEffect(() => {
    if (!initialMount) {
      dayMemo();
      loadData();
      dispatch(FirstMount());
    }
  }, []);

  const dayMemo = () => {
    if (creation !== null) {
      const parseCreation = JSON.parse(creation || "{}");
      //생성 날짜를 불러옴
      if (Object.entries(parseCreation).length > 0) {
        let start = new Date(
          `${parseCreation.year},${parseCreation.month},
            ${parseCreation.date - 1}`
        );
        // 생성일자
        const diff = +new Date() - +start;
        // 현재 일에서 생성일자를 뺌
        const nowDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / nowDay);
      }
    }
  };

  const loadData = () => {
    const result = JSON.parse(localStorage.getItem("saveList") || "{}");
    const clearResult = JSON.parse(localStorage.getItem("clearDB") || "{}");
    const calendarResult = JSON.parse(
      localStorage.getItem("calendarList") || "{}"
    );
    if (Object.entries(clearResult).length > 0) {
      dispatch(successDate(clearResult));
    }

    if (Object.entries(result).length > 0) {
      dispatch(createPost(result));
    }

    if (Object.entries(calendarResult).length > 0) {
      dispatch(calendarFunc(calendarResult));
    }
  };

  useEffect(() => {
    if (TodoList.length !== 0) clearCheck();
  }, [TodoList]);

  function clearCheck() {
    const onNum = Array.from(document.querySelectorAll(".clearList")).length;
    const allNum = Array.from(document.querySelectorAll(".list")).length;
    setClearList(Math.floor((onNum / allNum) * 100));
  }

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
      <List TodoList={TodoList} dispatch={dispatch} />
      <Editor dispatch={dispatch} />
      {issueState ? <Notification dispatch={dispatch} /> : null}
    </>
  );
}

export default Home;
