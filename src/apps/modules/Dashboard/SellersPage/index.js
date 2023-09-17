import React, { useState } from "react";
import {
  AppstoreOutlined,
  AreaChartOutlined,
  BorderInnerOutlined,
} from "@ant-design/icons";
import { Col, Row, Menu } from "antd";

import { getItem } from "apps/services/utils/sellersPage";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import OrderList from "./OrderList";
import StatisticsPage from "./Statistics";

const SellersPage = () => {
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const [selectedKeys, setSelectedKeys] = useState("1");

  const items = [
    getItem("Quản Lý Sản Phẩm", "sub1", <AppstoreOutlined />, [
      getItem("Tất Cả Sản Phẩm", "1"),
      getItem("Thêm Sản Phẩm", "2"),
    ]),
    getItem("Quản Lý Đơn Hàng", "sub2", <BorderInnerOutlined />, [
      getItem("Tất Cả ", "5"),
      getItem("Đơn Huỷ", "6"),
      getItem("Trả Hàng/Hoàn Tiền", "7"),
    ]),
    getItem("Dữ Liệu", "sub3", <AreaChartOutlined />, [
      getItem("Phân Tích Bán Hàng ", "8"),
    ]),
  ];

  const rootSubmenuKeys = ["sub1", "sub2"];
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleOnclick = ({ key }) => {
    setSelectedKeys(key);
  };

  const renderPage = (key) => {
    switch (key) {
      case "1":
        return <ProductList />;
      case "2":
        return <AddProduct />;

      case "5":
        return <OrderList />;

      case "8":
        return <StatisticsPage />;
    }
  };

  return (
    <Row>
      <Col lg={5}>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          defaultOpenKeys={["sub1", "sub2"]}
          style={{
            width: 256,
            height: "100vh",
          }}
          items={items}
          onClick={handleOnclick}
        />
      </Col>
      <Col lg={19}>{renderPage(selectedKeys)}</Col>
    </Row>
  );
};

export default SellersPage;
