import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { Link } from "expo-router";
import {
  useFonts,
  Trispace_500Medium,
  Trispace_400Regular,
} from "@expo-google-fonts/trispace";

const CustomHeader = () => {
  const { top } = useSafeAreaInsets();

  return (
    <BlurView intensity={80} tint={"extraLight"} style={{ paddingTop: top }}>
      <View
        style={[
          styles.container,
          {
            height: 60,
            gap: 10,
            paddingHorizontal: 20,
            backgroundColor: "transparent",
          },
        ]}
      >
        <Link href={"/(authenticated)/(modals)/account"} asChild>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: Colors.gray,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "500", fontSize: 16 }}>
              SG
            </Text>
          </TouchableOpacity>
        </Link>
        <View style={styles.searchSection}>
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={20}
            color={Colors.dark}
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={Colors.dark}
          />
        </View>
        <View style={styles.circle}>
          <Ionicons name={"stats-chart"} size={20} color={Colors.dark} />
        </View>
        <View style={styles.circle}>
          <Ionicons name={"card"} size={20} color={Colors.dark} />
        </View>
      </View>
    </BlurView>
  );
};

export interface CustomHeaderGreetingProps {
  title: string;
  description?: string;
}
export const CustomHeaderGreeting = ({
  title,
  description,
}: CustomHeaderGreetingProps) => {
  const { top } = useSafeAreaInsets();
  let [fontsLoaded, fontError] = useFonts({
    Trispace_500Medium,
    Trispace_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <BlurView intensity={80} tint={"extraLight"} style={{ paddingTop: top }}>
      <View
        style={[
          styles.container,
          {
            height: 80,
            gap: 10,
            paddingHorizontal: 20,
            marginTop: 40,
            marginBottom: 20,
            backgroundColor: "transparent",
            flexDirection: "column",
          },
        ]}
      >
        <Text style={styles.greetingTitle}>{title}</Text>
        {description && (
          <Text style={styles.greetingDescription}>{description}</Text>
        )}
      </View>
    </BlurView>
  );
};
const styles = StyleSheet.create({
  container: {},
  btn: {
    padding: 10,
    backgroundColor: Colors.gray,
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 30,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: Colors.lightGray,
    color: Colors.dark,
    borderRadius: 30,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  greetingTitle: {
    fontFamily: "Trispace_500Medium",
    fontSize: 30,
    marginBottom: 7,
  },
  greetingDescription: {
    fontFamily: "Trispace_400Regular",
    fontSize: 20,
    fontWeight: "400",
    color: Colors.gray,
  },
});
export default CustomHeader;
