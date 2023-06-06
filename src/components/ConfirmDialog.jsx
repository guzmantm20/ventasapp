import React from "react";
import {
  Provider,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Text,
} from "@react-native-material/core";

const ConfirmDialog = ({title, text, toggleConfirm, visible}) => {
  return (
    <Provider>
      <Dialog visible={visible} onDismiss={() => toggleConfirm(false)}>
        <DialogHeader title={title} />
        <DialogContent>
          <Text>
            {text}
          </Text>
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
            onPress={() => toggleConfirm(true)}
          />
        </DialogActions>
      </Dialog>
    </Provider>
  );
};

export default ConfirmDialog;
