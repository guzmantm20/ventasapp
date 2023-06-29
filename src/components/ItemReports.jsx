import { View, Text } from "react-native";
import React from "react";
import { HStack, Surface } from "@react-native-material/core";
import { MaterialIcons } from "@expo/vector-icons";
import { useParse } from "../hooks/useParse";

const reportType = {
  sell: {name: "Venta", color: "#98EECC"},
  buy: {name: "Compra", color: "#99DBF5"},
  spent: {name: "Gasto", color: "#E76161"},
};
const ItemReports = ({ item, showDetail }) => {
  const type = item.type;
  const date = new Date(item.created_at)
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
        backgroundColor: reportType[type].color
      }}
    >
      <View
        style={{ flex: 1, rowGap: 1, flexDirection: "row", flexWrap: "wrap" }}
      >
        <View style={{ width: "70%" }}>
          <Text>{reportType[type].name} - $ {useParse().parseNum({ num: item.amount })}</Text>
          <Text>
            {date.toLocaleString()}
          </Text>
        </View>
        <HStack spacing={15} center style={{ width: "30%" }}>
          <MaterialIcons
            name="list"
            onPress={() => {
              showDetail(true, item.id);
            }}
            size={24}
            color="black"
          />
        </HStack>
      </View>
    </Surface>
  );
};

export default ItemReports;
