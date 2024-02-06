import { useSelector } from "react-redux";
import { createPost, editorToggle } from "../module/reducer";
import "../asset/editor.scss";
import { ChangeEvent, useState } from "react";
import { useMyContext } from "../module/MyContext";

function Editor() {
  const { dispatch } = useMyContext();
  const [write, setwrite] = useState<string>("");
  const [writeH, setwriteH] = useState<number>(0);
  const [writeM, setwriteM] = useState<number>(0);
  const maxLength = 2;

  type toggleStateType = {
    editorSwitch: boolean;
  };

  const toggleState = useSelector(
    (state: toggleStateType) => state.editorSwitch
  );
  //  포스트를 만드는 함수

  function postLogic() {
    const logicFac = [
      {
        write: write,
        writeH:
          writeH === 0
            ? window.alert("시간을 입력하세요")
            : writeH < 10
            ? `0 + ${writeH}`
            : writeH,
        writeM: writeM === 0 ? "00" : writeM < 10 ? `0 + ${writeM}` : writeM,
        clear: false,
      },
    ];

    const danger = document.querySelector(".text_area") as HTMLInputElement;
    if (danger) {
      danger.value === ""
        ? alert("스케줄을 입력해주세요")
        : dispatch(createPost(logicFac));
    }
    const hour = document.querySelector(".hour") as HTMLInputElement;
    const minute = document.querySelector(".minute") as HTMLInputElement;
    if (hour && minute) {
      hour.value = "";
      minute.value = "";
    }
    dispatch(editorToggle());
  }

  //  포스트를 만드는 함수

  function onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    setwrite(e.target.value);
  }

  function onChangeHour(e: ChangeEvent<HTMLInputElement>) {
    if (parseInt(e.target.value) >= 24) {
      alert("시간을 정확히 설정하세요.");
      e.target.value = "";
    } else {
      setwriteH(parseInt(e.target.value));
    }
  }

  function onChangeMinute(e: ChangeEvent<HTMLInputElement>) {
    if (parseInt(e.target.value) >= 60) {
      alert("시간을 정확히 설정하세요.");
      e.target.value = "";
    } else {
      setwriteM(parseInt(e.target.value));
    }
  }
  return (
    <>
      {toggleState && (
        <div className="editor">
          <b>오늘의 목표</b>
          <img
            alt=""
            src="/img/close_FILL0.svg"
            onClick={() => dispatch(editorToggle())}
          />
          <input
            className="text_area"
            placeholder="스케줄을 입력해주세요"
            onChange={onChangeTitle}
          ></input>
          <div className="date">
            <p className="day">시간</p>
            <form className="time_wrap" autoComplete="off">
              <input
                className="time_txt hour"
                type="text"
                placeholder="00"
                maxLength={maxLength}
                onChange={onChangeHour}
                autoFocus
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
              <input
                className="time_txt minute"
                type="text"
                maxLength={maxLength}
                placeholder="00"
                onChange={onChangeMinute}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
              <input className="time_txt" placeholder="00" readOnly />
            </form>
          </div>
          <button onClick={postLogic}>등록하기</button>
        </div>
      )}
    </>
  );
}

export default Editor;
