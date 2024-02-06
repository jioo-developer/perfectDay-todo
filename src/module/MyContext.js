// MyContext.js

import React, { createContext, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyContext = createContext({ navigate: () => {}, dispatch: () => {} });

export const MyContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <MyContext.Provider value={{ navigate, dispatch }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
