import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Modal,
    Button,
    Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "@/hooks/useTheme";
import { Theme } from "@/constants/Theme";

export default function SettingsScreen() {
    const { theme, colors, setTheme } = useTheme();

    const [language, setLanguage] = useState("System Default");
    const [isModalVisible, setModalVisible] = useState(false);
    const [reminderTime, setReminderTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const styles = createStyles(colors);

    const changeLanguage = (newLanguage: string) => {
        setLanguage(newLanguage);
        setModalVisible(false);
    };

    const onDateChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || reminderTime;
        setShowPicker(false);
        setReminderTime(currentDate);
    };

    // Open GitHub source code link
    const openSourceCode = () => {
        Linking.openURL("https://github.com/");
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>VIYAR Timetable</Text>
            </View>

            <View style={styles.settingsContainer}>
                <TouchableOpacity
                    style={styles.settingItem}
                    onPress={() =>
                        setTheme(theme === "light" ? "dark" : "light")
                    }
                >
                    <Ionicons
                        name="sunny-outline"
                        size={24}
                        color={colors.color}
                    />
                    <View style={styles.settingTextContainer}>
                        <Text style={[styles.settingTitle]}>Theme</Text>
                        <Text style={styles.settingSubtitle}>
                            {theme === "dark" ? "Dark" : "Light"}
                        </Text>
                    </View>
                </TouchableOpacity>

                {}
                <TouchableOpacity
                    style={styles.settingItem}
                    onPress={() => setModalVisible(true)}
                >
                    <Ionicons
                        name="globe-outline"
                        size={24}
                        color={colors.color}
                    />
                    <View style={styles.settingTextContainer}>
                        <Text style={[styles.settingTitle]}>Language</Text>
                        <Text style={styles.settingSubtitle}>{language}</Text>
                    </View>
                </TouchableOpacity>

                {}
                <TouchableOpacity
                    style={styles.settingItem}
                    onPress={() => setShowPicker(true)}
                >
                    <AntDesign
                        name="clockcircleo"
                        size={24}
                        color={colors.color}
                    />
                    <View style={styles.settingTextContainer}>
                        <Text style={styles.settingTitle}>Reminder</Text>
                        <Text style={styles.settingSubtitle}>
                            {reminderTime.toLocaleTimeString()}
                        </Text>
                    </View>
                </TouchableOpacity>

                {}
                <Modal visible={isModalVisible} animationType="slide">
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            title="English"
                            onPress={() => changeLanguage("English")}
                        />
                        <Button
                            title="Ukrainian"
                            onPress={() => changeLanguage("Ukrainian")}
                        />
                        <Button
                            title="Close"
                            onPress={() => setModalVisible(false)}
                        />
                    </View>
                </Modal>

                {showPicker && (
                    <DateTimePicker
                        value={reminderTime}
                        mode="time"
                        display="default"
                        onChange={onDateChange}
                    />
                )}
            </View>

            <View style={styles.line} />

            <View style={styles.settingsContainer}>
                <TouchableOpacity style={styles.settingItem}>
                    <Ionicons
                        name="chatbubble-outline"
                        size={24}
                        color={colors.color}
                    />
                    <View style={styles.settingTextContainer}>
                        <Text style={[styles.settingTitle]}>Feedback</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem}>
                    <Ionicons
                        name="star-outline"
                        size={24}
                        color={colors.color}
                    />
                    <View style={styles.settingTextContainer}>
                        <Text style={[styles.settingTitle]}>
                            Rate an application
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.settingItem}
                    onPress={openSourceCode}
                >
                    <Ionicons
                        name="code-slash-outline"
                        size={24}
                        color={colors.color}
                    />
                    <View style={styles.settingTextContainer}>
                        <Text style={[styles.settingTitle]}>Source code</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {}
            <View style={styles.versionContainer}>
                <Text style={styles.versionText}>Version 0.0.1</Text>
            </View>
        </ScrollView>
    );
}

const createStyles = (theme: Theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
            paddingHorizontal: 16,
            paddingTop: 30,
        },
        header: {
            paddingVertical: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#333",
        },
        headerText: {
            color: theme.color,
            fontSize: 24,
            fontWeight: "bold",
        },
        line: {
            borderBottomWidth: 1,
            borderBottomColor: "#333",
            width: "100%",
            marginVertical: 20,
        },
        settingsContainer: {
            marginTop: 30,
        },
        settingItem: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 15,
        },
        settingTextContainer: {
            color: theme.color,
            marginLeft: 15,
        },
        settingTitle: {
            color: theme.color,
            fontSize: 16,
            fontWeight: "500",
        },
        settingSubtitle: {
            color: "gray",
            fontSize: 14,
        },
        versionContainer: {
            marginTop: 30,
            alignItems: "center",
        },
        versionText: {
            color: "gray",
            fontSize: 12,
        },
    });
};
