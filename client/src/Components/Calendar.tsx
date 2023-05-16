import React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';

export default function DateCalendarViews() {
    const datesArray = ['2023-05-03', '2022-05-07', '2022-05-20']
    const [вates, setDates] = useState(datesArray)
    const currentDate = dayjs();

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateCalendar']}>

          {вates.map(date => (
            <DemoItem key={date} label={dayjs(date).format('YYYY-MM-DD')}>
              <DateCalendar defaultValue={dayjs(date)} />
              <DateCalendar defaultValue={currentDate} />
            </DemoItem>
          ))}
        </DemoContainer>
      </LocalizationProvider>
    );
  }