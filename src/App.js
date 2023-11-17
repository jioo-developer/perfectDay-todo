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
import Header from "./components/header";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const USER_ID = "currentUser";
  const creation = localStorage.getItem("creationDay");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = localStorage.getItem(USER_ID);
  const stateCharacter = useSelector((state) => state.Profile);
  const localCharacter = localStorage.getItem("profile");
  // 할일 list

  useEffect(() => {
    if (currentUser === null || creation === null) navigate("/login");
  }, []);

  function footer(navigate, dispatch) {
    if (currentUser !== null || creation != null) {
      return <MainFooter navigate={navigate} dispatch={dispatch} />;
    } else return null;
  }

  function header(dispatch, navigate) {
    if (currentUser !== null || creation != null)
      return <Header dispatch={dispatch} navigate={navigate} />;
    else return null;
  }
  return (
    <div className="wrap">
      {header(dispatch, navigate)}
      <div className="de-in-wrap">
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
          <Route path="/login" element={<Login navigate={navigate} />} />
          <Route
            path="/mypage"
            element={
              <MyPage
                currentUser={currentUser}
                dispatch={dispatch}
                navigate={navigate}
                loadCharacter={
                  localCharacter === null ? stateCharacter : localCharacter
                }
              />
            }
          />
          <Route
            path="/introduce"
            element={<Introduce navigate={navigate} />}
          />
          <Route
            path="/profile"
            element={
              <Profile
                dispatch={dispatch}
                navigate={navigate}
                loadCharacter={
                  localCharacter === null ? stateCharacter : localCharacter
                }
              />
            }
          />
          <Route path="/canlendar" element={<Calendar />} />
        </Routes>
      </div>
      {footer(navigate, dispatch)}
    </div>
  );
}

export default App;
