import { FlatList } from "react-native";
import Background from "../components/Background";
import AppBarDate from "../components/appbars/AppBarDate";
import useReportsStore from "../store/useReportsStore";
import { useEffect, useState } from "react";
import ItemReports from "../components/ItemReports";
import { useParse } from "../hooks/useParse";
import { useReports } from "../services/Reports";
import ReportDetail from "../components/ReportDetail";

const Reports = () => {
  const startDate = useReportsStore((state) => state.startDate);
  const endDate = useReportsStore((state) => state.endDate);
  const addReports = useReportsStore((state) => state.addReports);
  const removeReports = useReportsStore((state) => state.removeReports);
  const setTotalSell = useReportsStore((state) => state.setTotalSell);
  const reports = useReportsStore((state) => state.reports);
  const { getAllReports } = useReports();

  
  const [filterList, setFilterList] = useState();
  const [showDetail, setShowDetail] = useState(false)
  const [detailId, setDetailId] = useState()

  const handledShowDetail = (active, reportId) => {
    if(active === true){
      setDetailId(reportId)
    }
    setShowDetail(active)
  }

  useEffect(() => {
    const listFirstItems = async () => {
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

    listFirstItems()
  }, []);

  return (
    <Background>
      <AppBarDate title={"Reportes"} />
      {reports.length > 1 && (
        <FlatList
          data={reports}
          numColumns={1}
          extraData={filterList}
          renderItem={({ item }) => <ItemReports item={item} showDetail={handledShowDetail} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 55 }}
        />
      )}
      <ReportDetail reportId={detailId} toggleVisibility={handledShowDetail} visible={showDetail}/>
    </Background>
  );
};

export default Reports;
