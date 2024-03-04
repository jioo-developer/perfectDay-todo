// MyContext.ts

import React, { ReactNode, createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import reducer, { Action, initialState } from "./reducer";
import { DateFac, todoItem } from "./interfaceModule";

// provider 생성 ↓
export const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [issueState, issueDispatch] = useReducer(reducer, initialState);
  const { issue } = issueState;
  //알림창에 관련된 상태관리
  const [finishData, finishDispatch] = useReducer(reducer, initialState);
  const { successDate } = finishData;
  //완료된 일정에 대한 상태관리
  const [todo, todoDispatch] = useReducer(reducer, initialState);
  const { todoList } = todo;
  // 리스트에 대한 상태관리
  const [toggleState, editDispatch] = useReducer(reducer, initialState);
  const { editorSwitch } = toggleState;
  // 에디터 토글 상태관리

  return (
    <MyContext.Provider
      value={{
        navigate,
        issue,
        issueDispatch,
        successDate,
        finishDispatch,
        todoList,
        todoDispatch,
        editorSwitch,
        editDispatch,
      }}
    >
      {/* 중괄호 두번이 관습 */}
      {children}
    </MyContext.Provider>
  );
};

export type MyContextProps = {
  navigate: (params: string) => void;
  issue: boolean;
  issueDispatch: React.Dispatch<Action>;
  successDate: DateFac[];
  finishDispatch: React.Dispatch<Action>;
  todoList: todoItem[];
  todoDispatch: React.Dispatch<Action>;
  editorSwitch: boolean;
  editDispatch: React.Dispatch<Action>;
};

const MyContext = createContext<MyContextProps>({
  navigate: () => {},
  issue: initialState.issue,
  issueDispatch: () => {},
  successDate: initialState.successDate,
  finishDispatch: () => {},
  todoList: initialState.todoList,
  todoDispatch: () => {},
  editorSwitch: initialState.editorSwitch,
  editDispatch: () => {},
});
// provider value에 들어가는 것들의 initiail 기본값

// create 생성 ↑

export const useMyContext = (): MyContextProps => {
  return useContext(MyContext);
};
