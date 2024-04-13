import { useEffect, useRef, useState } from "react";
import { PostPromiseType } from "../../module/interfaceModule";
import { useCalendarContext } from "./calendarContext";

const CalendarText = () => {
  const { selectedYear, selectedMonth, select, nowday } = useCalendarContext();

  // 일정을 잡기위해 선택 한 날짜
  const inputRef = useRef<HTMLInputElement>(null);

  const [promiseText, setPromise] = useState<string>("");

  const [calendarArr, CalDispatch] = useState<PostPromiseType[]>([]);

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
    const calendarResult: PostPromiseType[] = JSON.parse(
      localStorage.getItem("calendarList") || "[]"
    );
    if (calendarResult.length > 0) {
      calendarHanlder(calendarResult);
    }
  }, []);
  return (
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
  );
};

export default CalendarText;
