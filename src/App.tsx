import { useEffect, useReducer, useState } from "react";
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
import reducer, { initialState, typeObject } from "./module/reducer";
import Notification from "./components/Notification";
import { useMyContext } from "./module/MyContext";
import { datafetchCheck, dayMemo, loadData } from "./module/exportFunction";

const App = () => {
  const [prevData, setPrev] = useState<any>([]);
  const [finishBoolean, setboolean] = useState(false);
  const [mountState, Mountdispatch] = useReducer(reducer, initialState);

  const { navigate, issue, successDate } = useMyContext();

  const creation = localStorage.getItem("creationDay") || null;
  const currentUser = localStorage.getItem("currentUser") || null;
  const location: string = window.location.pathname;

  datafetchCheck(navigate("/login"));

  if (location === "/login") {
    clearInterval(datafetchCheck());
  }

  // 데이터 로드

  function emitFunc(value: boolean) {
    setboolean(value);
  }

  useEffect(() => {
    if (currentUser === null || creation === null) {
      navigate("/login");
    } else {
      if (!mountState && location !== "/") {
        navigate("/");
      } else {
        Mountdispatch({ type: typeObject.Mount });
        dayMemo(creation);
        loadData();
      }
    }
  }, []);

  useEffect(() => {
    if (successDate) setPrev(successDate);
  }, [successDate]);

  useEffect(() => {
    if (prevData !== null) {
      if (Object.entries(prevData).length > 0 && prevData !== successDate) {
        setboolean((prev) => !prev);
      }
    }
  }, [successDate, prevData]);

  // useEffect

  return (
    <div className="wrap">
      {currentUser !== null && creation !== null ? (
        <Header location={location} finishBoolean={finishBoolean} />
      ) : null}
      <div className="de-in-wrap">
        <Routes>
          <Route
            path="/"
            element={<Home currentUser={currentUser} creation={creation} />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/mypage"
            element={<MyPage currentUser={currentUser} />}
          />
          <Route path="/introduce" element={<Introduce />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/canlendar" element={<Calendar />} />
        </Routes>
      </div>
      {currentUser !== null && creation !== null ? (
        <MainFooter location={location} />
      ) : null}
      {issue ? <Notification emitFunc={emitFunc} /> : null}
    </div>
  );
};

export default App;
