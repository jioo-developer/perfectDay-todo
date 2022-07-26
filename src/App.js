import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import "./reset.css";
import "./App.scss";
import Loading from "./components/loading";
import Login from "./components/Login";
import Home from "./components/Home";
import MyPage from "./components/Mypage";
import Introduce from "./components/introduce";
import Profile from "./components/profile";
import Calendar from "./components/calendar";
import { useDispatch } from "react-redux";
function App() {
  const USER_ID = "currentUser";
  const creation = "creationDay";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = localStorage.getItem(USER_ID);

  useEffect(() => {
    if (currentUser === null) {
      navigate("/login");
    } else {
      navigate("/loading");
    }
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            currentUser={currentUser}
            creation={creation}
            dispatch={dispatch}
          />
        }
      />
      <Route
        path="/login"
        element={
          <Login USER_ID={USER_ID} creation={creation} navigate={navigate} />
        }
      />
      <Route path="/loading" element={<Loading navigate={navigate} />} />
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
  );
}

export default App;
