// MyContext.ts

import React, { ReactNode, createContext, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type MyContextProps = {
  navigate: (params: string) => void;
  dispatch: (params: any) => void;
};

type MyContextProviderProps = {
  children: ReactNode;
};

const MyContext = createContext<MyContextProps>({
  navigate: () => {},
  dispatch: () => {},
});

export const MyContextProvider = ({
  children,
}: MyContextProviderProps): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <MyContext.Provider value={{ navigate, dispatch }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = (): MyContextProps => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }

  return context;
};
