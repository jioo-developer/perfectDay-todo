import React, { useState, useEffect, useCallback } from "react";
import Header from "./header";
import List from "./List";
import Editor from "./editor";
import { useDispatch, useSelector } from "react-redux";
import { Counter, listAction, LoadSaveList } from "..";
import Notification from "./Notification";
function Home(props) {
  const [plusDay, setplusDay] = useState(1);
  const loaddingState = useSelector((state) => state.loadding);
  const parcent = useSelector((state) => state.clearCounter);
  const listAmount = useSelector((state) => state.list);
  const [domReady, setDomReady] = useState(false);
  const saveList = "saveList";
  const saveCounter = "counter";
  const loadAmount = "loadAmount";
  const UserName = props.currentUser;
  const issueState = useSelector((state) => state.issue);
  const dispatch = useDispatch();

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
      const loadCounter = new Promise(function (res) {
        const findData = JSON.parse(localStorage.getItem(saveCounter));
        const result = findData === null ? 0 : findData;
        res(result);
      });

      loadCounter.then((result) => {
        dispatch(Counter(result));
      });

      const AmountLoad = new Promise(function (res) {
        const findAmount = localStorage.getItem(loadAmount);
        const result = findAmount === null ? 0 : findAmount;
        res(result);
      });

      AmountLoad.then((result) => {
        dispatch(listAction(result));
      });
    }
  }, [domReady]);

  const dayMemo = useCallback(async () => {
    const loadCreator = JSON.parse(localStorage.getItem(props.creation));
    const now = new Date();

    let start = await new Date(
      `${loadCreator.findyear},${loadCreator.findmonth + 1},
      ${loadCreator.findDay - 1}`
    );

    const diff = now - start;

    const Today = 1000 * 60 * 60 * 24;
    setplusDay(Math.floor(diff / Today));
  }, [plusDay]);

  return (
    <div className="wrap">
      <Header />
      <section className="section01">
        <div className="s1_wrap">
          <div className="s1_txt_wrap">
            <p className="today">
              오늘 <span>{UserName}</span> 님은
            </p>
            <p className="parcent">
              {parcent}/{listAmount}
            </p>
            <p className="caption">만큼 완벽한 하루를 보내셨습니다!</p>
          </div>
          {listAmount === 0 ? (
            <img src="/img/wow.svg" alt="" />
          ) : listAmount !== 0 && parcent === listAmount ? (
            <img src="/img/75.svg" alt="" />
          ) : (
            <img src="/img/50.svg" alt="" />
          )}
        </div>

        <div className="race">
          <p className="member">{UserName}</p>
          <div className="member_caption">
            님은 {plusDay}일째 완벽한 하루를 사용중!!
          </div>
        </div>
      </section>
      <List
        saveList={saveList}
        saveCounter={saveCounter}
        parcent={parcent}
        loadAmount={loadAmount}
        listAmount={listAmount}
      />
      <Editor />
      {issueState ? <Notification /> : null}
    </div>
  );
}

export default Home;
