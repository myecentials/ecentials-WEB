import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";


const HospitalCalendar = ({ showSlots, views, onChange, className }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <DateCalendar
        className={"mr " + className}
        disablePast={true}
        onChange={onChange}
        
       
      />
    </LocalizationProvider>
  );
};

export default HospitalCalendar;



