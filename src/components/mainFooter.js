import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../reset.css";
import "../App.scss";
import { EditorAction } from "..";

function MainFooter(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = window.location.pathname;
  return (
    <footer className="footer_bar">
      {location === "/" ? (
        <button
          onClick={() => {
            if (props.todolist.length >= 6) {
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
