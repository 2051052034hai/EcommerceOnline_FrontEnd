// Libraries
import { Route, Routes, useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import { useSelector } from "react-redux";

// Routes
import { routes } from "./routes";
import { selectCurrentUser } from "store/userSlice/userSelector";

// Constants
import { ROUTER, ROLE } from "apps/constants";

export const Root = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  return (
    <Routes>
      {routes?.map((route) => {
        if (route.path === ROUTER.PURCHASEHISTORY.path && !currentUser) {
          return null;
        }
        if (
          route.path === ROUTER.SELLERSPAGE.path &&
          currentUser?.role !== ROLE.SELLER
        ) {
          return null;
        }

        return (
          <Route
            key={route?.key}
            path={route?.path}
            Component={route?.component}
          />
        );
      })}
      <Route
        path="*"
        element={
          <Result
            status="404"
            title="404"
            subTitle="Không tìm thấy trang"
            extra={
              <Button type="primary" onClick={() => navigate("/")}>
                Quay về trang chủ
              </Button>
            }
          />
        }
      />
    </Routes>
  );
};
