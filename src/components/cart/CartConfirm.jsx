import React, { useState } from "react";
import {
  Provider,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Text,
  Stack,
  Divider,
  TextInput,
} from "@react-native-material/core";
import { FlatList } from "react-native";
import useCartStore from "../../store/useCartStore";
import { useParse } from "../../hooks/useParse";
import { StyleSheet } from "react-native";
import { useOperations } from "../../services/Operations";
const CartConfirm = ({ toggleConfirm, visible }) => {
  const products = useCartStore((state) => state.products);
  const total = useCartStore((state) => state.totalSell);
  const [efectivoRecibido, setEfectivoRecibido] = useState('')
  const [efectivoDevuelto, setEfectivoDevuelto] = useState('')
  const { sellCart } = useOperations()

  const handledChange = (value) => {
    setEfectivoRecibido(value)
    const devolver = value - total
    setEfectivoDevuelto(devolver+'')
  }

  const handledConfirm = () => {
    toggleConfirm(true)
    sellCart({total, payData: products})
  }

  return (
    <Provider>
      <Dialog visible={visible} onDismiss={() => toggleConfirm(false)}>
        <DialogHeader title={"Realizar Compra"} />
        <DialogContent>
          <Stack direction="column" spacing={10}>
            <FlatList
              data={products}
              renderItem={({ item }) => (
                <Stack direction="row">
                  <Text style={styles.textList}>
                    {item.stock} {item.name}
                  </Text>
                  <Text>
                    ${" "}
                    {useParse().parseNum({ num: item.sellPrice * item.stock })}
                  </Text>
                </Stack>
              )}
            />
            <Divider color="#6200ee" />
            <Stack direction="row">
              <Text style={styles.textList}>Total</Text>
              <Text>$ {useParse().parseNum({ num: total })}</Text>
            </Stack>
            <Stack direction="row" spacing={5}>
              <TextInput
                label="Recibido"
                keyboardType="numeric"
                variant="standard"
                style={{ width: "60%" }}
                value={efectivoRecibido}
                onChangeText={handledChange}
              />
              <TextInput
                editable={false}
                label="Devolver"
                keyboardType="numeric"
                variant="standard"
                style={{ width: "40%" }}
                value={efectivoDevuelto}
              />
            </Stack>
          </Stack>
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

const styles = StyleSheet.create({
  textList: {
    flex: 1,
    textAlign: "justify",
  },
});

export default CartConfirm;
