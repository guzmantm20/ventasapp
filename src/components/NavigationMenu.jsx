import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Surface, Wrap } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const RoutesMenu = ["Home", "Reports", "Products"];
const NavigationMenu = () => {
  const navigation = useNavigation();
  const routesActives = navigation.getState().routeNames;
  const showMenu = routesActives.some((route) => RoutesMenu.includes(route));

  if (!showMenu) {
    return <View></View>;
  }
  return (
    <Surface elevation={6} category="medium" style={styles.container}>
      <Wrap spacing={10}>
        <Pressable
          onPress={() => {
            navigation.navigate("Reports");
          }}
          style={styles.item}
        >
          <FontAwesome name="list-ul" size={24} color="black" />
          <Text>Reprotes</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("Home");
          }}
          style={styles.item}
        >
          <FontAwesome name="home" size={24} color="black" />
          <Text>Inicio</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("Products");
          }}
          style={styles.item}
        >
          <FontAwesome name="truck" size={24} color="black" />
          <Text>Productos</Text>
        </Pressable>
      </Wrap>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6200ee",
    margin: 10,
    alignItems: "center",
  },
  item: {
    flex: 1,
    alignItems: "center",
  },
});

export default NavigationMenu;
