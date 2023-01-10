import React, { useCallback, useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import {
  contentAction,
  Counter,
  reportAction,
  successDate,
  TodoPost,
} from "../module/reducer";
import styled from "styled-components";

const ClearList = styled.p`
  color: #ddd;
  font-family: "AppleSDGothicNeoSB";
  text-decoration: line-through;
  font-size: 16px;
`;

const ClearIndent = styled(ClearList)`
  text-indent: -20px;
`;

const ClearBtn = styled.button`
  pointer-events: none;
  opacity: 0;
`;

function List({ todolist, saveList }) {
  const dispatch = useDispatch();

  function createPost() {
    const nowTime = new Date(),
      year = nowTime.getFullYear(),
      month = nowTime.getMonth() + 1,
      date = nowTime.getDate(),
      hour = nowTime.getHours(),
      min = nowTime.getMinutes();

    const DateFac = {
      year: year,
      month: month,
      date: date,
      hour: hour,
      min: min,
    };
    return DateFac;
  }

  function saveHandler() {
    window.alert("현재까지의 리스트를 저장합니다");
    localStorage.setItem(saveList, JSON.stringify(todolist));
  }

  function successHandler(e) {
    const successTitle =
      e.currentTarget.parentElement.getElementsByClassName("today_txt")[0]
        .innerHTML;

    batch(() => {
      dispatch(successDate(createPost()));
      dispatch(reportAction());
      dispatch(contentAction(successTitle));
    });
  }

  function deleteHandler() {
    localStorage.removeItem(saveList);
    window.location.reload();
  }

  return (
    <>
      <section className="section02">
        <div className="in_s2">
          <div className="schedule">
            <p>일정스케줄</p>
            <div>
              <span onClick={saveHandler}>저장</span>
              <span onClick={deleteHandler}>초기화</span>
            </div>
          </div>
          {todolist.map((listData, index) => {
            return (
              <div
                className={`list ${
                  todolist[index].clear === true ? "clearList" : "going"
                }`}
                key={index}
              >
                {todolist[index].clear === false ? (
                  <p className="today_date">
                    {listData.writeH}:{listData.writeM}
                  </p>
                ) : (
                  <ClearList>
                    {listData.writeH}:{listData.writeM}
                  </ClearList>
                )}

                {todolist[index].clear === false ? (
                  <p className="today_txt">{listData.write}</p>
                ) : (
                  <ClearIndent>{listData.write}</ClearIndent>
                )}
                {todolist[index].clear === false ? (
                  <button
                    onClick={(e) => {
                      successHandler(e);
                      let copyArray = todolist;
                      copyArray[index].clear = true;
                      dispatch(TodoPost(...copyArray));
                    }}
                  >
                    <img src="/img/before_check.svg" alt="check" />
                  </button>
                ) : (
                  <ClearBtn />
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default List;
