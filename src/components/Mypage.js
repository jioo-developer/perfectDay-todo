import React, { useState } from "react";
import "../asset/mypage.scss";
import Rank from "./rank";

function MyPage({ navigate, dispatch, loadCharacter, currentUser }) {
  const [rankToggle, setRank] = useState(false);
  // 프로필 데이터가 저장 되 있는지 확인하는 함수

  function rankToggleFunc() {
    setRank(!rankToggle);
  }

  function rankSwitch(value) {
    setRank(value);
  }

  // 프로필 데이터가 저장 되 있는지 확인하는 함수

  return (
    <>
      <div className="mypage">
        <section className="section_1  pd-x20">
          <div className="profile_wrap">
            <h3 className="myName">
              <b>{currentUser}</b>님은
            </h3>
            <p className="myRank">초보완벽러 이십니다!</p>
            <span>MY RANK</span>
          </div>
          <figure className="profile_img">
            <img src={`/img/profile${loadCharacter}.svg`} alt="" />
          </figure>
        </section>

        <section className="section_2">
          <ul className="tab_menu">
            <li onClick={() => navigate("/profile")}>
              프로필이미지변경
              <img src="/img/my_arrow.svg" alt="" />
            </li>
            <li onClick={rankToggleFunc}>
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
                  window.location.reload();
                }
              }}
            >
              리셋
              <img src="/img/my_arrow.svg" alt="" />
            </li>
          </ul>
        </section>
        {rankToggle ? (
          <Rank dispatch={dispatch} rankSwitch={rankSwitch} />
        ) : null}
      </div>
    </>
  );
}

export default MyPage;
