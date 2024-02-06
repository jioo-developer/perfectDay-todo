import React from "react";
import { batch } from "react-redux";
import { successDate, update } from "../module/reducer";
import { today } from "../module/today";

function List({ todoList, dispatch }) {
  // 완료시점 만드는 함수
  function createPost(e) {
    const DateFac = { ...today };
    DateFac.title =
      e.parentElement.getElementsByClassName("today_txt")[0].innerHTML;
    DateFac.hour = new Date().getHours();
    DateFac.min = new Date().getMinutes();

    return DateFac;
  }

  // 완료시점 만드는 함수

  // 리스트 저장 함수
  function saveHandler() {
    if (window.confirm("현재까지의 리스트를 저장합니다")) {
      localStorage.setItem("saveList", JSON.stringify(todoList));
    }
  }

  // 클리어를 실행하는 함수
  function successHandler(e, clearArr) {
    batch(() => {
      dispatch(successDate(createPost(e)));
      dispatch(update(clearArr));
    });
  }

  // 할일 초기화 함수

  function deleteHandler() {
    localStorage.removeItem("saveList");
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
          {todoList.map((listData, index) => {
            const clearState = todoList[index].clear;
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
                  className={clearState !== false ? "clearBtn" : null}
                  onClick={(e) => {
                    let copyArray = todoList;
                    console.log(typeof parseInt(copyArray[index].writeH));
                    copyArray[index].clear = true;
                    successHandler(e.currentTarget, copyArray);
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
