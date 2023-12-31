import React, { useState } from "react";
import Background from "../components/Background";
import BackButton from "../components/appbars/BackButton";
import { useNavigation } from "@react-navigation/native";
import useCartStore from "../store/useCartStore";
import ItemListCart from "../components/ItemListCart";
import { FlatList } from "react-native";
import Snack from "../components/Snack";
import { useEffect } from "react/cjs/react.development";
import CartConfirm from "../components/cart/CartConfirm";
const Cart = () => {
  const cartStore = useCartStore((state) => state.products);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const payCart = useCartStore((state) => state.pay);
  const setPay = useCartStore((state) => state.setPay);
  const clearCart = useCartStore((state) => state.clearCart);
  const [snackVisibility, setsnackVisibility] = useState(false);
  const [snackMessage, setSnackMessage] = useState({});
  const [showCartConfirm, setShowCartConfirm] = useState(payCart);
  const navigation = useNavigation();
  const toggleDelete = (item) => {
    removeFromCart(item);
    showSnack("Producto eliminado del carrito");
  };

  useEffect(() => {
    setShowCartConfirm(payCart);
  }, [payCart]);

  const toggleConfirm = (item) => {
    if (item === false) {
      setPay();
      return;
    }
    showSnack("Compra realizada ✔");
    clearCart();
    setPay();
    setShowCartConfirm(false)
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
      <BackButton
        goBack={navigation.goBack}
        title={"Carrito"}
        cartShow={true}
      />
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

      {snackVisibility && <Snack {...snackMessage} />}
      {showCartConfirm && (
        <CartConfirm toggleConfirm={toggleConfirm} visible={showCartConfirm} />
      )}
    </Background>
  );
};

export default Cart;
