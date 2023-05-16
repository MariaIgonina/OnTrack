import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function MyCalendar() {
  const datesArray = ['2023/05/13', '2023-05-16', '2023-05-19'];
  const currentDate = new Date();
  const work = () => {
    console.log('change')
  }
  

  const [startDate, setStartDate] = useState(new Date());
 
  return (
    <DatePicker
      dateFormat='yyyy/MM/dd'
      selected={new Date('2023/05/13')}
      onChange={work}
      inline
    />
  );
};
