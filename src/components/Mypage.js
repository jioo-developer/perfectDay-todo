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
    <div>
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
            <li
              onClick={() => {
                navigate("/profile");
              }}
            >
              프로필이미지변경
              <img src="/img/my_arrow.svg" alt="" />
            </li>
            <li>
              {/* onClick={() => dispatch(rankAction())} */}
              등급표
              <img src="/img/my_arrow.svg" alt="" />
            </li>
            <li>
              <Link to="/introduce">
                개발자인사
                <img src="/img/my_arrow.svg" alt="" />
              </Link>
            </li>
            <li
              onClick={() => {
                localStorage.removeItem("currentUser");
                localStorage.removeItem("creationDay");
                navigate("/login");
              }}
            >
              닉네임변경
              <img src="/img/my_arrow.svg" alt="" />
            </li>
          </ul>
        </section>
        {/* <Rank dispatch={dispatch} /> */}
      </div>
    </div>
  );
}

export default MyPage;
