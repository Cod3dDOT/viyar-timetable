import React from 'react';
import { ThemeProvider } from './ThemeContext'; 
import CalendarScreen from '../../components/CalendarScreen'; 

export default function App() {
  return (
    <ThemeProvider>
      {}
      <CalendarScreen />
    </ThemeProvider>
  );
}
