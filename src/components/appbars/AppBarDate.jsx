import React, { useState } from "react";
import { AppBar, Stack, Wrap, IconButton } from "@react-native-material/core";
import DateInput from "../DateInput";
import { useParse } from "../../hooks/useParse";
import { Text } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import useReportsStore from "../../store/useReportsStore";
import { useReports } from "../../services/Reports";
const AppBarDate = ({ title }) => {
  const [showSearch, setshowSearch] = useState(false);
  const addReports = useReportsStore((state) => state.addReports);
  const startDate = useReportsStore((state) => state.startDate);
  const endDate = useReportsStore((state) => state.endDate);
  const setStartDate = useReportsStore((state) => state.setStartDate);
  const setEndDate = useReportsStore((state) => state.setEndDate);
  const removeReports = useReportsStore((state) => state.removeReports);
  const totalSell = useReportsStore((state) => state.totalSell);
  const setTotalSell = useReportsStore((state) => state.setTotalSell);

  const { getAllReports } = useReports();
  const handledSearch = async () => {
    setshowSearch(false)
    const newEndDate = new Date(endDate);
    newEndDate.setDate(newEndDate.getDate() + 1);
    const parseEndDate = useParse().parseDate({ date: newEndDate });
    const allReports = await getAllReports({
      startDate: startDate,
      endDate: parseEndDate,
      page: 1,
    });
    removeReports();
    setTotalSell(0);
    let totalAmount = 0;
    allReports.data.forEach((data) => {
      totalAmount += data.amount;
    });
    setTotalSell(totalAmount);
    addReports(allReports.data);
  };
  return (
    <AppBar
      title={title}
      centerTitle={true}
      children={
        <Stack direction="column" p={2}>
          {showSearch && (
            <Wrap>
              <DateInput
                label={"Desde"}
                value={startDate}
                changeDate={setStartDate}
              />
              <DateInput
                label={"Hasta"}
                value={endDate}
                changeDate={setEndDate}
              />
            </Wrap>
          )}
          <Text style={{ padding: 5 }}>
            Venta Total: $ {useParse().parseNum({ num: totalSell })}
          </Text>
        </Stack>
      }
      leading={(props) => <></>}
      trailing={(props) => (
        <Stack direction="row">
          <IconButton
            icon={(props) => (
              <Icon
                name={!showSearch ? "plus" : "close"}
                onPress={() => {
                  setshowSearch(!showSearch);
                }}
                {...props}
              />
            )}
            {...props}
          />
          <IconButton
            icon={(props) => (
              <Icon
                name={"clipboard-text-search-outline"}
                onPress={() => {
                  handledSearch();
                }}
                {...props}
              />
            )}
            {...props}
          />
        </Stack>
      )}
    />
  );
};

export default AppBarDate;
