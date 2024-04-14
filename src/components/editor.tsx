import { createPost } from "../module/reducer";
import "../asset/editor.scss";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import { todoItem } from "../module/interfaceModule";
import { useMyContext } from "../module/MyContext";
import { setCookie } from "../module/exportFunction";

function Editor() {
  const [write, setwrite] = useState<string>("");
  const [writeH, setwriteH] = useState<number>(0);
  const [writeM, setwriteM] = useState<number>(0);
  const maxLength = 2;

  const { editorSwitch, todoList, editDispatch, todoDispatch } = useMyContext();

  function postLogic() {
    const logicFac = {
      write: write,
      writeH: writeH < 10 ? `0${writeH}` : writeH,
      writeM: writeM === 0 ? "00" : writeM < 10 ? `0${writeM}` : writeM,
      clear: false,
    };
    checkValueLogic("all", logicFac);
  }

  function checkValueLogic(type: string, params?: todoItem) {
    const allRender = titleRef.current && hourRef.current && minuteRef.current;
    if (allRender) {
      if (type === "all" && !currentCheck()) {
        if (params && !checkArr(params)) {
          todoDispatch(createPost(params));
          //쿠키확인
          const cookieCheck = document.cookie;
          if (!cookieCheck.includes("oneDaylist")) {
            setCookie();
          }
          //쿠키확인
        } else {
          window.alert("스케줄을 확인해주세요.");
        }
        setwrite("");
        setwriteH(0);
        setwriteM(0);
        editDispatch(false);
      } else if (type === "hour") {
        alert("시간을 정확히 설정하세요.");
        setwriteH(0);
      } else if (type === "minute") {
        alert("시간을 정확히 설정하세요.");
        setwriteM(0);
      }
    }
  }

  const currentCheck = () => {
    if ((write === "" && writeH === 0) || (write === "" && isNaN(writeH))) {
      return true;
    } else {
      return false;
    }
  };

  const checkArr = useMemo(
    () => (params: todoItem) => {
      if (todoList.length > 0) {
        return todoList.some(
          (item) => JSON.stringify(item) === JSON.stringify(params)
        );
      }
    },
    [todoList]
  );

  const titleRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);

  function onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    setwrite(e.target.value);
  }

  function onChangeHour(e: ChangeEvent<HTMLInputElement>) {
    if (parseInt(e.target.value) >= 24) {
      checkValueLogic("hour");
    } else {
      setwriteH(parseInt(e.target.value));
    }
  }

  function onChangeMinute(e: ChangeEvent<HTMLInputElement>) {
    if (parseInt(e.target.value) >= 60) {
      checkValueLogic("minute");
    } else {
      setwriteM(parseInt(e.target.value));
    }
  }

  function disabledCheck() {
    if (write !== "" && writeH !== 0 && !isNaN(writeH)) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <>
      {editorSwitch && (
        <div className="editor">
          <b>오늘의 목표</b>
          <img
            alt=""
            src="/img/close_FILL0.svg"
            onClick={() => {
              setwrite("");
              setwriteH(0);
              setwriteM(0);
              editDispatch(false);
            }}
          />
          <input
            className="text_area"
            placeholder="스케줄을 입력해주세요"
            value={write}
            onChange={onChangeTitle}
            ref={titleRef}
            autoFocus
          ></input>
          <div className="date">
            <p className="day">시간</p>
            <form className="time_wrap" autoComplete="off">
              <input
                className="time_txt hour"
                type="text"
                value={!isNaN(writeH) ? writeH : 0}
                placeholder="00"
                maxLength={maxLength}
                onChange={onChangeHour}
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
                value={!isNaN(writeM) ? writeM : 0}
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
