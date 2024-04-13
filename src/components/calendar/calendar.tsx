import { useCallback, useEffect, useMemo, useRef } from "react";
import { useCalendarContext } from "./calendarContext";

function Calendar() {
  const {
    week,
    selectedYear,
    selectedMonth,
    setSelectedYear,
    setSelectedMonth,
    dateTotalCount,
    setSelect,
    nowday,
  } = useCalendarContext();

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
          <div
            className="day"
            onClick={() => {
              if (typeof value === "string") {
                setSelect(parseInt(value));
              } else {
                setSelect(value);
              }
            }}
          >
            {value}
          </div>
        );
      } else {
        return console.log("---");
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

  useEffect(() => {
    todayCheck();
  }, [selectedMonth]);

  return (
    <>
      <section className="cal_data pd-x20">
        <div className="date_top">
          <div className="date_title">
            {selectedYear}.
            {selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth}
          </div>
          <div className="date_arrow">
            <button className="prev_btn change_btn" onClick={prevMonth}>
              &lt;
            </button>
            <button className="next_btn change_btn" onClick={nextMonth}>
              &gt;
            </button>
          </div>
        </div>
        <div className="cal_wrap">
          <ul className="days">
            {week.map((value, index) => {
              return (
                <li className="day" key={`week-${index}`}>
                  {value}
                </li>
              );
            })}
          </ul>
          <div className="date_wrap" ref={dayRef}>
            {returnDay}
          </div>
        </div>
      </section>
    </>
  );
}

export default Calendar;
