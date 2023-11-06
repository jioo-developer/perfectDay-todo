import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import "./reset.css";
import "./App.scss";
import Login from "./components/Login";
import Home from "./components/Home";
import MyPage from "./components/Mypage";
import Introduce from "./components/introduce";
import Profile from "./components/profile";
import Calendar from "./components/calendar";
import MainFooter from "./components/mainFooter";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/header";
function App() {
  const USER_ID = "currentUser";
  const creation = "creationDay";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = localStorage.getItem(USER_ID);

  const todolist = useSelector((state) => state.Todo);
  // 할일 list

  useEffect(() => {
    if (currentUser === null) {
      navigate("/login");
    }
  }, []);

  function footer() {
    if (currentUser !== null) {
      return <MainFooter todolist={todolist} />;
    } else return null;
  }

  function header() {
    if (currentUser !== null) return <Header />;
    else return null;
  }
  return (
    <div class="wrap">
      {header()}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              currentUser={currentUser}
              creation={creation}
              dispatch={dispatch}
              todolist={todolist}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login USER_ID={USER_ID} creation={creation} navigate={navigate} />
          }
        />
        <Route
          path="/mypage"
          element={
            <MyPage USER_ID={USER_ID} dispatch={dispatch} navigate={navigate} />
          }
        />
        <Route path="/introduce" element={<Introduce navigate={navigate} />} />
        <Route
          path="/profile"
          element={<Profile dispatch={dispatch} navigate={navigate} />}
        />
        <Route path="/canlendar" element={<Calendar />} />
      </Routes>
      {footer()}
    </div>
  );
}

export default App;
