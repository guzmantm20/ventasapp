import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Stack } from "@react-native-material/core";
import { useParse } from "../hooks/useParse";
import useCartStore from "../store/useCartStore";
const CartChildren = ({goBack}) => {
  const total = useCartStore((state) => state.totalSell);
  const handledPay = () => {
    goBack()
  }
  return (
    <Stack direction="row" style={{ alignItems: "center" }} p={10}>
      <Text style={{ width: "30%" }}>
        Total: $ {useParse().parseNum({ num: total })}
      </Text>
      <TouchableOpacity
        style={{ width: "70%", alignItems: "center" }}
        onPress={handledPay}
      >
        <Stack direction="row" style={{ alignItems: "center" }} spacing={10}>
          <Text>Pagar</Text>
          <FontAwesome name="money" size={30} color="black" />
        </Stack>
      </TouchableOpacity>
    </Stack>
  );
};

export default CartChildren;
