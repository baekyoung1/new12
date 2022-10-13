import React from 'react';
import {Calendar} from 'react-native-calendars';
import {StyleSheet} from 'react-native';
import {daysInWeek} from 'date-fns';

function CalendarView({markedDates, selectedDate, onSelectDate}) {
  //   const markedDates = {
  //     '2022-01-17': {
  //       selected: true,
  //     },
  //     '2022-01-18': {
  //       marked: true,
  //     },
  //     '2022-01-19': {
  //       marked: true,
  //     },
  //   };

  const markedSelectedDates = {
    ...markedDates,
    // key값 동적 할당
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    },
  };

  return (
    <Calendar
      style={styles.calendar}
      markedDates={markedSelectedDates}
      onDayPress={day => {
        console.log('day : ', day); // day :  {"dateString": "2022-01-05", "day": 5, "month": 1, "timestamp": 1641340800000, "year": 2022}
        onSelectDate(day.dateString);
      }}
      theme={{
        selectedDayBackgroundColor: '#009688',
        arrowColor: '#009688',
        dotColor: '#009688',
        todayTextColor: '#009688',
      }}
    />
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});

export default CalendarView;