// Libraries
import { useMutation, useQueryClient } from "react-query";

// services
import { deleteProduct } from "apps/services/apis/product.api";
import { toast } from "react-toastify";
import { QUERIES_KEYS } from "apps/constants/queries";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id) => deleteProduct(id),
    onMutate: (data) => {},
    onSuccess: (data) => {
      queryClient.invalidateQueries([
        QUERIES_KEYS.GET_PRODUCTS_BY_SHOPID,
        data.shop,
      ]);
      toast.success("Xóa dữ liệu thành công");
    },
    onError: () => {
      toast.error("Lỗi !!!");
    },
  });

  return {
    mutationDelete: mutation,
    isLoadingDelete: mutation.isLoading,
  };
};
