import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Stack } from "@react-native-material/core";
import { useParse } from "../hooks/useParse";
import useCartStore from "../store/useCartStore";
const CartChildren = ({ goBack }) => {
  const total = useCartStore((state) => state.totalSell);
  const clearCart = useCartStore((state) => state.clearCart);
  const setPay = useCartStore((state) => state.setPay);
  const handledPay = () => {
    if (total > 0) setPay();
  };
  const handledClear = () => {
    clearCart();
    goBack();
  };
  return (
    <Stack direction="row" style={{ alignItems: "center" }} p={10}>
      <Text style={{ width: "30%" }}>
        Total: $ {useParse().parseNum({ num: total })}
      </Text>
      <Stack
        direction="row"
        style={{ alignItems: "center", justifyContent: "center" }}
        spacing={10}
      >
        <TouchableOpacity
          style={{ width: "35%", alignItems: "center" }}
          onPress={handledPay}
        >
          <FontAwesome name="money" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: "35%", alignItems: "center" }}
          onPress={handledClear}
        >
          <FontAwesome name="trash" size={30} color="black" />
        </TouchableOpacity>
      </Stack>
    </Stack>
  );
};

export default CartChildren;
