import React, { useState, useEffect, useCallback } from "react";
import Header from "./header";
import List from "./List";
import Editor from "./editor";
import { useSelector } from "react-redux";
import { LoadSaveList, NumAction } from "../module/reducer";
import MainFooter from "../components/mainFooter";
import Notification from "./Notification";
function Home({ creation, currentUser, dispatch }) {
  const [plusDay, setplusDay] = useState(1);
  const loaddingState = useSelector((state) => state.loadding);
  const [domReady, setDomReady] = useState(false);
  const saveList = "saveList";
  const UserName = currentUser;
  const issueState = useSelector((state) => state.issue);
  const todolist = useSelector((state) => state.Todo);
  const ListNum = useSelector((state) => state.num);
  const [startClearNum, setStart] = useState(0);
  useEffect(() => {
    setDomReady(true);
    dayMemo();
  }, []);


  useEffect(() => {
    if (domReady) {
      const loadList = new Promise(function (res) {
        const result = JSON.parse(localStorage.getItem(saveList));
        res(result);
      });

      loadList.then((result) => {
        if (
          typeof result === "object" &&
          result != null &&
          loaddingState === false
        ) {
          let arr = [...result];
          dispatch(LoadSaveList(arr));
        }
      });
    }
  }, [domReady]);

  const dayMemo = useCallback(() => {
    const loadCreator = JSON.parse(localStorage.getItem(creation));
    if (loadCreator != null) {
      const now = new Date();

      let start = new Date(
        `${loadCreator.findyear},${loadCreator.findmonth + 1},
        ${loadCreator.findDay - 1}`
      );

      const diff = now - start;

      const Today = 1000 * 60 * 60 * 24;
      setplusDay(Math.floor(diff / Today));
    }
  }, [plusDay]);


    function loadNum() {
    if (todolist.length !== 0 && domReady === true) {
      const onNum = Array.from(document.querySelectorAll(".clearList")).length;
      dispatch(NumAction(onNum));
    }
  }

  useEffect(() => {
   loadNum();
  const allNum = Array.from(document.querySelectorAll(".list")).length;
    if (ListNum !== 0) {
      setStart(Math.floor((ListNum / allNum) * 100));
    }
  }, [todolist]);

    useEffect(() => {
      console.log(ListNum)
    if (ListNum !== 0) {
      const allNum = Array.from(document.querySelectorAll(".list")).length;
      setStart(Math.floor((ListNum / allNum) * 100));
    }
  }, [ListNum]);

  return (
    <>
      <div className="wrap">
        <Header />
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
        <MainFooter todolist={todolist}></MainFooter>
      </div>
    </>
  );
}

export default Home;
