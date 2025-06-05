import React, { useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import "react-calendar/dist/Calendar.css";

interface DatePickerProps {
  onSelectDates: (range: [Date | null, Date | null]) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onSelectDates }) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const handleDateChange = (value: any) => {
    if (!dateRange[0]) {
      setDateRange([value, null]); // Выбираем первый день
    } else if (!dateRange[1] && value > dateRange[0]) {
      setDateRange([dateRange[0], value]); // Выбираем второй день
      onSelectDates([dateRange[0], value]);
    } else {
      setDateRange([value, null]); // Сбрасываем, если выбрано заново
    }
  };

  return (
    <div className="datepicker-container">
      <Calendar
        onClickDay={handleDateChange}
        value={dateRange}
        locale="en-EN"
        minDate={new Date()}
        tileClassName={({ date }) =>
          dateRange[0] &&
          dateRange[1] &&
          date >= dateRange[0] &&
          date <= dateRange[1]
            ? "selected-day"
            : ""
        }
      />
      <p className="selected-dates">
        {dateRange[0]
          ? `Начало: ${format(dateRange[0], "dd.MM.yyyy")}`
          : "Choose Start Date"}
        {dateRange[1] ? ` — Конец: ${format(dateRange[1], "dd.MM.yyyy")}` : ""}
      </p>
    </div>
  );
};

export default DatePicker;
