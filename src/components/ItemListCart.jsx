import { Text, View } from "react-native";
import { HStack, Surface } from "@react-native-material/core";
import React from "react";
import { useParse } from "../hooks/useParse";
import { MaterialIcons } from "@expo/vector-icons";

const ItemListCart = ({ item, toggleDelete }) => {
  return (
    <Surface
      elevation={6}
      category="medium"
      style={{
        borderColor: "#000",
        borderWidth: 1,
        margin: 1,
        marginHorizontal: 5,
        padding: 5,
      }}
    >
      <View
        style={{ flex: 1, rowGap: 1, flexDirection: "row", flexWrap: "wrap" }}
      >
        <View style={{ width: "70%" }}>
          <Text>{item.name}</Text>
          <Text>
            Precio: $ {useParse().parseNum({ num: item.sellPrice })} - Cantidad:{" "}
            {useParse().parseNum({ num: item.stock })}
          </Text>
        </View>
        <HStack spacing={15} center style={{ width: "30%" }}>
          <MaterialIcons
            name="edit"
            onPress={() => {}}
            size={24}
            color="black"
          />
          <MaterialIcons
            name="delete"
            onPress={() => {
              toggleDelete(item.id);
            }}
            size={24}
            color="black"
          />
        </HStack>
      </View>
    </Surface>
  );
};

export default ItemListCart;
