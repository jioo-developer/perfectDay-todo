import { useEffect } from "react";
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
import { MyContextProvider } from "./module/MyContext";
import { FirstMount } from "./module/reducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type RootState = {
  mountState: boolean;
};

const App = () => {
  const appNavigate = useNavigate();
  const appDispatch = useDispatch();
  const creation: string | null = localStorage.getItem("creationDay") || null;
  const currentUser: string | null =
    localStorage.getItem("currentUser") || null;
  const location: string = window.location.pathname;
  const initialMount = useSelector((state: RootState) => state.mountState);
  // 할일 list

  const dataCheck = setInterval(() => {
    const date = localStorage.getItem("creationDay");
    const name = localStorage.getItem("currentUser");
    if (date === null || name === null) {
      localStorage.clear();
      appNavigate("/login");
    } else {
    }
  }, 60000);

  if (location === "/login") {
    clearInterval(dataCheck);
  }

  useEffect(() => {
    if (!initialMount) {
      appDispatch(FirstMount());
    }
    if (currentUser === null || creation === null) {
      appNavigate("/login");
    } else {
      if (!initialMount && location !== "/") {
        appNavigate("/");
      }
    }
  }, []);

  return (
    <MyContextProvider>
      <div className="wrap">
        {currentUser !== null || creation !== null ? (
          <Header location={location} />
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
        {currentUser !== null || creation !== null ? (
          <MainFooter location={location} />
        ) : null}
      </div>
    </MyContextProvider>
  );
};

export default App;
