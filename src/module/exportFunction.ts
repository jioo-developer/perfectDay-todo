import { FinishDataType, dateType, todoItem } from "./interfaceModule";
import { Action, createPost, successDate } from "./reducer";

export const loadData = (
  finishDispatch: React.Dispatch<Action>,
  todoDispatch: React.Dispatch<Action>
) => {
  console.log("load");
  const clearResult: FinishDataType[] = JSON.parse(
    localStorage.getItem("clearDB") || "[]"
  );
  const result: todoItem[] = JSON.parse(
    localStorage.getItem("saveList") || "[]"
  );

  if (clearResult.length > 0) {
    finishDispatch(successDate(clearResult));
  }
  const cookieCheck = document.cookie;

  if (result.length > 0 && cookieCheck.includes("one-daylist")) {
    todoDispatch(createPost(result));
  }
};

export const dayMemo = (creation: string) => {
  console.log("day");
  const parseCreation: dateType = JSON.parse(creation || "{}");
  //생성 날짜를 불러옴
  if (Object.entries(parseCreation).length > 0) {
    const start = new Date(
      `${parseCreation.year},${parseCreation.month},
          ${parseCreation.date - 1}`
    );
    // 생성일자
    const diff = +new Date() - +start;
    // 현재 일에서 생성일자를 뺌
    const nowDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / nowDay);
  }
};

export function datafetchCheck(navigate?: any) {
  const dataCheck = setInterval(() => {
    console.log("interval");
    const date = localStorage.getItem("creationDay");
    const name = localStorage.getItem("currentUser");
    if (date === null || name === null) {
      localStorage.clear();
      if (navigate && typeof navigate === "function") {
        navigate("/login");
      }
    }
  }, 30000);
  return dataCheck;
  //이거 프로미스로 catch문 할까
}
