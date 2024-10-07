import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/hooks/useTheme";
import { Theme } from "@/constants/Theme";

export default function CalendarScreen() {
    const [viewMode, setViewMode] = useState("week");
    const [selectedPerson, setSelectedPerson] = useState("Иванов И.И.");
    const navigation = useNavigation();

    const { theme, colors } = useTheme();
    const isDarkTheme = theme === "dark";

    // Update the navigation title to show the selected person's name
    useLayoutEffect(() => {
        navigation.setOptions({
            title: selectedPerson,
        });
    }, [navigation, selectedPerson]);

    const styles = createStyles(colors);
    const calendarTheme = createCalendarTheme(colors);

    const formatDate = (date: Date) => {
        return date.toISOString().split("T")[0];
    };

    // Get the start of the week (Sunday)
    const getStartOfWeek = (date: Date) => {
        const start = new Date(date);
        const day = start.getDay();
        const diff = start.getDate() - day;
        start.setDate(diff);
        start.setHours(0, 0, 0, 0);
        return start;
    };

    const getEndOfWeek = (date: Date) => {
        const end = getStartOfWeek(date);
        end.setDate(end.getDate() + 6);
        end.setHours(23, 59, 59, 999);
        return end;
    };

    const renderWeekCalendar = () => {
        const currentDate = new Date();
        const startOfWeek = getStartOfWeek(currentDate);
        const endOfWeek = getEndOfWeek(currentDate);

        return (
            <Calendar
                key={theme}
                style={styles.calendar}
                theme={calendarTheme}
                current={formatDate(currentDate)}
                hideExtraDays={false}
                markedDates={getWeekDays()}
                minDate={formatDate(startOfWeek)}
                maxDate={formatDate(endOfWeek)}
                firstDay={0}
            />
        );
    };

    // Get the days for the current week
    const getWeekDays = () => {
        const startOfWeek = getStartOfWeek(new Date());
        const days: any = {};

        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            days[formatDate(day)] = { selected: true, marked: true };
        }

        return days;
    };

    return (
        <View style={styles.container}>
            {/* Dropdown menu for calendar view mode */}
            <View style={styles.dropdownContainer}>
                <Text style={styles.label}>Выбор режима:</Text>
                <Picker
                    selectedValue={viewMode}
                    style={styles.picker}
                    onValueChange={(itemValue) => setViewMode(itemValue)}
                >
                    <Picker.Item label="Недельный" value="week" />
                    <Picker.Item label="Месячный" value="month" />
                </Picker>
            </View>

            {/* Render calendar */}
            {viewMode === "week" ? (
                renderWeekCalendar()
            ) : (
                <Calendar
                    key={theme}
                    style={styles.calendar}
                    theme={calendarTheme}
                    hideExtraDays={false}
                />
            )}
        </View>
    );
}

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: theme.background,
        },
        dropdownContainer: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
        },
        label: {
            color: theme.color,
            fontSize: 16,
            marginRight: 10,
        },
        picker: {
            color: theme.color,
            height: 50,
            width: 150,
        },
        calendar: {
            borderRadius: 10,
            color: theme.color,
            backgroundColor: theme.background,
            borderColor: theme.color,
            borderWidth: 1,
        },
    });

const createCalendarTheme = (theme: Theme) => {
    return {
        backgroundColor: theme.background,
        calendarBackground: theme.background,
        textSectionTitleColor: theme.color,
        selectedDayBackgroundColor: "#00adf5",
        selectedDayTextColor: "#ffffff",
        todayTextColor: "#00adf5",
        dayTextColor: theme.color,
        textDisabledColor: theme.color,
    };
};
