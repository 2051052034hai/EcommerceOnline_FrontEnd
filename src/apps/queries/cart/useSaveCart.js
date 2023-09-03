// Libraries
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { handleAddOrder } from "apps/services/apis/cart.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clear_cart } from "store/cartSlice/cartSlice";

export const useSaveCart = (order) => {
  //navigate
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //dispatch

  const mutation = useMutation({
    mutationFn: async (order) => handleAddOrder(order),
    onSuccess: (data) => {
      toast.success("Bạn đã đặt hàng thành công !!");
      dispatch(clear_cart());
      navigate("/");
    },
  });

  return {
    mutation,
  };
};
