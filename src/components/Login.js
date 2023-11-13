import React, { useState } from "react";
import "../reset.css";
import "../asset/login.scss";
import { today } from "../module/today";

function Login({ USER_ID, navigate }) {
  const [nickName, setNickName] = useState("");
  function signUp(e) {
    e.preventDefault();
    const loadDate = localStorage.getItem("creationDay");
    if (loadDate != null) {
      localStorage.setItem("creationDay", JSON.stringify(today));
    }
    localStorage.setItem(USER_ID, nickName);
    navigate("/");
  }

  return (
    <div className="center_wrap">
      <div>
        <form className="js-form form" onSubmit={signUp}>
          <input
            type="text"
            placeholder="사용 할 닉네임을 적어주세요."
            onChange={(e) => setNickName(e.target.value)}
          />
        </form>
        <footer>
          <p>오늘도 완벽한 하루를 보내시길 바랄게요</p>
          <p>Copyright 2021 ⓒ jioo-designer </p>
        </footer>
      </div>
    </div>
  );
}

export default Login;
