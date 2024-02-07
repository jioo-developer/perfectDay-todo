import Clock from "./clock";
import { issueAction } from "../module/reducer";
import { useMyContext } from "../module/MyContext";

interface headerProps extends props {
  finishBoolean: boolean;
}

function Header({ location, finishBoolean }: headerProps) {
  const { navigate, dispatch } = useMyContext();

  function bellFunc() {
    if (finishBoolean) {
      return (
        <img
          src="/img/bell.svg"
          alt="bell"
          onClick={() => {
            dispatch(issueAction());
          }}
        />
      );
    }
    return (
      <img
        src="/img/no_bell.svg"
        alt="bell"
        onClick={() => {
          dispatch(issueAction());
        }}
      />
    );
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
