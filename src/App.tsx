import { useEffect, useState } from "react";
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
import {
  FirstMount,
  calendarFunc,
  createPost,
  successDate,
} from "./module/reducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Notification from "./components/Notification";

type successType = {
  successDate: FinishDataType[];
};

const App = () => {
  const appNavigate = useNavigate();
  const appDispatch = useDispatch();
  const creation: string | null = localStorage.getItem("creationDay") || null;
  const currentUser: string | null =
    localStorage.getItem("currentUser") || null;
  const location: string = window.location.pathname;
  const initialMount = useSelector((state: RootState) => state.mountState);
  const finishData = useSelector((state: successType) => state.successDate);
  const issueState = useSelector((state: RootState) => state.issue);
  const todoList = useSelector((state: RootState) => state.todoList);
  const [prevData, setPrev] = useState<any>(null);
  const [finishBoolean, setboolean] = useState(false);

  const dataCheck = setInterval(() => {
    const date = localStorage.getItem("creationDay");
    const name = localStorage.getItem("currentUser");
    if (date === null || name === null) {
      localStorage.clear();
      appNavigate("/login");
    }
  }, 60000);

  if (location === "/login") {
    clearInterval(dataCheck);
  }

  const dayMemo = () => {
    if (creation !== null) {
      const parseCreation: dateType = JSON.parse(creation || "{}");
      //생성 날짜를 불러옴
      if (Object.entries(parseCreation).length > 0) {
        const start = new Date(
          `${parseCreation.year},${parseCreation.month},
            ${parseCreation.date - 1}`
        );
        // 생성일자
        const diff = +new Date() - +start;
        // 현재 일에서 생성일자를 뺌
        const nowDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / nowDay);
      }
    } else {
      window.location.reload();
    }
  };

  const loadData = () => {
    const clearResult: FinishDataType = JSON.parse(
      localStorage.getItem("clearDB") || "{}"
    );
    const result: todoItem = JSON.parse(
      localStorage.getItem("saveList") || "{}"
    );
    const calendarResult: PostPromiseType = JSON.parse(
      localStorage.getItem("calendarList") || "{}"
    );

    if (Object.entries(clearResult).length > 0) {
      appDispatch(successDate(clearResult));
    }
    if (Object.entries(result).length > 0) {
      appDispatch(createPost(result));
    }

    if (Object.entries(calendarResult).length > 0) {
      appDispatch(calendarFunc(calendarResult));
    }
  };

  function emitFunc(value: boolean) {
    setboolean(value);
  }

  useEffect(() => {
    if (!initialMount) {
      appDispatch(FirstMount());
      dayMemo();
      loadData();
    }
    if (currentUser === null || creation === null) {
      appNavigate("/login");
    } else {
      if (!initialMount && location !== "/") {
        appNavigate("/");
      }
    }
  }, []);

  useEffect(() => {
    setPrev(finishData);
  }, [finishData]);

  useEffect(() => {
    if (prevData !== null) {
      if (Object.entries(prevData).length > 0 && prevData !== finishData) {
        setboolean((prev) => !prev);
      }
    } else if (prevData === null) {
      setPrev({});
    }
  }, [finishData, prevData]);

  return (
    <MyContextProvider>
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
    </MyContextProvider>
  );
};

export default App;
