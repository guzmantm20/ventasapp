import { supabase } from "../lib/supabase";

export const useProducts = () => {

  const getAllProducts = async () => {
    try {
      const dataUser = await supabase.auth.getUser()
      const userId = dataUser.data.user.id;
      const { error, data, status } = await supabase
        .from("products")
        .select()
        .eq("user_id", userId);
      if (error) {
        return { error }
      }
      return { data };
    } catch (error) {
      console.error(error);
    }
  };

  const createProduct = async ({ name, codigo, stock, sell, buy }) => {
    try {
      const dataUser = await supabase.auth.getUser()
      const userId = dataUser.data.user.id;
      const { error, data } = await supabase
        .from("products")
        .insert({
          name,
          stock,
          cod: codigo,
          buyPrice: buy,
          sellPrice: sell,
          user_id: userId,
        })
        .select();
      if (error) return { error };
      return { data };
    } catch (error) {
      console.error(error);
    }
  };

  const editProduct = async ({ name, codigo, stock, sell, buy, id }) => {
    try {
      const dataUser = await supabase.auth.getUser()
      const userId = dataUser.data.user.id;
      const { error, data } = await supabase
        .from("products")
        .update({
          name,
          stock,
          cod: codigo,
          buyPrice: buy,
          sellPrice: sell,
          user_id: userId,
        })
        .eq("user_id", userId)
        .eq("id", id)
        .select();
      if (error) return { error };
      return { data };
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProdutc = async ({ itemId }) => {
    try {
      const dataUser = await supabase.auth.getUser()
      const userId = dataUser.data.user.id;
      const { error, data } = await supabase
        .from("products")
        .delete()
        .eq("user_id", userId)
        .eq("id", itemId);

      if (error) return { error };
      return { data };
    } catch (e) {
      console.log(e);
    }
  };

  return { createProduct, getAllProducts, deleteProdutc, editProduct };
};
