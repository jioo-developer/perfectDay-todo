import React, { useEffect } from "react";
import "../reset.css";
import "../asset/profile.scss";
import { useSelector } from "react-redux";
import { ProfileAction } from "../module/reducer";

function Profile({ dispatch, navigate }) {
  let profileList = [1, 2, 3, 4, 5, 6];

  return (
    <div className="profile_wrap">
      <section className="section01">
        <div className="my_profile">
          <figure>
            <img
              // src={`/img/profile${loadSelect === 0 ? 1 : loadSelect}.svg`}
              src={`/img/profile${1}.svg`}
              alt=""
            />
          </figure>
          <figcaption>현재프로필</figcaption>
        </div>
      </section>
      <section className="section02">
        <div className="in_wrap">
          {profileList.map(function (a, i) {
            return (
              <figure
                className="select_profile"
                key={i}
                // onClick={() => dispatch(ProfileAction(i + 1))}
                //이미지를 누르면 해당 i + 1(0부터 시작해서)가 dispatch로 보내짐
              >
                <img src={`/img/profile${i + 1}.svg`} alt="" />
              </figure>
            );
          })}
          <button
            onClick={() => {
              navigate("/Mypage");
              // localStorage.setItem(select, loadSelect);
            }}
          >
            바꾸기
          </button>
        </div>
      </section>
    </div>
  );
}

export default Profile;
