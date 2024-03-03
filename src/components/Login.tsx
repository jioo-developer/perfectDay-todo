import { useState, ChangeEvent, FormEvent } from "react";
import "../reset.css";
import "../asset/login.scss";
import { today } from "../module/today";
import { useMyContext } from "../module/MyContext";

const Login = () => {
  const { navigate } = useMyContext();
  const [nickName, setNickName] = useState<string>("");

  function signUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const loadDate = localStorage.getItem("creationDay");
    const loadUser = localStorage.getItem("currentUser");
    if (loadDate === null && loadUser === null) {
      settingFunc();
    } else {
      localStorage.clear();
      settingFunc();
    }
  }

  function settingFunc() {
    localStorage.setItem("creationDay", JSON.stringify(today));
    localStorage.setItem("currentUser", nickName);
    navigate("/");
  }

  return (
    <div className="center_wrap">
      <>
        <form className="js-form form" onSubmit={signUp}>
          <input
            type="text"
            placeholder="사용 할 닉네임을 적어주세요."
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNickName(e.target.value)
            }
          />
        </form>
        <footer>
          <p>오늘도 완벽한 하루를 보내시길 바랄게요</p>
          <p>Copyright 2021 ⓒ jioo-designer </p>
        </footer>
      </>
    </div>
  );
};

export default Login;
