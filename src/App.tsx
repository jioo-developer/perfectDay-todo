import { useCallback, useEffect, useMemo } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
import Notification from "./components/Notification";
import { useMyContext } from "./module/MyContext";
import { datafetchCheck, loadData } from "./module/exportFunction";

const App = () => {
  const { issue, successDate, finishDispatch, todoDispatch } = useMyContext();
  const location = useLocation();
  const memoizedValue = useMemo(
    () => ({
      issue,
      successDate,
      finishDispatch,
      todoDispatch,
    }),
    [issue, successDate, finishDispatch, todoDispatch]
  );
  const creation = localStorage.getItem("creationDay") || null;
  const currentUser = localStorage.getItem("currentUser") || null;

  // 데이터 로드

  const memoizeLoadData = useCallback(() => {
    loadData(
      memoizedValue.finishDispatch,
      memoizedValue.todoDispatch,
      location.pathname
    );
  }, []);

  useEffect(() => {
    memoizeLoadData();
  }, [memoizeLoadData]);

  useEffect(() => {
    const dataCheckInterval = datafetchCheck();
    if (location.pathname === "/sign") {
      clearInterval(dataCheckInterval);
    }
    return () => clearInterval(dataCheckInterval);
  }, [location.pathname]);

  return (
    <div className="wrap">
      {currentUser !== null && creation !== null ? (
        <Header location={location.pathname} />
      ) : null}
      <div className="de-in-wrap">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                currentUser={currentUser}
                creation={creation}
                location={location.pathname}
              />
            }
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
        <MainFooter location={location.pathname} />
      ) : null}
      {memoizedValue.issue ? <Notification /> : null}
    </div>
  );
};

export default App;
