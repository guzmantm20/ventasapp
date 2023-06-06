import { Modal, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import EditProductForm from "../forms/EditProductForm";

const EditProductModal = ({ modalVisible, toggleModal, data }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <TouchableOpacity
        onPress={() => {
          toggleModal();
        }}
        style={styles.centeredView}
      >
        <TouchableOpacity style={styles.modalView}>
          <EditProductForm toggleModal={toggleModal} item={data} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    backgroundColor: "#141112",
    borderRadius: 25,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default EditProductModal;
