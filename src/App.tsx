import { useEffect } from "react";
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

const App = () => {
  const creation: string | null = localStorage.getItem("creationDay") || null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser: string | null =
    localStorage.getItem("currentUser") || null;
  const stateCharacter: number = useSelector(
    (state: RootState) => state.Profile
  );
  const localCharacter: number = parseInt(
    localStorage.getItem("profile") || "{}"
  );
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

  function footer({ navigate, dispatch, location }: functionProps) {
    if (currentUser !== null || creation !== null) {
      return (
        <MainFooter
          navigate={navigate}
          dispatch={dispatch}
          location={location}
        />
      );
    } else return null;
  }

  function header({ navigate, dispatch, location }: functionProps) {
    if (currentUser !== null || creation !== null)
      return (
        <Header dispatch={dispatch} navigate={navigate} location={location} />
      );
    else return null;
  }
  return (
    <div className="wrap">
      {header({ dispatch, navigate, location })}
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
          <Route path="/canlendar" element={<Calendar dispatch={dispatch} />} />
        </Routes>
      </div>
      {footer({ navigate, dispatch, location })}
    </div>
  );
};

export default App;
