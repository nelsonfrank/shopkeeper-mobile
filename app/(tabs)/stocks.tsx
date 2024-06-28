import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { Image } from "expo-image";
import { Entypo, Feather } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import Colors from "@/constants/Colors";
import {
  useFonts,
  Trispace_400Regular,
  Trispace_500Medium,
  Trispace_600SemiBold,
} from "@expo-google-fonts/trispace";

const products = [
  {
    id: "1",
    name: "Sunsilk Black Shine Shampoo",
    units: "100",
    condition: "About to Expire",
  },
  {
    id: "2",
    name: "Havit H654d Gaming Headphone",
    units: "100",
    condition: "Good",
  },
  {
    id: "3",
    name: "Cadbury Britania Burboun",
    units: "100",
    condition: "Expired",
  },
  {
    id: "4",
    name: "Dove Daily Soap",
    units: "100",
    condition: "Good",
  },
  {
    id: "5",
    name: "Apple iPod 4-White",
    units: "50",
    condition: "Good",
  },
  {
    id: "6",
    name: "Soundcore Headset-Blue",
    units: "20",
    condition: "Good",
  },
  {
    id: "7",
    name: "Soundcore Headset-Blue",
    units: "20",
    condition: "Good",
  },
  {
    id: "8",
    name: "Soundcore Headset-Blue",
    units: "20",
    condition: "Good",
  },
];

import { useHeaderHeight } from "@react-navigation/elements";
const StockScreen = () => {
  const headerHeight = useHeaderHeight();

  const [assets] = useAssets([
    require("@/assets/images/products/bag.png"),
    require("@/assets/images/products/glasses.png"),
    require("@/assets/images/products/shoe.png"),
  ]);

  let [fontsLoaded, fontError] = useFonts({
    Trispace_400Regular,
    Trispace_500Medium,
    Trispace_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const renderItem = ({ item }: any) => (
    <View style={[styles.productContainer]}>
      {assets && (
        <Image
          source={assets[Math.floor(Math.random() * 3)] as ImageSourcePropType}
          style={styles.productImage}
        />
      )}
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productSize}>
          <Text style={{ fontWeight: "bold" }}>No. units: </Text>
          {item.units}
        </Text>
        <Text style={styles.productPrice}>
          <Text style={{ fontWeight: "bold" }}>Condition: </Text>
          {item.condition}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: headerHeight }]}>
      <View style={{ marginTop: 30 }}>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
        <TouchableOpacity style={styles.addButton}>
          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 8 }}
          >
            <Entypo name="circle-with-plus" size={24} color="white" />
            <Text style={styles.addButtonText}>Add Product</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 60,
  },
  listContent: {
    paddingBottom: 80,
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontFamily: "Trispace_600SemiBold",
    fontSize: 16,
  },
  productSize: {
    fontFamily: "Trispace_400Regular",
    fontSize: 14,
    color: Colors.gray,
  },
  productPrice: {
    fontFamily: "Trispace_400Regular",
    fontSize: 14,
    color: Colors.gray,
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: Colors.primary,
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 32,
    elevation: 4,
  },
  addButtonText: {
    fontFamily: "Trispace_500Medium",
    color: "#FFF",
    fontSize: 16,
  },
});

export default StockScreen;
