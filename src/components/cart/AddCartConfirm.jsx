import React, { useState } from "react";
import {
  Provider,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Text,
  VStack,
  TextInput,
} from "@react-native-material/core";
import useCartStore from "../../store/useCartStore";

const AddCartConfirm = ({ product, toggleConfirm, visible }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [cartStock, setCartStock] = useState();
  const handledConfirm = () => {
    addToCart({id: product.id, name: product.name, sellPrice: product.sellPrice, stock: cartStock})
    toggleConfirm(true)
  }
  return (
    <Provider>
      <Dialog visible={visible} onDismiss={() => toggleConfirm(false)}>
        <DialogHeader title={"Agregar al carrito"} />
        <DialogContent>
          <VStack spacing={10}>
            <Text>Producto: {product.name}</Text>
            <TextInput
              label="Cantidad"
              value={cartStock}
              onChangeText={setCartStock}
              variant="standard"
              keyboardType="numeric"
            />
          </VStack>
        </DialogContent>
        <DialogActions>
          <Button
            title="Cancel"
            compact
            variant="text"
            onPress={() => toggleConfirm(false)}
          />
          <Button
            title="Ok"
            compact
            variant="text"
            onPress={() => handledConfirm()}
          />
        </DialogActions>
      </Dialog>
    </Provider>
  );
};

export default AddCartConfirm;
