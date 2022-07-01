import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditorAction, listAction, TodoPost } from "..";
import "../asset/editor.scss";
import useInput from "../hooks/useInput";
function Editor() {
  let [write, setwrite] = useInput("");
  let [writeH, setwriteH] = useInput("");
  let [writeM, setwriteM] = useInput("");
  const toggleState = useSelector((state) => state.editorToggle);
  const dispatch = useDispatch();

  function postLogic() {
    let logicFac = {
      write: write,
      writeH:
        writeH === ""
          ? "00"
          : parseInt(writeH) < 10
          ? `0${parseInt(writeH)}`
          : writeH,
      writeM:
        writeM === ""
          ? "00"
          : parseInt(writeM) < 10
          ? `0${parseInt(writeM)}`
          : writeM,
      clear: false,
    };

    let danger = document.querySelector(".text_area").value;
    danger === ""
      ? alert("스케줄을 입력해주세요")
      : dispatch(TodoPost(logicFac));
    document.querySelector(".hour").value = "";
    document.querySelector(".minute").value = "";
    const amount = loadAmount().length + 1;
    dispatch(listAction(amount));
    dispatch(EditorAction());
  }

  function loadAmount() {
    return Array.from(document.querySelectorAll(".list"));
  }

  const onChangeHour = useCallback(
    (e) => {
      if (e.target.value >= 24) {
        alert("시간을 정확히 설정하세요.");
        e.target.value = "";
      } else {
        setwriteH(e);
      }
    },
    [writeH]
  );

  const onChangeMinute = useCallback(
    (e) => {
      if (e.target.value >= 60) {
        alert("시간을 정확히 설정하세요.");
        e.target.value = "";
      } else {
        setwriteM(e);
      }
    },
    [writeM]
  );

  return (
    <>
      {toggleState && (
        <div className="editor">
          <b>오늘의 목표</b>
          <img
            alt=""
            src="/img/close_FILL0.svg"
            onClick={() => dispatch(EditorAction())}
          />
          <input
            className="text_area"
            placeholder="스케줄을 입력해주세요"
            onChange={setwrite}
          ></input>
          <div className="date">
            <p className="day">시간</p>
            <form className="time_wrap" autoComplete="off">
              <input
                className="time_txt hour"
                type="text"
                placeholder="00"
                maxLength="2"
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
                maxLength="2"
                placeholder="00"
                onChange={onChangeMinute}
              />
              <input className="time_txt" placeholder="00" disabled />
            </form>
          </div>
          <button onClick={postLogic}>등록하기</button>
        </div>
      )}
    </>
  );
}

export default Editor;
