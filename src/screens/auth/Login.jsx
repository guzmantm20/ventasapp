import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import Background from "../../components/Background";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  HStack,
  IconButton,
  Pressable,
  Stack,
  TextInput,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";

const Login = () => {
  const navigation = useNavigation();
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) Alert.alert(error.message)
  }

  return (
    <Background>
      <Stack spacing={10} style={styles.container}>
        <HStack style={{ justifyContent: "center" }} m={4} spacing={10}>
          <FontAwesome name="twitter" size={24} color="black" />
          <FontAwesome name="facebook" size={24} color="black" />
          <FontAwesome name="google" size={24} color="black" />
        </HStack>
        <TextInput
          label="Correo"
          variant="standard"
          value={email}
          onChange={(e) => {
            setEmail(e.nativeEvent.text);
          }}
          trailing={(props) => <Icon name="account" {...props} />}
        />
        <TextInput
          label="Contraseña"
          secureTextEntry={hidePass}
          variant="standard"
          value={password}
          onChange={(e) => {
            setPassword(e.nativeEvent.text);
          }}
          trailing={(props) => (
            <IconButton
              icon={(props) => (
                <Icon
                  name="eye"
                  onPress={() => {
                    setHidePass(!hidePass);
                  }}
                  {...props}
                />
              )}
              {...props}
            />
          )}
        />
        <Button onPress={() => signInWithEmail()} title="Ingresar" />
        <Button
          onPress={() => {
            navigation.navigate("Register");
          }}
          title="Registrarse"
        />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text>¿Olvido su contraseña?</Text>
          <Pressable
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text style={{ color: "#6200ee" }}> Click Aqui</Text>
          </Pressable>
        </View>
      </Stack>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    justifyContent: "center"
  },
});

export default Login;
