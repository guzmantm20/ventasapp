import { supabase } from "../lib/supabase";
const limit = 10;
export const useReports = () => {
  const getAllReports = async ({ startDate, endDate, page }) => {
    try {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit - 1;
      const dataUser = await supabase.auth.getUser();
      const userId = dataUser.data.user.id;
      const { error, data } = await supabase
        .from("reports")
        .select()
        .eq("user_id", userId)
        .gte("created_at", startDate)
        .lte("created_at", endDate)
        .range(startIndex, endIndex)
        .order("id", { ascending: false });
      if (error) {
        return { error };
      }
      return { data };
    } catch (e) {
      throw new Error("Error al obtener los productos!");
    }
  };

  const getReportData = async ({ reportId }) => {
    try {
      const dataUser = await supabase.auth.getUser();
      const userId = dataUser.data.user.id;

      const { error, data } = await supabase
      .from("dataReports")
      .select()
      .eq("user_id", userId)
      .eq("report_id", reportId)

      return { data }

    } catch (e) {
      throw new Error("Error al obtener la data!");
    }
  };

  return { getAllReports, getReportData };
};
