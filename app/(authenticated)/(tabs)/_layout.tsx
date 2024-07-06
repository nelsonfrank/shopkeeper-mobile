import CustomHeader, { CustomHeaderGreeting } from "@/components/CustomHeader";
import Colors from "@/constants/Colors";
import {
  FontAwesome,
  FontAwesome5,
  Entypo,
  Octicons,
  FontAwesome6,
} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Link, Tabs } from "expo-router";
import { TouchableOpacity } from "react-native";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
          height: 50,
        },
        tabBarBackground: () => (
          <BlurView
            experimentalBlurMethod={"dimezisBlurView"}
            intensity={100}
            tint={"extraLight"}
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.05)",
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <Entypo name="home" size={size} color={color} />
          ),
          header: () => (
            <CustomHeaderGreeting
              title="Hey, Nelson"
              description="Good Morning"
            />
          ),
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="stocks"
        options={{
          title: "Stocks",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="boxes" size={size} color={color} />
          ),
          header: () => (
            <CustomHeaderGreeting
              title="Stock"
              description="Optimal Inventory Management for Seamless Operations"
            />
          ),
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="purchases"
        options={{
          title: "Purchases",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="shopping-cart" size={size} color={color} />
          ),
          header: () => (
            <CustomHeaderGreeting
              title="Purchases"
              description="Streamline Shopping Experience with Seamless Transactions"
              displayCart={true}
            />
          ),
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: "Expenses",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="euro" size={size} color={color} />
          ),
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
        }}
      />
      <Tabs.Screen
        name="sales"
        options={{
          title: "Sales",
          tabBarIcon: ({ size, color }) => (
            <Octicons name="graph" size={size} color={color} />
          ),
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
        }}
      />
    </Tabs>
  );
};
export default Layout;
