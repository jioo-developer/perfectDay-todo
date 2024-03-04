import Clock from "./clock";
import { useMyContext } from "../module/MyContext";
import { typeObject } from "../module/reducer";

type headerProps = {
  finishBoolean: boolean;
  location: string;
};

function Header({ location, finishBoolean }: headerProps) {
  const { navigate, issueDispatch } = useMyContext();

  function bellFunc() {
    if (finishBoolean) {
      return (
        <img
          src="/img/bell.svg"
          alt="bell"
          onClick={() => issueDispatch((prev) => !prev)}
        />
      );
    } else {
      return (
        <img
          src="/img/no_bell.svg"
          alt="bell"
          onClick={() => issueDispatch((prev) => !prev)}
        />
      );
    }
  }

  return (
    <header className="main_header pd-x20">
      <Clock />
      <div className="title_header">
        {location === "/" ? (
          <figure className="main_nav" onClick={() => navigate("/Mypage")}>
            <img src="./img/nav.svg" alt="nav" />
          </figure>
        ) : null}
        <p className="main_titles">
          {location === "/"
            ? "완벽한 하루"
            : location === "/Mypage"
            ? "마이페이지"
            : location === "/canlendar"
            ? "캘린더"
            : location === "/profile"
            ? "프로필변경"
            : null}
        </p>
        {location === "/" ? bellFunc() : null}
      </div>
    </header>
  );
}

export default Header;
