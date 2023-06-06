import React from "react";
import { Snackbar } from "@react-native-material/core";

const Snack = ({ message, color='green' }) => {
  return (
    <Snackbar
      message={message}
      style={{ position: "absolute", backgroundColor: color, start: 16, end: 16, bottom: 16 }}
    />
  );
};

export default Snack;
