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
import { MyContextProvider, useMyContext } from "./module/MyContext";

type RootState = {
  mountState: boolean;
};

const App = () => {
  const { navigate } = useMyContext();
  const creation: string | null = localStorage.getItem("creationDay") || null;
  const currentUser: string | null =
    localStorage.getItem("currentUser") || null;
  const location: string = window.location.pathname;
  const initialMount = useSelector((state: RootState) => state.mountState);
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
