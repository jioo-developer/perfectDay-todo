import React, { useCallback, useEffect, useState } from "react";
import "../asset/calendar.scss";
import UseInput from "../hooks/useInput";
import { today } from "../module/today";

function Calendar() {
  const nowday = { ...today };
  today.day = new Date().getDay();

  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const [selectedYear, setSelectedYear] = useState(nowday.year);
  // 선택년도 state
  const [selectedMonth, setSelectedMonth] = useState(nowday.month);
  // 선택년 월 state
  const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate();
  // 선택년 월 일 state
  const [select, setSelect] = useState(0);
  // 일정을 잡기위해 선택 한 날짜
  const [promiseText, setPromise] = UseInput("");
  const [text, setText] = useState([]);
  const dayArr = [];

  //이전 달 보기 버튼
  const prevMonth = useCallback(() => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  }, [selectedMonth]);

  //이전 달 보기 버튼

  //다음 달 보기 버튼
  const nextMonth = useCallback(() => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  }, [selectedMonth]);

  //다음 달 보기 버튼

  //주 반환 함수
  const returnWeek = () => {
    const result = week.map((value, index) => {
      return (
        <div className="day" key={index}>
          {value}
        </div>
      );
    });
    return result;
  };

  //선택된 달의 날짜들 반환 함수
  const returnDay = () => {
    for (const nowDay of week) {
      const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
      if (week[day] === nowDay) {
        for (let i = 0; i < dateTotalCount; i++) {
          dayArr.push(i + 1);
        }
      } else {
        dayArr.push("");
      }
    }

    const dayMap = dayArr.map((value, index) => {
      return index < 35 ? (
        <div className="day dayDate">
          <input
            id={`day-input-${index}`}
            className="day-inputs"
            style={{ display: "none" }}
            name="date-radio"
            key={index}
            type="radio"
            onChange={(e) => {
              setSelect(parseInt(e.target.nextElementSibling.innerHTML));
            }}
          />
          <label htmlFor={`day-input-${index}`}>{value}</label>
        </div>
      ) : null;
    });
    return dayMap;
  };

  ///선택된 달의 날짜들 반환 함수

  // 오늘 날짜 체크하는 함수
  function todayCheck() {
    let thisMonth = new Date().getMonth() + 1;
    let todayOn = Array.from(document.getElementsByClassName("dayDate"));
    if (thisMonth === selectedMonth) {
      for (var i = 0; i < todayOn.length; i++) {
        if (todayOn[i].innerText === "") {
          todayOn.splice(i, 1);
          i--;
        }
      }
      todayOn[nowday.date - 1].classList.add("today");
    } else {
      todayOn[nowday.date - 1].classList.remove("today");
    }
  }

  // 오늘 날짜 체크하는 함수

  // 일정 제작 함수
  function postPromise() {
    let danger = document.querySelector("#d_day_txt").value;
    if (danger !== "" && selectDay !== 0) {
      selectDay(select);
    } else {
      window.alert("일정 또는 날짜를 올바르게 사용해주세요.");
    }
  }

  // 일정 제작 함수

  // 일정 예약에 필요한 날짜를 선택 할 때 날짜가 지정되는 함수
  function selectDay(params) {
    return new Promise(function (res, rej) {
      let selectDate = new Date(
        selectedYear,
        selectedMonth,
        parseInt(params)
        //params는 선택된 날짜의 텍스트를 숫자로 변환
      );

      let thisDay = new Date(nowday.year, nowday.month, nowday.date);

      let ResultDay = selectDate - thisDay;

      let TimeResult = Math.ceil(ResultDay / (1000 * 60 * 60 * 24));
      if (TimeResult > 0) {
        res(TimeResult);
      } else {
        rej(TimeResult);
      }
    })
      .then((result) => {
        postPromiseFunc(result);
      })
      .catch((result) => {
        if (!isNaN(result)) {
          window.alert("이미 지난 날짜입니다.");
        }
      });
  }

  // 일정 예약에 필요한 날짜를 선택 할 때 날짜가 지정되는 함수

  function postPromiseFunc(value) {
    const object = {};
    object.title = promiseText;
    object.calcDay = value;
    const copyArr = [...text];
    copyArr.push(object);
    setText(copyArr);
    // 날짜랑 텍스트를 객체로 잘 만들어서 배열 안으로 넣어야함
    document.querySelector("#d_day_txt").value = "";
  }

  useEffect(() => {
    todayCheck();
  }, [selectedMonth]);

  return (
    <>
      <div className="calendar">
        <section className="cal_data pd-x20">
          <div className="date_top">
            <div className="date_title">
              {selectedYear}.
              {selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth}
            </div>
            <div className="date_arrow">
              <div className="prev_btn change_btn" onClick={prevMonth}>
                &lt;
              </div>
              <div className="next_btn change_btn" onClick={nextMonth}>
                &gt;
              </div>
            </div>
          </div>
          <div className="cal_wrap">
            <div className="days">{returnWeek()}</div>
            <div className="date_wrap">{returnDay()}</div>
          </div>
          <section className="important_data">
            <div className="title_wrap">
              <div className="date_title">일정예약</div>
              {text.length !== 0
                ? text.map((value, index) => {
                    return (
                      <div className="date_txt">
                        <p className="txt" key={index}>
                          {value.title}
                        </p>

                        <p>{`D - ${value.calcDay}`}</p>
                      </div>
                    );
                  })
                : null}
              <div className="input_wrap">
                <input id="d_day_txt" onChange={(e) => setPromise(e)} />
                <div className="button_wrap">
                  <button className="d_days" onClick={postPromise}>
                    작성
                  </button>
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
}

export default Calendar;
