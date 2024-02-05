import React from "react";
import { useSelector } from "react-redux";
import "../asset/notification.scss";
import { finishReset, issueAction } from "../module/reducer";
import { Dispatch } from "redux";
type finishDataType = {
  successDate: any[];
};
function Notification(dispatch: Dispatch) {
  const finishData = useSelector((state: finishDataType) => state.successDate);
  const getFinish: string | null = localStorage.getItem("clearDB");
  return (
    <>
      <div className="noti_wrap">
        <div className="cover" />
        <aside>
          <div className="aside_header">
            <p className="noti_title">알림함</p>
            <div>
              <button
                className="noti_title"
                onClick={() => dispatch(finishReset())}
                disabled={getFinish === null}
              >
                모두 지우기
              </button>
              <img
                src="/img/clear.svg"
                onClick={() => {
                  dispatch(issueAction());
                }}
              />
            </div>
          </div>
          <ul className="noti_body">
            {
              // 알림들 만드는 map 함수
              finishData.length > 0
                ? finishData.map((item, index) => {
                    return (
                      <li key={index}>
                        <img src="/img/check_btn.svg" alt="" />
                        <div className="li_txt_wrap">
                          <p className="li_time">
                            {`${item.year}년 ${item.month}월 ${item.date}일 ${
                              item.hour
                            }:${item.min < 10 ? "0" + item.min : item.min}`}
                          </p>
                          <p className="li_title">{item.title}</p>
                        </div>
                      </li>
                    );
                  })
                : null
            }
          </ul>
        </aside>
      </div>
    </>
  );
}

export default Notification;
