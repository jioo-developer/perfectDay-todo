// MyContext.ts

import React, { ReactNode, createContext, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// provider 생성 ↓
export const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <MyContext.Provider value={{ navigate, dispatch }}>
      {/* 중괄호 두번이 관습 */}
      {children}
    </MyContext.Provider>
  );
};

export type MyContextProps = {
  navigate: (params: string) => void;
  dispatch: (params: any) => void;
};

const MyContext = createContext<MyContextProps>({
  navigate: () => {},
  dispatch: () => {},
});
// provider value에 들어가는 것들의 initiail 기본값

// create 생성 ↑

export const useMyContext = (): MyContextProps => {
  return useContext(MyContext);
};
