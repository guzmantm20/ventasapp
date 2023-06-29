import React, { useEffect, useState } from "react";
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
} from "@react-native-material/core";
import { FlatList } from "react-native";
import { useParse } from "../hooks/useParse";
import { StyleSheet } from "react-native";
import { useReports } from "../services/Reports";
let totalAmount = 0;

const ReportDetail = ({ toggleVisibility, visible, reportId }) => {
  const { getReportData } = useReports();
  const [dataReport, setDataReport] = useState();
  useEffect(() => {
    const setData = async () => {
      const detailData = await getReportData({ reportId });
      totalAmount = 0
      detailData.data.forEach((data) => {
        totalAmount += (data.amount * data.stock);
      });
      setDataReport(detailData.data);
    };
    setData();
  }, [reportId]);

  return (
    <Provider>
      <Dialog visible={visible} onDismiss={() => toggleVisibility(false)}>
        <DialogHeader title={"Lista de venta"} />
        <DialogContent>
          <Stack direction="column" spacing={10}>
            <FlatList
              data={dataReport}
              extraData={dataReport}
              renderItem={({ item }) => (
                <Stack direction="row">
                  <Text style={styles.textList}>
                    {item.stock} {item.product}
                  </Text>
                  <Text>
                    ${" "}
                    {useParse().parseNum({ num: item.amount * item.stock })}
                  </Text>
                </Stack>
              )}
            />
            <Divider color="#6200ee" />
            <Stack direction="row">
              <Text style={styles.textList}>Total</Text>
              <Text>$ {useParse().parseNum({ num: totalAmount })}</Text>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            title="Cerrar"
            compact
            variant="text"
            onPress={() => toggleVisibility(false)}
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

export default ReportDetail;
