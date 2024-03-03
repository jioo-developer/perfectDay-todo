import {
  FinishDataType,
  PostPromiseType,
  dateType,
  todoItem,
} from "./interfaceModule";
import { calendarFunc, createPost, successDate } from "./reducer";
import { useCallback } from "react";

export const loadData = (dispatch: any) => {
  const clearResult: FinishDataType = JSON.parse(
    localStorage.getItem("clearDB") || "{}"
  );
  const result: todoItem = JSON.parse(localStorage.getItem("saveList") || "{}");
  const calendarResult: PostPromiseType = JSON.parse(
    localStorage.getItem("calendarList") || "{}"
  );

  if (Object.entries(clearResult).length > 0) {
    dispatch(successDate(clearResult));
  }
  if (Object.entries(result).length > 0) {
    dispatch(createPost(result));
  }

  if (Object.entries(calendarResult).length > 0) {
    dispatch(calendarFunc(calendarResult));
  }
};
const creation: string | null = localStorage.getItem("creationDay") || null;

export const dayMemo = useCallback(
  (creation: string) => {
    if (creation !== null) {
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
    } else {
      window.location.reload();
    }
  },
  [creation]
);
