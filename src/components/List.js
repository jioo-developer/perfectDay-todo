import React from "react";
import { batch, useDispatch} from "react-redux";
import {
  contentAction,
  successDate,
  TodoPost,
} from "../module/reducer";


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
      dispatch(contentAction(successTitle));
    });
  }

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
            const clearState = todolist[index].clear
            return (
              <div
                className={`list ${
                  clearState === true ? "clearList" : "going"
                }`}
                key={index}
              >
                <p className={clearState !== false ?  "clearList" : "today_date"}>
                    {listData.writeH}:{listData.writeM}
                  </p>

               <p className={clearState !== false ? 'clearIndent' : "today_txt"} >{listData.write}</p>
                 <button className={clearState !== false ? "clearBtn " : null}
                    onClick={(e) => {
                      successHandler(e);
                      let copyArray = todolist;
                      copyArray[index].clear = true;
                      dispatch(TodoPost(...copyArray));
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
