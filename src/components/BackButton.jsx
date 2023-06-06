import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppBar } from "@react-native-material/core";

export default function BackButton({ goBack, title }) {
  return (
    <AppBar
      title={title}
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

