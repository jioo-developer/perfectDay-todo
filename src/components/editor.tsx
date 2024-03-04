import reducer, {
  createPost,
  initialState,
  typeObject,
} from "../module/reducer";
import "../asset/editor.scss";
import { ChangeEvent, useRef, useState } from "react";
import { todoItem } from "../module/interfaceModule";
import { useMyContext } from "../module/MyContext";

function Editor() {
  const [write, setwrite] = useState<string>("");
  const [writeH, setwriteH] = useState<number>(0);
  const [writeM, setwriteM] = useState<number>(0);
  const maxLength = 2;
  const { editorSwitch, editDispatch, todoDispatch } = useMyContext();

  function postLogic() {
    const logicFac = {
      write: write,
      writeH: writeH < 10 ? `0${writeH}` : writeH,
      writeM: writeM === 0 ? "00" : writeM < 10 ? `0${writeM}` : writeM,
      clear: false,
    };
    checkValueLogic("all", logicFac);
    editDispatch((prev) => !prev);
  }

  //  포스트를 만드는 함수

  const titleRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);

  function checkValueLogic(type: string, params?: todoItem) {
    const allRender = titleRef.current && hourRef.current && minuteRef.current;
    if (allRender) {
      if (type === "all" && params && titleRef.current) {
        if (write === "" && writeH === 0) {
          alert("스케줄을 확인해주세요.");
        } else {
          todoDispatch(createPost(params));
          setwrite("");
          setwriteH(0);
          setwriteM(0);
        }
      } else if (type === "hour") {
        setwriteH(0);
      } else if (type === "minute") {
        setwriteM(0);
      }
    }
  }

  function onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    setwrite(e.target.value);
  }

  function onChangeHour(e: ChangeEvent<HTMLInputElement>) {
    if (parseInt(e.target.value) >= 24) {
      alert("시간을 정확히 설정하세요.");
      checkValueLogic("hour");
    } else {
      setwriteH(parseInt(e.target.value));
    }
  }

  function onChangeMinute(e: ChangeEvent<HTMLInputElement>) {
    if (parseInt(e.target.value) >= 60) {
      checkValueLogic("minute");
      alert("시간을 정확히 설정하세요.");
    } else {
      setwriteM(parseInt(e.target.value));
    }
  }

  function disabledCheck() {
    if (write !== "" && writeH !== 0) return false;
    else return true;
  }
  return (
    <>
      {editorSwitch && (
        <div className="editor">
          <b>오늘의 목표</b>
          <img
            alt=""
            src="/img/close_FILL0.svg"
            onClick={() => editDispatch((prev) => !prev)}
          />
          <input
            className="text_area"
            placeholder="스케줄을 입력해주세요"
            onChange={onChangeTitle}
            ref={titleRef}
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
                ref={hourRef}
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
                ref={minuteRef}
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
          <button onClick={postLogic} disabled={disabledCheck()}>
            등록하기
          </button>
        </div>
      )}
    </>
  );
}

export default Editor;
