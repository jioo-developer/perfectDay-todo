import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../asset/calendar.scss";
import { today } from "../module/today";
import { PostPromiseType } from "../module/interfaceModule";

function Calendar() {
  const nowday = { ...today };
  today.day = new Date().getDay();
  // 현재 날짜

  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const [selectedYear, setSelectedYear] = useState(nowday.year);
  // 선택년도 state
  const [selectedMonth, setSelectedMonth] = useState(nowday.month);
  // 선택년 월 state
  const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate();
  // 선택년 월 일 state

  // 년/월/일/요일 까지

  // 일정 잡는데 필요한 state들

  // 일정 예약에 필요한 날짜를 선택 할 때 날짜가 지정되는 함수
  const inputRef = useRef<HTMLInputElement>(null);

  const [select, setSelect] = useState<number>(0);
  // 일정을 잡기위해 선택 한 날짜

  const [promiseText, setPromise] = useState<string>("");

  const [calendarArr, CalDispatch] = useState<PostPromiseType[]>([]);
  // 일정 잡는데 필요한 state

  useEffect(() => {
    const calendarResult: PostPromiseType[] = JSON.parse(
      localStorage.getItem("calendarList") || "[]"
    );
    if (calendarResult.length > 0) {
      calendarHanlder(calendarResult);
    }
  }, []);

  //이전 달 보기 버튼
  const prevMonth = useCallback(() => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  }, [selectedMonth, selectedYear]);

  //이전 달 보기 버튼

  //다음 달 보기 버튼
  const nextMonth = useCallback(() => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  }, [selectedMonth, selectedYear]);

  //다음 달 보기 버튼

  //주 반환 함수

  const returnWeek = useMemo(() => {
    return week.map((value, index) => {
      return (
        <div className="day" key={`week-${index}`}>
          {value}
        </div>
      );
    });
  }, [week]);

  const settingNumber = 36;
  // 35는 달력에서 한 달을 표시하는데 필요한 최대 일 수이다.
  // 대부분의 달력은 한 달을 표시할 때 5주로 나타나지만, 때로는 6주가 필요한 경우도 있다.
  // 6주의 경우를 포함해서 자바스크립트는 이를 대비해 최대 일수를 35로 랜더링 하게된다. 그래서 35를 쓴다.
  // 인줄 알았는데 2월에 윤달인 29일 인 경우엔 36이란다...

  const createDate = useMemo(() => {
    const dayArr: (string | number)[] = [];
    for (const item of week) {
      //일 ~ 토 까지를 반복문으로 돌림
      const monthFirstday: number = new Date(
        selectedYear,
        selectedMonth - 1,
        1
      ).getDay();
      //선택한 년,(월-1)에서 첫번째 일자를 선택

      // 2024년 3월 1일 기준으로 일/월/화/수/목/금 (0,1,2,3,4,5) 라서 day는 5를 출력

      if (week[monthFirstday] === item) {
        // 아 선택한 년/월 기준으로 1일의 요일과 week 배열안의 요일이 같을 때 1일이 맞아 떨어지니까
        // 2중 for문을 시작하는구만

        for (let i = 0; i < dateTotalCount; i++) {
          dayArr.push(i + 1);
        }
      } else {
        dayArr.push("");
        // 아닐 땐 for of 문으로 dayArr에 ""을 넣는거고
      }
    }
    return dayArr;
  }, [selectedMonth, selectedYear]);

  const returnDay = useMemo(() => {
    const result = createDate.map((value, index) => {
      if (index < settingNumber) {
        return (
          <div className="day dayDate">
            <input
              id={`day-input-${index}`}
              className="day-inputs"
              style={{ display: "none" }}
              name="date-radio"
              key={index}
              type="radio"
              onChange={(e) => {
                if (e.target.nextElementSibling) {
                  const transNumber = parseInt(
                    e.target.nextElementSibling.innerHTML
                  );
                  setSelect(transNumber);
                }
              }}
            />
            <label htmlFor={`day-input-${index}`}>{value}</label>
          </div>
        );
      }
    });
    return result.filter((item) => item !== undefined);
  }, [createDate]);

  ///선택된 달의 날짜들 반환 함수

  // 오늘 날짜 체크하는 함수
  const dayRef = useRef<HTMLDivElement>(null);

  const todayCheck = useCallback(() => {
    const thisMonth = new Date().getMonth() + 1;
    const todayOn = Array.from(
      dayRef.current?.children || []
    ) as HTMLDivElement[];
    if (todayOn.length > 0) {
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
  }, [nowday.date, selectedMonth]);

  // 오늘 날짜 체크하는 함수

  // 일정 제작 함수
  function postPromise() {
    if (promiseText !== "" && select !== 0) {
      selectDay(select);
    } else {
      window.alert("일정 또는 날짜를 올바르게 사용해주세요.");
    }
  }

  // 일정 제작 함수

  // 일정 예약에 필요한 날짜를 선택 할 때 날짜가 지정되는 함수
  function selectDay(params: number): number | void {
    const selectDate = new Date(
      selectedYear,
      selectedMonth,
      params
      //params는 선택된 날짜의 텍스트를 숫자로 변환
    );

    const thisDay = new Date(nowday.year, nowday.month, nowday.date);

    const ResultDay = +selectDate - +thisDay;

    const TimeResult = Math.ceil(ResultDay / (1000 * 60 * 60 * 24));

    if (TimeResult > 0) {
      postPromiseFunc(TimeResult);
      return TimeResult;
    } else {
      window.alert("이미 지난 날짜입니다.");
    }
  }

  function postPromiseFunc(value: number) {
    const object: PostPromiseType = {
      title: promiseText,
      calcDay: value,
    };

    calendarHanlder(object);
    // 날짜랑 텍스트를 객체로 잘 만들어서 배열 안으로 넣어야함
  }

  function calendarHanlder(params: PostPromiseType | PostPromiseType[]) {
    let calResult;
    if (Array.isArray(params)) {
      calResult = params;
    } else {
      calResult = [params];
    }
    const copyArr = [...calendarArr];
    copyArr.push(calResult[0]);
    const filterArr = copyArr.filter((value, idx, arr) => {
      return (
        arr.findIndex((item) => {
          return item.title === value.title && item.calcDay === value.calcDay;
        }) === idx
      );
    });
    localStorage.setItem("calendarList", JSON.stringify(filterArr));
    CalDispatch(filterArr);
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
            <div className="days">{returnWeek}</div>
            <div className="date_wrap" ref={dayRef}>
              {returnDay}
            </div>
          </div>
          <section className="important_data">
            <div className="title_wrap">
              <div className="date_title">일정예약</div>
              {calendarArr.length > 0
                ? calendarArr.map((value, index) => {
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
                <input
                  id="d_day_txt"
                  ref={inputRef}
                  onChange={(e) => setPromise(e.target.value)}
                />
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
