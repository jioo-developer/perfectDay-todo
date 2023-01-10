import React, { useCallback, useEffect, useState } from "react";
import Header from "./header";
import MainFooter from "./mainFooter";
import "../reset.css";
import "../asset/calendar.scss";
import UseInput from "../hooks/useInput";

function Calendar() {
  const today = {
    year: new Date().getFullYear(), //오늘 연도
    month: new Date().getMonth() + 1, //오늘 월
    date: new Date().getDate(), //오늘 날짜
    day: new Date().getDay(), //오늘 요일
  };

  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const [selectedYear, setSelectedYear] = useState(today.year);
  const [selectedMonth, setSelectedMonth] = useState(today.month);
  const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate();
  const [propsTime, setPropTime] = useState(0);
  const [promiseText, setPromise] = UseInput("");
  const [text, setText] = useState([]);

  //선택한 년>달의 마지막 날짜

  const prevMonth = useCallback(() => {
    //이전 달 보기 보튼
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  }, [selectedMonth]);

  const nextMonth = useCallback(() => {
    //다음 달 보기 버튼
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  }, [selectedMonth]);

  const returnWeek = useCallback(() => {
    //요일 반환 함수
    const result = week.map((value, index) => {
      return (
        <div key={value} className="day">
          {value}
        </div>
      );
    });
    return result;
  }, []);

  const returnDay = useCallback(() => {
    //선택된 달의 날짜들 반환 함수
    let dayArr = [];
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

    let dayMap = dayArr.map((value, index) => {
      return index < 35 ? (
        <div
          className="day dayDate"
          onClick={(e) => {
            selectDay(e);
          }}
        >
          {value}
        </div>
      ) : null;
    });
    return dayMap;
  }, [selectedYear, selectedMonth, dateTotalCount]);

  function selectDay(e) {
    return new Promise(function (res) {
      let selectDate = new Date(
        selectedYear,
        selectedMonth,
        parseInt(e.target.innerText)
      );

      let thisDay = new Date(today.year, today.month, today.date);

      let ResultDay = selectDate - thisDay;

      let TimeResult = Math.ceil(ResultDay / (1000 * 60 * 60 * 24));
      res(TimeResult);
    }).then((result) => {
      setPropTime(result);
    });
  }

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
      todayOn[today.date - 1].classList.add("today");
    } else {
      todayOn[today.date - 1].classList.remove("today");
    }
  }

  function postPromise() {
    let copyArray = [...text];
    copyArray.push(promiseText);
    setText(copyArray);
  }

  useEffect(() => {
    todayCheck();
  }, [selectedMonth]);

  return (
    <>
      <div className="wrap calendar">
        <Header />
        <section className="cal_data">
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
                          {value}
                        </p>

                        <p>{`D - ${propsTime}`}</p>
                      </div>
                    );
                  })
                : null}
              <div className="input_wrap">
                <input id="d_day_txt" onChange={(e) => setPromise(e)}></input>
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
      <MainFooter />
    </>
  );
}

export default Calendar;
