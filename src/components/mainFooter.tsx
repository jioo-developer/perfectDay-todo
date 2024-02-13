import "../App.scss";
import { editorToggle } from "../module/reducer";
import { useSelector } from "react-redux";
import { useMyContext } from "../module/MyContext";
type props = {
  location: string;
  todoList: todoItem[];
};
function MainFooter({ location, todoList }: props) {
  const { dispatch, navigate } = useMyContext();
  return (
    <footer className="footer_bar">
      {location === "/" ? (
        <button
          onClick={() => {
            if (todoList.length >= 10) {
              window.alert("생성가능한 갯수를 초과하였습니다");
            } else {
              dispatch(editorToggle());
            }
          }}
        >
          <img src="/img/adds.svg" alt="add" />
        </button>
      ) : null}
      <div className="home f-con" onClick={() => navigate("/")}>
        <img src="/img/home.svg" alt="home" />
        <p>홈</p>
      </div>
      <div className="calendar f-con" onClick={() => navigate("/canlendar")}>
        <img src="/img/calendar.svg" alt="calendar" />
        <p>캘린더</p>
      </div>
    </footer>
  );
}

export default MainFooter;
