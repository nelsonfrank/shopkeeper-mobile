import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
  Button,
} from "react-native";

import { Image } from "expo-image";
import { Entypo, Feather, FontAwesome6 } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import Colors from "@/constants/Colors";
import { useHeaderHeight } from "@react-navigation/elements";
import {
  useFonts,
  Trispace_400Regular,
  Trispace_500Medium,
  Trispace_600SemiBold,
} from "@expo-google-fonts/trispace";

const products = [
  {
    id: "1",
    name: "Vitold 65-VX",
    description: "Air source heat pump",
    price: "100k Tzs",
    image: "https://via.placeholder.com/150",
    tag: "NEW",
  },
  {
    id: "2",
    name: "Vitowarm 240",
    description: "Gas boiler",
    price: "100k Tzs",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "Vitowarm 290-X",
    description: "Gas boiler",
    price: "100k Tzs",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "4",
    name: "ViCharge 2D",
    description: "Energy management",
    price: "100k Tzs",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "5",
    name: "ViCharge 2D",
    description: "Energy management",
    price: "100k Tzs",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "6",
    name: "ViCharge 2D",
    description: "Energy management",
    price: "100k Tzs",
    image: "https://via.placeholder.com/150",
  },
];

const ProductCard = ({ product }: any) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {product.image && <Image source={product.image} style={styles.image} />}
        {product.tag && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{product.tag}</Text>
          </View>
        )}
      </View>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};
const PurcharsesScreen = () => {
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

  return (
    <View style={[styles.container, { paddingTop: headerHeight }]}>
      <View style={{ marginTop: 30 }}>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductCard
              product={{
                ...item,
                image: assets ? assets[Math.floor(Math.random() * 3)] : null,
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginBottom: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  card: {
    backgroundColor: Colors.white,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: 170,
    height: 150,
    borderRadius: 10,
    marginBottom: 4,
  },
  tag: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#FF0000",
    borderRadius: 5,
    padding: 5,
  },
  tagText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#000",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 5,
    flex: 1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PurcharsesScreen;
