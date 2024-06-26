import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./reset.css";
import "./App.scss";
import Login from "./components/Login";
import Home from "./components/Home";
import MyPage from "./components/Mypage";
import Introduce from "./components/introduce";
import Profile from "./components/profile";
import MainFooter from "./components/mainFooter";
import Header from "./components/header";
import Notification from "./components/Notification";
import { useMyContext } from "./module/MyContext";
import { datafetchCheck, loadData } from "./module/exportFunction";
import MyCalendar from "./components/MyCalendar";

const App = () => {
  const location = useLocation();

  const { issue, finishDispatch, todoDispatch, navigate } = useMyContext();
  const creation = localStorage.getItem("creationDay") || null;
  const currentUser = localStorage.getItem("currentUser") || null;

  useEffect(() => {
    loadData(finishDispatch, todoDispatch);
  }, []);

  useEffect(() => {
    const dataCheckInterval = datafetchCheck(navigate);
    if (location.pathname === "/sign") {
      clearInterval(dataCheckInterval);
    }
    return () => clearInterval(dataCheckInterval);
  }, []);

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
          <Route path="/canlendar" element={<MyCalendar />} />
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
