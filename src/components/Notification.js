import React from "react";
import { useSelector } from "react-redux";
import "../asset/notification.scss";
import { issueAction } from "../module/reducer";

function Notification({ dispatch }) {
  const finishData = useSelector((state) => state.successDate);
  return (
    <>
      <div className="noti_wrap">
        <div className="cover" />
        <aside>
          <div className="aside_header">
            <p className="noti_title">알림함</p>
            <img
              src="/img/clear.svg"
              onClick={() => {
                dispatch(issueAction());
              }}
            />
          </div>
          <ul className="noti_body">
            {
              // 알림들 만드는 map 함수
              finishData.map((item, index) => {
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
            }
          </ul>
        </aside>
      </div>
    </>
  );
}

export default Notification;
