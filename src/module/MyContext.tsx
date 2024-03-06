// MyContext.ts

import React, {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import reducer, { Action, initialState } from "./reducer";
import { DateFac, todoItem } from "./interfaceModule";

// provider 생성 ↓
export const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [finishData, finishDispatch] = useReducer(reducer, initialState);
  const successDate = finishData.successDate;
  //완료된 일정에 대한 상태관리
  const [todo, todoDispatch] = useReducer(reducer, initialState);
  const todoList = todo.todoList.filter((value, idx, arr) => {
    return (
      arr.findIndex((item) => {
        return (
          item.write === value.write &&
          item.writeH === value.writeH &&
          item.writeM === value.writeM
        );
      }) === idx
    );
  });
  // 리스트에 대한 상태관리
  const [editorSwitch, editDispatch] = useState(false);
  // 에디터 토글 상태관리
  const [issue, issueDispatch] = useState(false);
  const [bellToggle, setBell] = useState(false);
  //알림창에 관련된 상태관리

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
        bellToggle,
        setBell,
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
  successDate: DateFac[];
  issueDispatch: React.Dispatch<React.SetStateAction<boolean>>;
  finishDispatch: React.Dispatch<Action>;
  todoList: todoItem[];
  todoDispatch: React.Dispatch<Action>;
  editorSwitch: boolean;
  editDispatch: React.Dispatch<React.SetStateAction<boolean>>;
  bellToggle: boolean;
  setBell: React.Dispatch<React.SetStateAction<boolean>>;
};

const MyContext = createContext<MyContextProps>({
  navigate: () => {},
  issue: false,
  issueDispatch: () => {},
  successDate: initialState.successDate,
  finishDispatch: () => {},
  todoList: initialState.todoList,
  todoDispatch: () => {},
  editorSwitch: false,
  editDispatch: () => {},
  bellToggle: false,
  setBell: () => {},
});
// provider value에 들어가는 것들의 initiail 기본값

// create 생성 ↑

export const useMyContext = (): MyContextProps => {
  return useContext(MyContext);
};
