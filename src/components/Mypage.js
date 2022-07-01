import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../reset.css";
import "../asset/mypage.scss";
import Header from "./header";
import MainFooter from "./mainFooter";
import Rank from "./rank";
import { useDispatch, useSelector } from "react-redux";
import { ProfileAction, rankAction } from "..";

function MyPage(props) {
  const navigate = useNavigate();
  const user = localStorage.getItem(props.USER_ID);
  const rankState = useSelector((state) => state.rankToggle);
  const loadSelect = useSelector((state) => state.profile);
  const dispath = useDispatch();
  const select = "id";

  useEffect(() => {
    const loadCharacter = new Promise(function (res, rej) {
      const result = localStorage.getItem(select);
      if (result != null) {
        res(result);
      }
    });

    loadCharacter.then((result) => {
      dispath(ProfileAction(result));
    });
  }, []);

  return (
    <div>
      <div className="wrap mypage">
        <Header />
        <section className="section_1">
          <div className="profile_wrap">
            <h3 className="myName">
              <b>{user}</b>님은
            </h3>
            <p className="myRank">초보완벽러 이십니다!</p>
            <span>MY RANK</span>
          </div>
          <figure className="profile_img">
            <img src={`/img/profile${loadSelect}.svg`} alt="" />
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
            <li onClick={() => dispath(rankAction())}>
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
                navigate("/login");
              }}
            >
              닉네임변경
              <img src="/img/my_arrow.svg" alt="" />
            </li>
          </ul>
        </section>
        {rankState === false ? null : <Rank />}
      </div>
      <MainFooter />
    </div>
  );
}

export default MyPage;
