import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { Theme } from "@/constants/Theme";
import { useTheme } from "@/hooks/useTheme";

export function Collapsible({
    children,
    title,
}: PropsWithChildren & { title: string }) {
    const [isOpen, setIsOpen] = useState(false);

    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <View style={{ backgroundColor: colors.background }}>
            <TouchableOpacity
                style={styles.heading}
                onPress={() => setIsOpen((value) => !value)}
                activeOpacity={0.8}
            >
                <Ionicons
                    name={isOpen ? "chevron-down" : "chevron-forward-outline"}
                    size={18}
                    color={colors.color}
                />
                <ThemedText type="defaultSemiBold">{title}</ThemedText>
            </TouchableOpacity>
            {isOpen && <View style={styles.content}>{children}</View>}
        </View>
    );
}

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        heading: {
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
        },
        content: {
            backgroundColor: theme.background,
            marginTop: 6,
            marginLeft: 24,
        },
    });
