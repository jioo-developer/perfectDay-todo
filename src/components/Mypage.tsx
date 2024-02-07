import { useState } from "react";
import "../asset/mypage.scss";
import Rank from "./rank";
import { useMyContext } from "../module/MyContext";

type props = {
  currentUser: string | null;
};

function MyPage({ currentUser }: props) {
  const { navigate } = useMyContext();
  const rankSystem = localStorage.getItem("rank");
  const [rankToggle, setRank] = useState(false);
  const localCharacter: number = parseInt(
    localStorage.getItem("profile") || "1"
  );
  console.log(Object.entries(localCharacter).length);

  // 프로필 데이터가 저장 되 있는지 확인하는 함수

  function rankToggleFunc() {
    setRank((prev) => !prev);
  }

  function rankSwitch(value: boolean) {
    setRank(value);
  }

  function rankLogic(rankSystem: any): [string, string] | undefined {
    if (rankSystem) {
      const num = parseInt(rankSystem, 10);
      let rankColor: string;
      if (num >= 100) {
        rankColor = "goldenrod";
        return ["프로완벽러", rankColor];
      } else if (num >= 50) {
        rankColor = "#8f8f8f";
        return ["끈기완벽러", rankColor];
      } else {
        rankColor = "brown";
        return ["초보완벽러", rankColor];
      }
    }
  }

  const rankData = rankLogic(rankSystem);
  // 프로필 데이터가 저장 되 있는지 확인하는 함수

  return (
    <>
      <div className="mypage">
        <section className="section_1  pd-x20">
          <div className="profile_wrap">
            <h3 className="myName">
              <b>{currentUser}</b>님은
            </h3>
            <p className="myRank">
              {rankData ? rankData[0] : "초보완벽러"}이십니다.
            </p>
            <div className="rank-txt">
              <b className="rank-T">MY RANK :</b>
              <b
                className="rank-T"
                style={{ color: rankData ? rankData[1] : "brown" }}
              >
                {rankData ? rankData[0] : "초보완벽러"}
              </b>
            </div>
          </div>
          <figure className="profile_img">
            <img src={`/img/profile${localCharacter}.svg`} alt="" />
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
                const nickChange =
                  window.prompt("변경 할 닉네임을 입력해주세요");
                if (nickChange) {
                  localStorage.removeItem("currentUser");
                  localStorage.setItem("currentUser", nickChange);
                  window.location.reload();
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
        {rankToggle ? <Rank rankSwitch={rankSwitch} /> : null}
      </div>
    </>
  );
}

export default MyPage;
