import React from "react";
import { useSelector } from "react-redux";
import { issueAction } from "../module/reducer";
import "../asset/notification.scss";

function Notification({ dispatch }) {
  const finishData = useSelector((state) => state.successDate);
  const finishTitle = useSelector((state) => state.successCon);

  return (
    <>
    {
      finishTitle.length !== 0 
  ?<div className="noti_wrap">
    <div className="cover"></div>
      <aside>
        <div className="aside_header">
          <p className="noti_title">알림함</p>
          <img
            alt=""
            src="/img/clear.svg"
            onClick={() => {
               dispatch(issueAction())
            }}
          />
        </div>
        <ul className="noti_body">
          {
            finishTitle.map((item,index)=>{
              return (
          <li>
            <img src="/img/check_btn.svg" alt="" />
            <div className="li_txt_wrap">
              <p className="li_time">
                {`${finishData[index].year}년 ${finishData[index].month}월 ${
                     finishData[index].date
                    }일 ${finishData[index].hour}:${
                      finishData[index].min < 10
                        ? "0" + finishData[index].min
                        : finishData[index].min
                    }`}
              </p>
              <p className="li_title">
                {item}
              </p>
            </div>
          </li>
              )
            })
          }
        </ul>
      </aside>
    </div>
      : null
    }
    </>
  
  );
}

export default Notification;
