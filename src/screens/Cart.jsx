import React, { useState } from "react";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import useCartStore from "../store/useCartStore";
import ItemListCart from "../components/ItemListCart";
import { FlatList } from "react-native";
import Snack from "../components/Snack";
const Cart = () => {
  const cartStore = useCartStore((state) => state.products);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const [snackVisibility, setsnackVisibility] = useState(false);
  const [snackMessage, setSnackMessage] = useState({});
  const navigation = useNavigation();
  const toggleDelete = (item) => {
    removeFromCart(item);
    showSnack("Producto eliminado del carrito");
  };

  const showSnack = (message, color) => {
    setSnackMessage({ message, color });
    setsnackVisibility(!snackVisibility);
    setTimeout(() => {
      setsnackVisibility(false); // count is 0 here
    }, 3000);
  };
  return (
    <Background>
      <BackButton goBack={navigation.goBack} title={"Carrito"} cartShow={true} />
      {snackVisibility && <Snack {...snackMessage} />}
      {cartStore && (
        <FlatList
          data={cartStore}
          numColumns={1}
          extraData={cartStore}
          renderItem={({ item }) => (
            <ItemListCart item={item} toggleDelete={toggleDelete} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 55 }}
        />
      )}
    </Background>
  );
};

export default Cart;
