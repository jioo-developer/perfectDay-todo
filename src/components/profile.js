import React, { useEffect } from "react";
import Header from "./header";
import MainFooter from "./mainFooter";
import "../reset.css";
import "../asset/profile.scss";
import { useSelector } from "react-redux";
import { ProfileAction } from "../module/reducer";

function Profile({ dispatch, navigate }) {
  let profileList = [1, 2, 3, 4, 5, 6];

  const loadSelect = useSelector((state) => state.profile);

  const select = "profile-id";

  useEffect(() => {
    // 저장된 프로필 값이 있는 지 확인
    const loadCharacter = new Promise(function (res) {
      const result = localStorage.getItem(select);
      if (result != null) {
        res(result);
      }
    });

    loadCharacter.then((result) => {
      dispatch(ProfileAction(result));
      // 마이 페이지에 몇번째 프로필을 띄워줄지 알려주는 데이터 action
    });

     // 저장된 프로필 값이 있는 지 확인
  }, []);

  return (
    <div>
      <div className="wrap profile_wrap">
        <Header />
        <section className="section01">
          <div className="my_profile">
            <figure>
              <img
                src={`/img/profile${loadSelect === 0 ? 1 : loadSelect}.svg`}
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
                  onClick={() => dispatch(ProfileAction(i + 1))}
                  //이미지를 누르면 해당 i + 1(0부터 시작해서)가 dispatch로 보내짐 
                >
                  <img src={`/img/profile${i + 1}.svg`} alt="" />
                </figure>
              );
            })}
            <button
              onClick={() => {
                navigate("/Mypage");
                localStorage.setItem(select, loadSelect);
              }}
            >
              바꾸기
            </button>
          </div>
        </section>
      </div>
      <MainFooter />
    </div>
  );
}

export default Profile;
