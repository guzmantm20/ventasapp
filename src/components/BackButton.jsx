import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppBar } from "@react-native-material/core";
import CartChildren from "./CartChildren";


export default function BackButton({ goBack, title, cartShow = false }) {
  
  return (
    <AppBar
      title={title}
      children={
        cartShow && (
          <CartChildren goBack={goBack}/>
        )
      }
      centerTitle={true}
      leading={(props) => {
        if (goBack) {
          return (
            <TouchableOpacity onPress={goBack}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          );
        }
      }}
    />
  );
}
