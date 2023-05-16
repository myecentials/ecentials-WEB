import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const HospitalCalendar = ({ showSlots, views }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        className="mr"
        disablePast={true}
        slots={
          showSlots && {
            leftArrowIcon: "Previous",
            rightArrowIcon: "Previous",
          }
        }
      />
    </LocalizationProvider>
  );
};

export default HospitalCalendar;