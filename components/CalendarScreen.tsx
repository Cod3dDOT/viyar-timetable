import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useTheme } from '../app/(tabs)/ThemeContext'; 

const CalendarScreen = () => {
  const [viewMode, setViewMode] = useState('week');
  const [selectedPerson, setSelectedPerson] = useState('Иванов И.И.');
  const { isDarkTheme } = useTheme();
  const navigation = useNavigation();
  console.log(isDarkTheme);  

  // Update the navigation title to show the selected person's name
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedPerson,
    });
  }, [navigation, selectedPerson]);

  // Define the calendar theme based on the device theme
  const calendarTheme = {
    calendarBackground: isDarkTheme ? '#000000' : '#ffffff',  
    dayTextColor: isDarkTheme ? '#ffffff' : '#000000',        
    monthTextColor: isDarkTheme ? '#ffffff' : '#000000',      
    textSectionTitleColor: isDarkTheme ? '#ffffff' : '#000000',
    arrowColor: isDarkTheme ? '#ffffff' : '#000000',          
    todayTextColor: isDarkTheme ? '#00adf5' : '#000000',    
    selectedDayBackgroundColor: isDarkTheme ? '#333333' : '#e6e6e6', 
    selectedDayTextColor: isDarkTheme ? '#ffffff' : '#000000', 
    textDisabledColor: isDarkTheme ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.3)', 
    dotColor: isDarkTheme ? '#00adf5' : '#000000',            
    selectedDotColor: isDarkTheme ? '#ffffff' : '#000000',    
  };
  

  // Function to render the calendar for the week
  const renderWeekCalendar = () => {
    const currentDate = moment();
    const startOfWeek = currentDate.startOf('week');
    const endOfWeek = currentDate.endOf('week');

    return (
      <Calendar
        style={isDarkTheme ? styles.darkCalendar : styles.lightCalendar} 
        theme={calendarTheme}
        current={currentDate.format('YYYY-MM-DD')} 
        hideExtraDays={false} 
        markedDates={getWeekDays()} 
        minDate={startOfWeek.format('YYYY-MM-DD')} 
        maxDate={endOfWeek.format('YYYY-MM-DD')} 
        firstDay={0} 
      />
    );
  };

  // Get the days for the current week
  const getWeekDays = (): { [key: string]: { selected: boolean; marked: boolean } } => {
    const startOfWeek = moment().startOf('week');
    const days: { [key: string]: { selected: boolean; marked: boolean } } = {};

    for (let i = 0; i < 7; i++) {
      const day = moment(startOfWeek).add(i, 'days');
      days[day.format('YYYY-MM-DD')] = { selected: true, marked: true };
    }

    return days;
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#000' : '#fff' }]}>
      {/* Dropdown menu for calendar view mode */}
      <View style={styles.dropdownContainer}>
        <Text style={[styles.label, { color: isDarkTheme ? '#fff' : '#000' }]}>Выбор режима:</Text>
        <Picker
          selectedValue={viewMode}
          style={[styles.picker, { color: isDarkTheme ? '#fff' : '#000' }]}
          onValueChange={(itemValue) => setViewMode(itemValue)}
        >
          <Picker.Item label="Недельный" value="week" />
          <Picker.Item label="Месячный" value="month" />
        </Picker>
      </View>

      {/* Render calendar */}
      {viewMode === 'week' ? renderWeekCalendar() : (
        <Calendar
          style={isDarkTheme ? styles.darkCalendar : styles.lightCalendar}
          theme={calendarTheme} 
          hideExtraDays={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', 
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  picker: {
    height: 50,
    width: 150,
  },
  // Define dynamic styles for dark and light themes for the calendar container 
  darkCalendar: {
    borderRadius: 10,
    backgroundColor: '#000',
    borderColor: '#fff', 
    borderWidth: 1,
  },
  lightCalendar: {
    borderRadius: 10,
    backgroundColor: '#fff', 
    borderColor: '#000', 
    borderWidth: 1,
  },
});

export default CalendarScreen;
