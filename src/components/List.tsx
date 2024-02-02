import React, { MouseEvent } from "react";
import { batch } from "react-redux";
import { successDate, update } from "../module/reducer";
import { today } from "../module/today";

type ListProps = {
  TodoList: todoItem[];
  dispatch: any;
};

interface DateFac extends dateType {
  title: string;
  hour: string | number;
  min: string | number;
}

function List({ TodoList, dispatch }: ListProps) {
  // 완료시점 만드는 함수
  console.log(TodoList);
  console.log("mounted--------------------");
  function createPost(e: MouseEvent): DateFac {
    const DateFac: any = { ...today };
    DateFac.title = "";
    DateFac.hour = new Date().getHours();
    DateFac.min = new Date().getMinutes();
    return DateFac;
  }

  // 완료시점 만드는 함수

  // 리스트 저장 함수
  function saveHandler(): void {
    if (window.confirm("현재까지의 리스트를 저장합니다")) {
      localStorage.setItem("saveList", JSON.stringify(TodoList));
    }
  }

  // 클리어를 실행하는 함수
  function successHandler(e: MouseEvent, clearArr: HomeRootState) {
    batch(() => {
      dispatch(successDate(createPost(e)));
      dispatch(update(clearArr));
    });
  }

  // 할일 초기화 함수

  function deleteHandler(): void {
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
          {TodoList.map((listData, index) => {
            const clearState = TodoList[index].clear;
            return (
              <div
                className={`list ${
                  clearState === true ? "clearList" : "going"
                }`}
                key={index}
              >
                <p className={clearState ? "clearText" : "today_date"}>
                  {listData.writeH}:{listData.writeM}
                </p>

                <p className={clearState ? "clearIndent" : "today_txt"}>
                  {listData.write}
                </p>
                <button
                  className={clearState ? "clearBtn" : ""}
                  onClick={(e) => {
                    const copyArray: any = [...TodoList];
                    console.log(copyArray);
                    console.log("-----------------------++");
                    // const copyArray: HomeRootState = [...TodoList];
                    // copyArray[index].clear = true;
                    successHandler(e, copyArray);
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
