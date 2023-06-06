import React, { useState } from "react";
import { Alert } from "react-native";
import {
  Button,
  IconButton,
  Stack,
  TextInput,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import Background from "../../components/Background";
import BackButton from "../../components/BackButton";
import { supabase } from "../../lib/supabase";

const Register = () => {
  const navigation = useNavigation();
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUpWithEmail() {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) Alert.alert(error.message);
  }
  return (
    <Background>
      <BackButton goBack={navigation.goBack} title={"Registro"} />
      <Stack spacing={5} style={{ margin: 16 }}>
        <TextInput
          label="Usuario"
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
        <Button onPress={() => signUpWithEmail()} title="Registrarse" />
      </Stack>
    </Background>
  );
};

export default Register;
