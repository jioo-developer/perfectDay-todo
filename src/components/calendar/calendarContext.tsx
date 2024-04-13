import React, { ReactNode, createContext, useContext, useState } from "react";
import { today } from "../../module/today";
import { dateType } from "../../module/interfaceModule";

type CalendarContextProps = {
  week: string[];
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  selectedMonth: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  dateTotalCount: number;
  select: number;
  setSelect: React.Dispatch<React.SetStateAction<number>>;
  nowday: dateType;
};

// 기본값 타입

const CalendarContext = createContext<CalendarContextProps>({
  week: [],
  selectedYear: 0,
  setSelectedYear: () => {},
  selectedMonth: 0,
  setSelectedMonth: () => {},
  dateTotalCount: 0,
  select: 0,
  setSelect: () => {},
  nowday: {
    year: 0,
    month: 0,
    date: 0,
    day: 0,
  },
});

// 기본값

export const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const nowday = { ...today };
  today.day = new Date().getDay();
  // 현재 날짜

  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const [selectedYear, setSelectedYear] = useState<number>(nowday.year);
  // 선택년도 state
  const [selectedMonth, setSelectedMonth] = useState<number>(nowday.month);
  // 선택년 월 state
  const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate();

  const [select, setSelect] = useState<number>(0);
  return (
    <CalendarContext.Provider
      value={{
        week,
        selectedYear,
        setSelectedYear,
        selectedMonth,
        setSelectedMonth,
        dateTotalCount,
        select,
        setSelect,
        nowday,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  return useContext(CalendarContext);
};
