import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Clock from "./clock";
import { issueAction } from "..";
function Header() {
  const location = window.location.pathname;
  const issueBell = useSelector((state) => state.report);
  const dispatch = useDispatch();
  return (
    <header className="main_header">
      <Clock />
      <div className="title_header">
        {location === "/" ? (
          <Link to="/Mypage" className="main_nav">
            <img src="./img/nav.svg" alt="nav" />
          </Link>
        ) : (
          <Link to="/" className="header_nav">
            <div
              style={{
                color: "#f7b237",
                fontFamily: "AppleSDGothicNeoSB",
              }}
            >
              &lt;
            </div>
          </Link>
        )}
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
        {issueBell ? (
          <img
            src="/img/bell.svg"
            alt="bell"
            onClick={() => dispatch(issueAction())}
            style={{ marginTop: "-6px" }}
          />
        ) : (
          <img
            src="/img/no_bell.svg"
            alt="bell"
            className="down"
            style={{ marginTop: "-6px" }}
            onClick={() => dispatch(issueAction())}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
