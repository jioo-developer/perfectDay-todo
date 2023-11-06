import React from "react";
import { batch, useDispatch } from "react-redux";
import {
  contentAction,
  reportAction,
  successDate,
  TodoPost,
} from "../module/reducer";
import { today } from "../module/today";

function List({ todolist, saveList }) {
  console.log(todolist);
  const dispatch = useDispatch();

  // 완료시점 만드는 함수

  function createPost() {
    const DateFac = { ...today };
    DateFac.hour = new Date().getHours();
    DateFac.min = new Date().getMinutes();
    return DateFac;
  }

  // 완료시점 만드는 함수

  // 리스트 저장 함수
  function saveHandler() {
    window.alert("현재까지의 리스트를 저장합니다");
    localStorage.setItem(saveList, JSON.stringify(todolist));
  }

  // 클리어를 실행하는 함수
  function successHandler(e) {
    const successTitle =
      e.currentTarget.parentElement.getElementsByClassName("today_txt")[0]
        .innerHTML;

    batch(() => {
      dispatch(successDate(createPost()));
      dispatch(contentAction(successTitle));
    });
  }

  // 할일 초기화 함수

  function deleteHandler() {
    localStorage.removeItem(saveList);
    window.location.reload();
  }

  return (
    <>
      <section className="section02 pd-x20">
        <div className="in_s2">
          <div className="schedule">
            <p>일정스케줄</p>
            <div>
              <span onClick={saveHandler}>저장</span>
              <span onClick={deleteHandler}>초기화</span>
            </div>
          </div>
          {todolist.map((listData, index) => {
            const clearState = todolist[index].clear;
            return (
              <div
                className={`list ${
                  clearState === true ? "clearList" : "going"
                }`}
                key={index}
              >
                <p
                  className={clearState !== false ? "clearText" : "today_date"}
                >
                  {listData.writeH}:{listData.writeM}
                </p>

                <p
                  className={clearState !== false ? "clearIndent" : "today_txt"}
                >
                  {listData.write}
                </p>
                <button
                  className={clearState !== false ? "clearBtn " : null}
                  onClick={(e) => {
                    successHandler(e);
                    let copyArray = todolist;
                    copyArray[index].clear = true;
                    batch(() => {
                      dispatch(TodoPost(...copyArray));
                      dispatch(reportAction());
                    });
                  }}
                >
                  <img src="/img/before_check.svg" alt="check" />
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default List;
