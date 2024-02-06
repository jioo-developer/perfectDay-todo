import { batch } from "react-redux";
import { successDate, update } from "../module/reducer";
import { today } from "../module/today";
import { Dispatch } from "redux";
type ListProps = {
  dispatch: Dispatch;
  TodoList: todoItem[];
};

interface DateFac extends dateType {
  title: string | undefined;
  hour: number;
  min: number;
}
function List({ TodoList, dispatch }: ListProps) {
  // 완료시점 만드는 함수
  const rankSystem: string | null = localStorage.getItem("rank");
  function createPost(e: HTMLElement): any {
    const DateFac: DateFac = {
      ...today,
      title:
        e.parentElement?.getElementsByClassName("today_txt")[0]?.innerHTML ||
        "",
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
  function successHandler(
    e: React.MouseEvent<HTMLButtonElement>,
    clearArr: any
  ): void {
    if (rankSystem === null) {
      localStorage.setItem("rank", "1");
    } else {
      const result = parseInt(rankSystem) + 1;
      localStorage.setItem("rank", `${rankSystem}`);
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
                    let copyArray = [...TodoList];
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
