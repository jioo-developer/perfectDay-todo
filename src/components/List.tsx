import { successDate, update } from "../module/reducer";
import { today } from "../module/today";
import { useEffect, useRef } from "react";
import { DateFac, todoItem } from "../module/interfaceModule";
import { useMyContext } from "../module/MyContext";

type props = {
  getParcent: (params: number) => void;
};
function List({ getParcent }: props) {
  const listRef = useRef<HTMLDivElement>(null);
  const { todoList, finishDispatch, todoDispatch, setBell } = useMyContext();

  const clearCheck = () => {
    const listEl = listRef.current?.children || [];
    const listArr = Array.from(listEl) as HTMLDivElement[];

    const clearEl = listArr.filter((item) => {
      return item.classList.contains("clearList");
    });
    if (clearEl.length > 0) {
      if (clearEl.length <= listEl.length) {
        const result: number = Math.floor(
          (clearEl.length / listEl.length) * 100
        );
        getParcent(result);
      }
    }
  };

  useEffect(() => {
    if (todoList.length > 0) {
      clearCheck();
    }
  }, [todoList]);

  // 완료시점 만드는 함수
  function createPost(clearArr: todoItem[], title: string) {
    const DateFac: DateFac = {
      ...today,
      title: title,
      hour: new Date().getHours(),
      min: new Date().getMinutes(),
    };
    setBell(true);
    finishDispatch(successDate(DateFac));
    todoDispatch(update(clearArr));
  }

  // 완료시점 만드는 함수

  // 리스트 저장 함수
  function saveHandler(): void {
    if (window.confirm("현재까지의 리스트를 저장합니다")) {
      localStorage.setItem("saveList", JSON.stringify(todoList));
    }
  }

  // 클리어를 실행하는 함수
  const rankSystem: string | null = localStorage.getItem("rank");

  function successHandler(
    //여기선 랭크 숫자 카운트만 올림
    clearArr: todoItem[],
    title: string
  ): void {
    if (rankSystem === null) {
      localStorage.setItem("rank", "1");
    } else {
      const result = parseInt(rankSystem) + 1;
      localStorage.setItem("rank", `${result}`);
    }
    createPost(clearArr, title);
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
          <div className="in-custom-wrap" ref={listRef}>
            {todoList.map((value, index) => {
              const clearState = todoList[index].clear;
              return (
                <div
                  className={`list ${clearState ? "clearList" : "going"}`}
                  key={index}
                >
                  <p className={clearState ? "clearText" : "today_date"}>
                    {value.writeH}:{value.writeM}
                  </p>

                  <p className={clearState ? "clearIndent" : "today_txt"}>
                    {value.write}
                  </p>
                  <button
                    className={clearState ? "clearBtn" : ""}
                    disabled={clearState}
                    onClick={() => {
                      const copyArray: todoItem[] = [...todoList];
                      copyArray[index] = { ...copyArray[index], clear: true };
                      successHandler(copyArray, value.write);
                    }}
                  >
                    <img src="/img/before_check.svg" alt="check" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default List;
