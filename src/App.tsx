import { useCallback, useEffect, useState } from "react";
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
import { FirstMount } from "./module/reducer";
import Notification from "./components/Notification";
import { useMyContext } from "./module/MyContext";
import { dayMemo, loadData } from "./module/exportFunction";

const App = () => {
  const [prevData, setPrev] = useState<any>([]);
  const [finishBoolean, setboolean] = useState(false);

  const { navigate, dispatch } = useMyContext();

  const dataCheck = setInterval(() => {
    const date = localStorage.getItem("creationDay");
    const name = localStorage.getItem("currentUser");
    if (date === null || name === null) {
      localStorage.clear();
      navigate("/login");
    }
  }, 30000);
  //이거 프로미스로 catch문 할까

  if (location === "/login") {
    clearInterval(dataCheck);
  }

  function emitFunc(value: boolean) {
    setboolean(value);
  }

  useEffect(() => {
    if (!initialMount) {
      dispatch(FirstMount());
      dayMemo(creation);
      loadData(dispatch);
    }
    if (currentUser === null || creation === null) {
      navigate("/login");
    } else {
      if (!initialMount && location !== "/") {
        navigate("/");
      }
    }
  }, [
    creation,
    currentUser,
    dayMemo,
    dispatch,
    initialMount,
    location,
    navigate,
  ]);

  useEffect(() => {
    if (finishData) setPrev(finishData);
  }, [finishData]);

  useEffect(() => {
    if (prevData !== null) {
      if (Object.entries(prevData).length > 0 && prevData !== finishData) {
        setboolean((prev) => !prev);
      }
    }
  }, [finishData, prevData]);

  return (
    <div className="wrap">
      {currentUser !== null && creation !== null ? (
        <Header location={location} finishBoolean={finishBoolean} />
      ) : null}
      <div className="de-in-wrap">
        <Routes>
          <Route
            path="/"
            element={<Home currentUser={currentUser} dayMemo={dayMemo()} />}
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
        <MainFooter location={location} todoList={todoList} />
      ) : null}
      {issueState ? (
        <Notification finishData={finishData} emitFunc={emitFunc} />
      ) : null}
    </div>
  );
};

export default App;
