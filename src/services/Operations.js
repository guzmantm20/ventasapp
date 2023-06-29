import { supabase } from "../lib/supabase";

export const useOperations = () => {
  const sellCart = async ({ total, payData }) => {
    try {
      const dataUser = await supabase.auth.getUser();
      const userId = dataUser.data.user.id;
      const { error, data } = await supabase
        .from("reports")
        .insert({
          type: 'sell',
          amount: total,
          user_id: userId,
        })
        .select();
      if (error) return { error };
      const reportId = data[0].id

      await Promise.all(
        payData.map(async (info) => {
          await supabase
            .from("dataReports")
            .insert({
              report_id: reportId,
              user_id: userId,
              product: info.name,
              amount: info.sellPrice,
              stock: info.stock
            })
            .select();
        })
      );
      return { data };
    } catch (error) {
      throw new Error("Error al obtener los productos!");
    }
  };

  const buy = async () => {};

  const spent = async () => {};

  return { sellCart, buy, spent };
};
