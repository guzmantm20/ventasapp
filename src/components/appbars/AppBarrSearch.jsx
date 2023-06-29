import React, { useState } from "react";
import {
  AppBar,
  HStack,
  Stack,
  IconButton,
  TextInput,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const AppBarrSearch = ({ title, addModal, handleSearch = () => {} }) => {
  const navigation = useNavigation();
  
  const [showSearch, setshowSearch] = useState(false);
  const [search, setSearch] = useState();

  const setDataSearch = (data) => {
    setSearch(data);
    handleSearch(data);
  };
  return (
    <AppBar
      title={title}
      centerTitle={true}
      children={
        showSearch && (
          <Stack p={5}>
            <TextInput
              autoFocus
              value={search}
              onChangeText={setDataSearch}
              label="Nombre o Codigo"
              variant="standard"
            />
          </Stack>
        )
      }
      leading={(props) => (
        <IconButton
          onPress={() => {
            navigation.navigate('Cart')
          }}
          icon={(props) => <MaterialIcons {...props} name="shopping-cart" />}
          {...props}
        />
      )}
      trailing={(props) => (
        <HStack>
          <IconButton
            icon={(props) => (
              <Icon
                name={!showSearch ? "magnify" : "close"}
                onPress={() => {
                  setshowSearch(!showSearch);
                  setSearch("");
                  handleSearch("");
                }}
                {...props}
              />
            )}
            {...props}
          />
          <IconButton
            onPress={() => {
              addModal();
            }}
            icon={(props) => <Icon name="plus" {...props} />}
            {...props}
          />
        </HStack>
      )}
    />
  );
};

export default AppBarrSearch;
