import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { ThemeProvider } from "@/hooks/useTheme";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "home" : "home-outline"}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="workers"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "people-outline" : "people-sharp"}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "code-slash" : "code-slash-outline"}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
