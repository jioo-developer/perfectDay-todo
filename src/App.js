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
function App() {
  const USER_ID = "currentUser";
  const creation = "creationDay";
  const navigate = useNavigate();
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
        element={<Home currentUser={currentUser} creation={creation} />}
      />
      <Route
        path="/login"
        element={<Login USER_ID={USER_ID} creation={creation} />}
      />
      <Route path="/loading" element={<Loading />} />
      <Route path="/mypage" element={<MyPage USER_ID={USER_ID} />} />
      <Route path="/introduce" element={<Introduce />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/canlendar" element={<Calendar />} />
    </Routes>
  );
}

export default App;
