import { successDate, update } from "../module/reducer";
import { today } from "../module/today";
import { useEffect, useState } from "react";
import { DateFac, todoItem } from "../module/interfaceModule";
import { useMyContext } from "../module/MyContext";

type props = {
  getParcent: (params: number) => void;
};

function List({ getParcent }: props) {
  const { todoList, finishDispatch, todoDispatch, setBell } = useMyContext();
  const [deleteToggle, setDelete] = useState(false);

  useEffect(() => {
    if (todoList.length > 0) {
      clearCheck();
    }
  }, [todoList]);

  const clearCheck = () => {
    const clearEl = todoList.filter((item) => {
      return item.clear === true;
    });

    if (clearEl.length > 0) {
      if (clearEl.length <= todoList.length) {
        const result: number = Math.floor(
          (clearEl.length / todoList.length) * 100
        );
        getParcent(result);
      }
    }
  };

  function successHandler(
    //여기선 랭크 숫자 카운트만 올림
    clearArr: todoItem[],
    title: string
  ): void {
    const rankSystem: string | null = localStorage.getItem("rank");
    if (rankSystem === null) {
      localStorage.setItem("rank", "1");
    } else {
      const result = parseInt(rankSystem) + 1;
      localStorage.setItem("rank", `${result}`);
    }
    createPost(clearArr, title);
  }

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

  function saveHandler() {
    if (window.confirm("현재까지의 리스트를 저장합니다")) {
      localStorage.setItem("saveList", JSON.stringify(todoList));
    }
  }

  function deleteTodo(value: number) {
    const result = todoList.filter((item, index) => index !== value);
    const loadStorage: todoItem[] = JSON.parse(
      localStorage.getItem("saveList") || "[]"
    );
    if (loadStorage.length > 1) {
      localStorage.removeItem("saveList");
      localStorage.setItem("saveList", JSON.stringify(result));
    } else if (loadStorage.length === 1) {
      localStorage.removeItem("saveList");
    }
    todoDispatch(update(result));
  }

  return (
    <>
      <section className="section02 pd-x20">
        <div className="in_s2">
          <div className="schedule">
            <p>일정스케줄</p>
            <div>
              <button>
                <span onClick={saveHandler}>저장</span>
              </button>
              <button>
                <span onClick={() => setDelete(true)}>삭제</span>
              </button>
            </div>
          </div>
          <div className="in-custom-wrap">
            {todoList.map((value, index) => {
              const clearState = todoList[index].clear;
              return (
                <div
                  className={`list ${clearState ? "clearList" : "going"}`}
                  key={index}
                >
                  <div>
                    {deleteToggle && !clearState ? (
                      <button type="button" onClick={() => deleteTodo(index)}>
                        <img
                          src="/img/delete.png"
                          alt=""
                          style={{ marginBottom: 3, width: 20 }}
                        />
                      </button>
                    ) : null}
                    <p className={clearState ? "clearText" : "today_date"}>
                      {value.writeH}:{value.writeM}
                    </p>
                  </div>

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
