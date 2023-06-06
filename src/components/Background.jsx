import { View, KeyboardAvoidingView, StyleSheet } from "react-native";
import React from "react";
import Constants from 'expo-constants';
import NavigationMenu from "./NavigationMenu";

const Background = ({ children }) => {
  return (
    <View style={styles.background}>
      <KeyboardAvoidingView style={styles.container}>
        {children}
      </KeyboardAvoidingView>
      <NavigationMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: "#151718",
    marginTop: Constants.statusBarHeight
  },
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
  },
});

export default Background;
