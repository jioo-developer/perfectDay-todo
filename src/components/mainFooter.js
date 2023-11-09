import React from "react";
import "../reset.css";
import "../App.scss";
import { EditorAction } from "../module/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MainFooter() {
  const location = window.location.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todolist = useSelector((state) => state.Todo);
  return (
    <footer className="footer_bar">
      {location === "/" ? (
        <button
          onClick={() => {
            if (todolist.length >= 10) {
              window.alert("생성가능한 갯수를 초과하였습니다");
            } else {
              dispatch(EditorAction());
            }
          }}
        >
          <img src="/img/adds.svg" alt="add" />
        </button>
      ) : null}
      <div
        className="home f-con"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src="/img/home.svg" alt="home" />
        <p>홈</p>
      </div>
      <div
        className="calendar f-con"
        onClick={() => {
          navigate("/canlendar");
        }}
      >
        <img src="/img/calendar.svg" alt="calendar" />
        <p>캘린더</p>
      </div>
    </footer>
  );
}

export default MainFooter;
