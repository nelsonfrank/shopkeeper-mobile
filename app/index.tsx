import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useAssets } from "expo-asset";
import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { Image } from "expo-image";
import { useFonts, Trispace_500Medium } from "@expo-google-fonts/trispace";

const OverlayView = ({ children, style }: any) => {
  return <View style={[styles.overlay, style]}>{children}</View>;
};
const Page = () => {
  const [assets] = useAssets([require("@/assets/images/cover-img.png")]);

  let [fontsLoaded, fontError] = useFonts({
    Trispace_500Medium,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      {assets && (
        <Image
          style={styles.image}
          source={assets[0] as ImageSourcePropType}
          contentFit="cover"
          transition={1000}
        />
      )}
      <OverlayView style={styles.overlayContent}>
        <View
          style={{
            marginTop: 80,
            padding: 20,
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Text style={styles.header}>Manage your shop in one place</Text>
        </View>

        <View style={styles.buttons}>
          <Link
            href={"/login"}
            style={[
              defaultStyles.pillButton,
              { flex: 1, backgroundColor: Colors.dark },
            ]}
            asChild
          >
            <TouchableOpacity>
              <Text style={{ color: "white", fontSize: 22, fontWeight: "500" }}>
                Log in
              </Text>
            </TouchableOpacity>
          </Link>
          <Link
            href={"/signup"}
            style={[
              defaultStyles.pillButton,
              { flex: 1, backgroundColor: "#fff" },
            ]}
            asChild
          >
            <TouchableOpacity>
              <Text style={{ fontSize: 22, fontWeight: "500" }}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </OverlayView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  header: {
    fontSize: 54,
    fontWeight: "500",
    fontFamily: "Trispace_500Medium",
    textTransform: "uppercase",
    color: "white",
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
  },
  overlayContent: {
    // flex: 1,
  },
});
export default Page;
