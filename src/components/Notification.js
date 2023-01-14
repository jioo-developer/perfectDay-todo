import React from "react";
import { batch, useSelector } from "react-redux";
import { issueAction, reportAction } from "../module/reducer";
import "../asset/notification.scss";

function Notification({ dispatch }) {
  const finishData = useSelector((state) => state.successDate);
  const finishTitle = useSelector((state) => state.successCon);

  return (
    <>
    {
      finishTitle.length !== 0 
      // 알림이 아에 없어서도 켜지는데 최소 1개라도 있어야 켜지게 설정
  ?<div className="noti_wrap">
    <div className="cover"></div>
      <aside>
        <div className="aside_header">
          <p className="noti_title">알림함</p>
          <img
            alt=""
            src="/img/clear.svg"
            onClick={() => {
               batch(()=>{
                dispatch(issueAction())
                dispatch(reportAction())
                // 벨과 알림창 on / off 설정
               })
            }}
          />
        </div>
        <ul className="noti_body">
          {
            // 알림들 만드는 map 함수 
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
