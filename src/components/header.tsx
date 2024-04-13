import Clock from "../module/clock";
import { useMyContext } from "../module/MyContext";

function Header({ location }: { location: string }) {
  const { navigate, issueDispatch, bellToggle } = useMyContext();
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
        {location === "/" ? (
          <button>
            <img
              src={bellToggle ? "/img/bell.svg" : "/img/no_bell.svg"}
              alt="bell"
              onClick={() => issueDispatch((prev) => !prev)}
            />
          </button>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
