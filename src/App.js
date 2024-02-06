import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
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
import { useSelector } from "react-redux";
import { MyContextProvider, useMyContext } from "./module/MyContext";
function App() {
  const USER_ID = "currentUser";
  const { navigate } = useMyContext();
  const creation = localStorage.getItem("creationDay");
  const currentUser = localStorage.getItem(USER_ID);
  const stateCharacter = useSelector((state) => state.profile);
  const localCharacter = localStorage.getItem("profile");
  const location = window.location.pathname;
  const initialMount = useSelector((state) => state.mountState);
  // 할일 list

  useEffect(() => {
    if (currentUser === null || creation === null) {
      navigate("/login");
    } else {
      if (!initialMount && location !== "/") {
        navigate("/");
      }
    }
  }, []);

  function footer(location) {
    if (currentUser !== null || creation != null) {
      return <MainFooter location={location} />;
    } else return null;
  }

  function header(location) {
    if (currentUser !== null || creation != null)
      return <Header location={location} />;
    else return null;
  }
  return (
    <MyContextProvider>
      <div className="wrap">
        {header(location)}
        <div className="de-in-wrap">
          <Routes>
            <Route
              path="/"
              element={<Home currentUser={currentUser} creation={creation} />}
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/mypage"
              element={
                <MyPage
                  currentUser={currentUser}
                  loadCharacter={
                    localCharacter === null ? stateCharacter : localCharacter
                  }
                />
              }
            />
            <Route path="/introduce" element={<Introduce />} />
            <Route
              path="/profile"
              element={
                <Profile
                  loadCharacter={
                    localCharacter === null ? stateCharacter : localCharacter
                  }
                />
              }
            />
            <Route path="/canlendar" element={<Calendar />} />
          </Routes>
        </div>
        {footer(location)}
      </div>
    </MyContextProvider>
  );
}

export default App;
