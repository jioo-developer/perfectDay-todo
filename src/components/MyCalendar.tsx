import CalendarText from "./calendar/CalendarText";
import Calendar from "./calendar/calendar";
import "../asset/calendar.scss";
import { CalendarProvider } from "./calendar/calendarContext";

const MyCalendar = () => {
  return (
    <div className="calendar">
      <CalendarProvider>
        <Calendar />
        <CalendarText />
      </CalendarProvider>
    </div>
  );
};

export default MyCalendar;
