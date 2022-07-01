import React, { useState, useEffect } from "react";
import moment from "moment";
function Clock() {
  let [time, setTime] = useState(moment());
  useEffect(() => {
    const momentClock = setInterval(() => {
      setTime(moment());
    }, 1000);
    return () => clearInterval(momentClock);
    // 시간 업데이트
  }, [time]);
  return (
    <div className="header_in">
      <div className="time">{time.format("HH:mm")}</div>
      <img src="/img/phone_base.svg" alt="phone_Base" />
    </div>
  );
}

export default Clock;
