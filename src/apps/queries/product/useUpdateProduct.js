// Libraries
import { useMutation, useQueryClient } from "react-query";

// services
import { updateProduct } from "apps/services/apis/product.api";
import { toast } from "react-toastify";

export const useUpdateProduct = () => {
  const mutation = useMutation({
    mutationFn: async (product) => updateProduct(product),
    onSuccess: (data) => {
      toast.success("Cập nhật dữ liệu thành công");
    },
    onError: () => {
      toast.error("Lỗi !!!");
    },
  });

  return {
    mutation,
    isLoading: mutation.isLoading,
  };
};
