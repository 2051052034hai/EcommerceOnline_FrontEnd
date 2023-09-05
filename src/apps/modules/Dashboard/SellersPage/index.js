import React, { useState } from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import { Col, Row, Menu } from "antd";

import { getItem } from "apps/services/utils/sellersPage";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";

const SellersPage = () => {
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const [selectedKeys, setSelectedKeys] = useState("1");

  const items = [
    getItem("Quản Lý Sản Phẩm", "sub1", <AppstoreOutlined />, [
      getItem("Tất Cả Sản Phẩm", "1"),
      getItem("Thêm Sản Phẩm", "2"),
    
    ]),
    getItem("Quản Lý Đơn Hàng", "sub2", <AppstoreOutlined />, [
        getItem("Tất Cả ", "5"),
        getItem("Đơn Huỷ", "6"),
        getItem("Trả Hàng/Hoàn Tiền", "7"),
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
        return (
            <ProductList />
        )
      case "2":
        return <AddProduct />
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
            boxShadow: "1px 2px 1px #ccc",
          }}
          items={items}
          onClick={handleOnclick}
        />
      </Col>
      <Col lg={19}>
            {renderPage(selectedKeys)}
      </Col>
    </Row>
  );
};

export default SellersPage;
