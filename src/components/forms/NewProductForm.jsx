import { Text, Button } from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { HStack, TextInput, VStack } from "@react-native-material/core";
import { useProducts } from "../../services/Products";

const NewProductForm = ({ toggleModal }) => {
  const { createProduct } = useProducts();
  const {
    control,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful, errors },
  } = useForm({
    defaultValues: {
      name: "",
      codigo: "",
      stock: "",
      buy: "",
      sell: "",
    },
  });
  const onSubmit = async (data) => {
    const res = await createProduct(data);
    if (res.data) {
      toggleModal(res.data);
    }
  };

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ something: "" });
    }
  }, [formState, reset]);
  return (
    <>
      <VStack spacing={5}>
        <Text style={{ marginBottom: 15, textAlign: "center" }}>
          Agregar Producto!
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{ marginBottom: 5 }}
              label="Nombre"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              variant="standard"
            />
          )}
          name="name"
        />
        {errors.name && <Text>This is required.</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{ marginBottom: 5 }}
              label="Codigo"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              variant="standard"
            />
          )}
          name="codigo"
        />
        {errors.codigo && <Text>This is required.</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{ marginBottom: 5 }}
              label="Cantidad"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              variant="standard"
            />
          )}
          name="stock"
        />
        {errors.stock && <Text>This is required.</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{ marginBottom: 5 }}
              label="Precio de compra"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              variant="standard"
            />
          )}
          name="buy"
        />
        {errors.buy && <Text>This is required.</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{ marginBottom: 5 }}
              label="Precio de venta"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              variant="standard"
            />
          )}
          name="sell"
        />
        {errors.sell && <Text>This is required.</Text>}
      </VStack>

      <HStack m={5} style={{ justifyContent: "space-between" }}>
        <Button title="Guardar" onPress={handleSubmit(onSubmit)} />
        <Button
          title="Cerrar"
          color={"#fa5035"}
          onPress={() => {
            toggleModal();
          }}
        />
      </HStack>
    </>
  );
};

export default NewProductForm;
