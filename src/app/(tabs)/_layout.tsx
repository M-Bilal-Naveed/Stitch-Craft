import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs, usePathname } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabLayout = () => {
  const hiddenTabRoutes = ["/chat/theme"];

  const pathname = usePathname();
  const theme = useTheme();

  const hideTabBar = hiddenTabRoutes.some((route) => pathname.includes(route));
  const insets = useSafeAreaInsets();

  const tabBarHeight = 60 + insets.bottom; // Adjust 60 to your desired base height

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: hideTabBar
          ? { display: "none" }
          : [
              styles.tabBar,
              {
                height: tabBarHeight,
                paddingBottom: insets.bottom,
                backgroundColor: theme.colors.primary,
                borderColor: theme.colors.surfaceVariant,
              },
            ],
        headerShown: false,
        tabBarActiveTintColor: theme.colors.onPrimary,
        tabBarInactiveTintColor: theme.colors.onSecondary,
        tabBarItemStyle: {
          paddingTop: 10,
        },
        tabBarBackground: () => (
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundColor: theme.colors.primary,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
          />
        ),
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={
                [
                  // styles.iconContainer,
                  // focused && { backgroundColor: theme.colors.onSecondary },
                ]
              }
            >
              {/* <Image
                source={focused ? images.homeRed : images.home}
                style={styles.img}
              /> */}
              <Feather
                name="book-open"
                size={24}
                color={
                  focused ? theme.colors.onPrimary : theme.colors.onSecondary
                }
              />
            </View>
          ),
        }}
      />
      {/* Setting Tab */}
      <Tabs.Screen
        name="setting"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[]}>
              <Ionicons
                name="chatbox-outline"
                size={24}
                color={
                  focused ? theme.colors.onPrimary : theme.colors.onSecondary
                }
              />
              {/* <Image 
                    source={focused ? icon.homeRed : icon.search} 
                    style={styles.img}
                    /> */}
            </View>
          ),
        }}
      />
      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[]}>
              <Feather
                name="book-open"
                size={24}
                color={
                  focused ? theme.colors.onPrimary : theme.colors.onSecondary
                }
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  img: {
    width: 24,
    height: 24,
  },
  tabBar: {
    overflow: "hidden",
    borderTopWidth: 2,
    elevation: 0,
    shadowOpacity: 0,
  },
  iconContainer: {
    width: 45,
    height: 40,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 12,
  },
});
