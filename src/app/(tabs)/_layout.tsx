import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs, usePathname } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "../../theme/ThemeProvider";

const TabLayout = () => {
  const hiddenTabRoutes = ["/customers/addCustomer"];

  const pathname = usePathname();
  const { theme } = useAppTheme();

  const hideTabBar = hiddenTabRoutes.some((route) => pathname.includes(route));
  const insets = useSafeAreaInsets();

  const tabBarHeight = 60 + insets.bottom; // Adjust 60 to your desired base height

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: hideTabBar
          ? { display: "none" }
          : [
              styles.tabBar,
              {
                height: tabBarHeight,
                paddingBottom: insets.bottom,
                backgroundColor: theme.colors.containerBackground,
                borderColor: theme.colors.primary,
              },
            ],
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primaryMint,
        tabBarInactiveTintColor: theme.colors.surface,
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
              backgroundColor: theme.colors.containerBackground,
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
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
          tabBarIcon: ({ focused }) => (
            <View
              style={
                [
                  // styles.iconContainer,
                  // focused && { backgroundColor: theme.colors.inactiveIcon },
                ]
              }
            >
              {/* <Image
                source={focused ? images.homeRed : images.home}
                style={styles.img}
              /> */}
              <AntDesign
                name="home"
                size={24}
                color={
                  focused ? theme.colors.activeIcon : theme.colors.inactiveIcon
                }
              />
            </View>
          ),
        }}
      />
      {/* Customers Tab */}
      <Tabs.Screen
        name="customers"
        options={{
          tabBarLabel: "Customers",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
          tabBarIcon: ({ focused }) => (
            <View style={[]}>
              <FontAwesome
                name="vcard"
                size={24}
                color={
                  focused ? theme.colors.activeIcon : theme.colors.inactiveIcon
                }
              />
            </View>
          ),
        }}
      />
      {/* Order Tab */}
      <Tabs.Screen
        name="orders"
        options={{
          tabBarLabel: "Orders",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
          tabBarIcon: ({ focused }) => (
            <View style={[]}>
              <Ionicons
                name="shirt-outline"
                size={24}
                color={
                  focused ? theme.colors.activeIcon : theme.colors.inactiveIcon
                }
              />
            </View>
          ),
        }}
      />
      {/* settings */}

      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
          tabBarIcon: ({ focused }) => (
            <View style={[]}>
              <Feather
                name="settings"
                size={24}
                color={
                  focused ? theme.colors.activeIcon : theme.colors.inactiveIcon
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
    borderTopWidth: 0,
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
