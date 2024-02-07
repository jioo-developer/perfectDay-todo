import "../asset/loading.scss";
import { useMyContext } from "../module/MyContext";

function Introduce() {
  const { navigate } = useMyContext();
  return (
    <div>
      <div className="center_wrap">
        <div className="logo_wrap">
          <img src="/img/introduce.svg" alt="이미지" className="introImg" />
          <p className="title intro_title">제작자 인사</p>
          <p className="caption">
            잠들기 전 오늘 정말 한게 없다고 느껴지신 적 없으신가요?
            <br></br>
            일정을 체크하고 끝냄으로 써 하루를 완벽하게 끝내보세요
          </p>
          <p className="enter" onClick={() => navigate("/")}>
            확인
          </p>
        </div>
        <footer>
          <p>오늘도 완벽한 하루를 보내시길 바랄게요</p>
          <p>Copyright 2021 ⓒ jioo-designer </p>
        </footer>
      </div>
    </div>
  );
}

export default Introduce;
