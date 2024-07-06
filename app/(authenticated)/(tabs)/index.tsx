import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";

export default function HomeScreen() {
  const headerHeight = useHeaderHeight();

  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}
    >
      <View style={{ marginTop: 30 }}>
        <View style={styles.cardsContainer}>
          <Link
            href={"stocks"}
            style={[
              styles.cardContainer,
              { marginLeft: 16, backgroundColor: Colors.dashboardColor1 },
            ]}
            asChild
          >
            <TouchableOpacity>
              <View>
                <FontAwesome5
                  name="list-alt"
                  size={24}
                  color={Colors.lightGray}
                />
                <Text style={styles.cardTitle}>500</Text>
                <Text style={styles.cardDescription}>Available Stock</Text>
              </View>
            </TouchableOpacity>
          </Link>
          <Link
            href={"sales"}
            style={[
              styles.cardContainer,
              {
                marginLeft: 16,
                marginRight: 16,
                backgroundColor: Colors.dashboardColor2,
              },
            ]}
            asChild
          >
            <TouchableOpacity>
              <View>
                <MaterialCommunityIcons
                  name="chart-box-outline"
                  size={28}
                  color={Colors.lightGray}
                />
                <Text style={styles.cardTitle}>1.5M Tzs</Text>
                <Text style={styles.cardDescription}>Total Sales</Text>
              </View>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={[styles.cardsContainer, { marginTop: 16 }]}>
          <Link
            href={"sales"}
            style={[
              styles.cardContainer,
              { marginLeft: 16, backgroundColor: Colors.dashboardColor3 },
            ]}
            asChild
          >
            <TouchableOpacity>
              <View>
                <View style={styles.dollarSignIcon}>
                  <FontAwesome5
                    name="dollar-sign"
                    size={20}
                    color={Colors.primary}
                  />
                </View>
                <Text style={styles.cardTitle}>500,000 Tzs</Text>
                <Text style={styles.cardDescription}>Revenue</Text>
              </View>
            </TouchableOpacity>
          </Link>
          <Link
            href={"expenses"}
            style={[
              styles.cardContainer,
              {
                marginLeft: 16,
                marginRight: 16,
                backgroundColor: Colors.dashboardColor4,
              },
            ]}
            asChild
          >
            <TouchableOpacity>
              <FontAwesome name="euro" size={24} color={Colors.lightGray} />
              <Text style={styles.cardTitle}>300,000 Tzs</Text>
              <Text style={styles.cardDescription}>Total Expenses</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: "row",
  },
  cardContainer: {
    flexDirection: "column",
    borderRadius: 10,
    backgroundColor: "red",
    paddingHorizontal: 16,
    paddingVertical: 24,
    flex: 1,
    aspectRatio: 1.5,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginVertical: 5,
  },
  cardDescription: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
  },
  dollarSignIcon: {
    borderRadius: 100,
    backgroundColor: "white",
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
});
