import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../reset.css";
import "../asset/mypage.scss";
import Rank from "./rank";

function MyPage({ USER_ID, navigate, dispatch }) {
  const user = localStorage.getItem(USER_ID);
  const [profile, setprofile] = useState(0);
  // 프로필 데이터가 저장 되 있는지 확인하는 함수

  useEffect(() => {
    const loadCharacter = localStorage.getItem("profile-id");
    setprofile(loadCharacter);
  }, []);

  // 프로필 데이터가 저장 되 있는지 확인하는 함수

  return (
    <>
      <div className="mypage">
        <section className="section_1  pd-x20">
          <div className="profile_wrap">
            <h3 className="myName">
              <b>{user}</b>님은
            </h3>
            <p className="myRank">초보완벽러 이십니다!</p>
            <span>MY RANK</span>
          </div>
          <figure className="profile_img">
            <img src={`/img/profile${profile}.svg`} alt="" />
          </figure>
        </section>

        <section className="section_2">
          <ul className="tab_menu">
            <li onClick={() => navigate("/profile")}>
              프로필이미지변경
              <img src="/img/my_arrow.svg" alt="" />
            </li>
            <li>
              등급표
              <img src="/img/my_arrow.svg" alt="" />
            </li>
            <li onClick={() => navigate("/introduce")}>
              개발자인사
              <img src="/img/my_arrow.svg" alt="" />
            </li>
            <li
              onClick={() => {
                if (window.confirm("닉네임을 변경합니다")) {
                  localStorage.removeItem("currentUser");
                  navigate("/login");
                } else {
                  console.log("---------");
                }
              }}
            >
              닉네임변경
              <img src="/img/my_arrow.svg" alt="" />
            </li>
            <li
              onClick={() => {
                if (window.confirm("리셋을 시작합니다")) {
                  window.localStorage.clear();
                  navigate("/login");
                } else {
                  console.log("---------");
                }
              }}
            >
              리셋
              <img src="/img/my_arrow.svg" alt="" />
            </li>
          </ul>
        </section>
        <Rank dispatch={dispatch} />
      </div>
    </>
  );
}

export default MyPage;
