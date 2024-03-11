import { useCallback, useEffect } from "react";
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
  const location = useLocation();

  const { issue, finishDispatch, todoDispatch } = useMyContext();
  const creation = localStorage.getItem("creationDay") || null;
  const currentUser = localStorage.getItem("currentUser") || null;

  const memoizeLoadData = useCallback(() => {
    loadData(finishDispatch, todoDispatch);
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
        <MainFooter location={location.pathname} />
      ) : null}
      {issue ? <Notification /> : null}
    </div>
  );
};

export default App;
