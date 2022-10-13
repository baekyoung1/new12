import {format} from 'date-fns';
import React, {useContext, useMemo, useState} from 'react';
import CalendarView from '../components/CalendarView';
import FeedList from '../components/FeedList';
import LogContext from '../contexts/LogContext';

function CalendarScreen() {
  const {logs} = useContext(LogContext);
  const [hidden, setHidden] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );

  const onScrolledToBottom = isBottom => {
    if (hidden !== isBottom) {
      setHidden(isBottom);
    }
  };

  const markedDates = useMemo(
    () =>
      logs.reduce((acc, current) => {
        const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
        acc[formattedDate] = {marked: true};
        // console.log('formattedDate : ', formattedDate); // formattedDate : 2022-01-13
        // console.log('acc : ', acc); // acc :  {"2022-01-13": {"marked": true}}
        return acc;
      }, {}),
    [logs],
  );

  // {
  //   console.log('markedDates : ', markedDates); // markedDates :  {"2022-01-13": {"marked": true}}
  // }

  const filteredLogs = logs.filter(
    log => format(new Date(log.date), 'yyyy-MM-dd') === selectedDate,
  );

  // {
  //   console.log('filteredLogs : ', filteredLogs); // markedDates :  {"2022-01-13": {"marked": true}}
  //   console.log('selectedDate : ', selectedDate); // markedDates :  {"2022-01-13": {"marked": true}}
  // }

  return (
    <FeedList
      logs={filteredLogs}
      onScrolledToBottom={onScrolledToBottom}
      ListHeaderComponent={
        <CalendarView
          markedDates={markedDates}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      }
    />
  );
}

export default CalendarScreen;