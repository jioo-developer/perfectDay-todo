import React, { useState } from "react";
import "../asset/mypage.scss";
import Rank from "./rank";

function MyPage({ navigate, dispatch, loadCharacter, currentUser }) {
  const [rankToggle, setRank] = useState(false);
  let rankSystem = localStorage.getItem("rank");
  let rankData = "";
  // 프로필 데이터가 저장 되 있는지 확인하는 함수

  function rankToggleFunc() {
    setRank(!rankToggle);
  }

  function rankSwitch(value) {
    setRank(value);
  }

  function rankLogic() {
    rankSystem = parseInt(rankSystem);
    let rankColor;
    if (rankSystem >= 100) {
      rankColor = "goldenrod";
      return ["프로완벽러", rankColor];
    } else if (rankSystem >= 50) {
      rankColor = "#8f8f8f";
      return ["끈기완벽러", rankColor];
    } else {
      rankColor = "brown";
      return ["초보완벽러", rankColor];
    }
  }

  rankData = rankLogic();

  // 프로필 데이터가 저장 되 있는지 확인하는 함수

  return (
    <>
      <div className="mypage">
        <section className="section_1  pd-x20">
          <div className="profile_wrap">
            <h3 className="myName">
              <b>{currentUser}</b>님은
            </h3>
            <p className="myRank">{rankData[0]}이십니다.</p>

            <div className="rank-txt">
              <b className="rank-T">MY RANK :</b>
              <b className="rank-T" style={{ color: rankData[1] }}>
                {rankData[0]}
              </b>
            </div>
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
