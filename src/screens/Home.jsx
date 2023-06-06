import { Button, Text } from "react-native";
import React from "react";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import { supabase } from "../lib/supabase";

const Home = () => {
  const logout = async () => {
    await supabase.auth.signOut();
  }
  return (
    <Background>
      <BackButton title={"Inicio"} />
      <Text>Home</Text>
      <Button
        title="Logout"
        onPress={() => logout()}
      />
    </Background>
  );
};

export default Home;
