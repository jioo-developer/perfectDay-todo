import React from "react";
import { batch, useSelector } from "react-redux";
import { issueAction, reportAction } from "../module/reducer";
import "../asset/notification.scss";

function Notification({ dispatch }) {
  const reportState = useSelector((state) => state.report);
  const finishData = useSelector((state) => state.successDate[0]);
  const finishTitle = useSelector((state) => state.successCon);

  return (
    <div className="noti_wrap">
      <div className="cover"></div>
      <aside>
        <div className="aside_header">
          <p className="noti_title">알림함</p>
          <img
            alt=""
            src="/img/clear.svg"
            onClick={() => {
              batch(() => {
                dispatch(issueAction());
                if (reportState) {
                  dispatch(reportAction());
                }
              });
            }}
          />
        </div>
        <ul className="noti_body">
          <li>
            <img src="/img/check_btn.svg" alt="" />
            <div className="li_txt_wrap">
              <p className="li_time">
                {reportState === false && finishData === undefined
                  ? null
                  : `${finishData.year}년 ${finishData.month}월 ${
                      finishData.date
                    }일 ${finishData.hour}:${
                      finishData.min < 10
                        ? "0" + finishData.min
                        : finishData.min
                    }`}
              </p>
              <p className="li_title">
                {reportState === false && finishData === undefined
                  ? null
                  : finishTitle}
              </p>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Notification;
