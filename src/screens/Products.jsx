import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import AppBarrSearch from "../components/AppBarrSearch";
import NewProductModal from "../components/modals/NewProductModal";
import { useProducts } from "../services/Products";
import Snack from "../components/Snack";
import ItemList from "../components/ItemList";
import ConfirmDialog from "../components/ConfirmDialog";
import EditProductModal from "../components/modals/EditProductModal";
import CartConfirm from "../components/forms/CartConfirm";

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [produtcs, setProdutcs] = useState();
  const [filterProducts, setFilterProducts] = useState();
  const [snackMessage, setSnackMessage] = useState({});
  const [snackVisibility, setsnackVisibility] = useState(false);
  const [showConfirmDialog, setshowConfirmDialog] = useState(false);
  const [showConfirmCart, setshowConfirmCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { getAllProducts, deleteProdutc } = useProducts();
  const toggleConfirm = async (item) => {
    if (typeof item == "boolean") {
      if (item) {
        await deleteProdutc({ itemId: selectedProduct.id });
        const newDataProducts = filterProducts.filter(
          (obj) => obj.id !== selectedProduct.id
        );
        setFilterProducts(newDataProducts);
        showSnack("Producto eliminado exitosamente ✔");
      }
      setshowConfirmDialog(false);
    } else {
      setSelectedProduct(item);
      setshowConfirmDialog(true);
    }
  };

  const toggleConfirmCart = (item) => {
    if (typeof item == "boolean") {
      if(item === true){
        showSnack("Producto agregado al carrito ✔");
      }
      setshowConfirmCart(false);
    } else {
      setSelectedProduct(item);
      setshowConfirmCart(true);
    }
  };

  const toogleEdit = (item, edit = false) => {
    if (item !== undefined) {
      if (edit == true) {
        const newDataProducts = filterProducts.filter(
          (obj) => obj.id !== selectedProduct.id
        );
        newDataProducts.push(item[0]);
        setFilterProducts(newDataProducts);
        showSnack("Producto editado exitosamente ✔");
      }
      setSelectedProduct(item);
    }
    setShowEditModal(!showEditModal);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const allProducts = await getAllProducts();

        setProdutcs(allProducts.data);
        setFilterProducts(allProducts.data);
      } catch (error) {
        throw new Error("Error al obtener los productos!");
      }
    };

    getProducts();
  }, []);

  const toggleModal = (refres) => {
    if (refres) {
      filterProducts.push(refres[0]);
      showSnack("Producto agregado exitosamente ✔");
    }
    setShowModal(!showModal);
  };

  const searchFilterProducts = (data) => {
    if (data) {
      const newData = produtcs.filter((item) => {
        const itemDataName = item.name
          ? item.name.toUpperCase()
          : "".toUpperCase();

        const itemDataCod = item.cod;
        const textData = data.toUpperCase();
        return (
          itemDataName.indexOf(textData) > -1 ||
          itemDataCod.indexOf(textData) > -1
        );
      });
      setFilterProducts(newData);
    } else {
      setFilterProducts(produtcs);
    }
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
      <AppBarrSearch
        addModal={toggleModal}
        title={"Productos"}
        handleSearch={searchFilterProducts}
      />
      {filterProducts && (
        <FlatList
          data={filterProducts}
          numColumns={1}
          extraData={filterProducts}
          renderItem={({ item }) => (
            <ItemList
              item={item}
              toggleConfirm={toggleConfirm}
              toggleConfirmCart={toggleConfirmCart}
              toogleEdit={toogleEdit}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 55 }}
        />
      )}
      {snackVisibility && <Snack {...snackMessage} />}
      <NewProductModal toggleModal={toggleModal} modalVisible={showModal} />

      {showEditModal && (
        <EditProductModal
          toggleModal={toogleEdit}
          modalVisible={showEditModal}
          data={selectedProduct}
        />
      )}
      {showConfirmDialog && (
        <ConfirmDialog
          title={"Eliminar Producto"}
          text={`Desea eliminar el siguiente producto: ${selectedProduct.name}`}
          visible={showConfirmDialog}
          toggleConfirm={toggleConfirm}
        />
      )}
      {showConfirmCart && (
        <CartConfirm
          title={"Agregar al carrito"}
          product={selectedProduct}
          visible={showConfirmCart}
          toggleConfirm={toggleConfirmCart}
        />
      )}
    </Background>
  );
};

export default Products;
