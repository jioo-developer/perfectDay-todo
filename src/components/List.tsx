import { batch, useSelector } from "react-redux";
import { successDate, update } from "../module/reducer";
import { today } from "../module/today";
import { useMyContext } from "../module/MyContext";
import { useEffect, useState } from "react";

interface DateFac extends dateType {
  title: string;
  hour: number;
  min: number;
}
type props = {
  getParcent: (params: number) => void;
};
function List({ getParcent }: props) {
  const { dispatch } = useMyContext();
  const [clear, setClearList] = useState(0);
  const TodoList = useSelector((state: HomeRootState) => state.TodoList);
  // todoList

  useEffect(() => {
    if (TodoList.length > 0) clearCheck();
  }, [TodoList]);

  if (clear > 100000) console.log(clear);

  function clearCheck() {
    const onNum = Array.from(document.querySelectorAll(".clearList")).length;
    const allNum = Array.from(document.querySelectorAll(".list")).length;
    const result: number = Math.floor((onNum / allNum) * 100);
    getParcent(result);
    setClearList(result);
  }

  // 완료시점 만드는 함수
  function createPost(e: HTMLElement): any {
    const titleContent =
      e.parentElement?.getElementsByClassName("today_txt")[0]?.innerHTML;
    const DateFac: DateFac = {
      ...today,
      title: titleContent ? titleContent : "자료를 찾지 못했습니다.",
      hour: new Date().getHours(),
      min: new Date().getMinutes(),
    };

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
  const rankSystem: string | null = localStorage.getItem("rank");

  function successHandler(
    e: React.MouseEvent<HTMLButtonElement>,
    clearArr: any
  ): void {
    if (rankSystem === null) {
      localStorage.setItem("rank", "1");
    } else {
      const result = parseInt(rankSystem) + 1;
      localStorage.setItem("rank", `${result}`);
    }
    batch(() => {
      dispatch(successDate(createPost(e.currentTarget)));
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
                className={`list ${clearState ? "clearList" : "going"}`}
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
                    const copyArray = [...TodoList];
                    copyArray[index].clear = true;
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
