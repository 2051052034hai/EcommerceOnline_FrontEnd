// Libraries
import { useMutation } from "react-query";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

// services
import { handleLoginUser } from "apps/services/apis/auth.api";

import { save_user } from "store/userSlice/userSlice";

export const useLoginUser = () => {
  //navigate
  const navigate = useNavigate();
  //dispatch
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: async (user) => handleLoginUser(user),
    onSuccess: (data) => {
      if (data.status !== "ERR") {
        toast.success("Đăng nhập thành công");
        const { access_token, refresh_token, ...other } = data;

        cookie.save("access-token", access_token);
        cookie.save("refresh_token", refresh_token);

        dispatch(save_user(other));

        navigate("/");
      } else {
        toast.error("Đăng nhập thất bại");
      }
    },
  });

  return {
    mutation,
    isLoading: mutation.isLoading,
  };
};
