import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Clock from "./clock";
import { issueAction } from "../module/reducer";
function Header() {
  const location = window.location.pathname;
  const issueBell = useSelector((state) => state.report);
  const dispatch = useDispatch();
  return (
    <header className="main_header pd-x20">
      <Clock />
      <div className="title_header">
        {location === "/" ? (
          <Link to="/Mypage" className="main_nav">
            <img src="./img/nav.svg" alt="nav" />
          </Link>
        ) : null}
        <p className="main_titles">
          {location === "/"
            ? "완벽한 하루"
            : location === "/Mypage"
            ? "마이페이지"
            : location === "/canlendar"
            ? "캘린더"
            : location === "/profile"
            ? "프로필변경"
            : null}
        </p>
       <img
            src= {issueBell ? "/img/bell.svg" : "/img/no_bell.svg" }
            alt="bell"
	          className={issueBell === false ? "down" :null}
            onClick={() => dispatch(issueAction())}
            style={{ marginTop: "-6px" }}
          />
      </div>
    </header>
  );
}

export default Header;
