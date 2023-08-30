//Libralies
import { Col, Divider, Row } from "antd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";

//Compoments
import { useGetProductBySubId } from "apps/queries/subcategory";
import CardItem from "apps/components/molecules/CardItem";

//Fortawesome
import { faFilter, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Drawer
import { Drawer } from "antd";

//CSS from productCategory.css
import "./productCategory.css";

//CSS from styled.js
import { customItems, customStyle } from "./styled";
import {
  filterSelectAll,
  sortByPrice,
} from "apps/services/utils/filterProductsSub";

const ProductCategory = () => {
  const [open, setOpen] = useState(false);
  const [selectedTitleId, setSelectedTitleId] = useState("0");
  const [productsSub, setProductsSub] = useState([]);
  const [defaultProducts, setDefaultProducts] = useState([]);

  const { id } = useParams();
  const { data, isLoading } = useGetProductBySubId(id);

  const copyData = [...defaultProducts];

  useEffect(() => {
    if (data) {
      setDefaultProducts(data);
    }
  }, [isLoading]);

  useEffect(() => {
    setProductsSub(defaultProducts);
  }, [defaultProducts]);

  const showDrawer = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleFilterAll = (keyId, typeSoft) => {
    setSelectedTitleId(keyId);
    if (keyId === "0") {
      setProductsSub(defaultProducts);
    } else {
      let new_data = filterSelectAll(copyData, typeSoft);
      setProductsSub(new_data);
    }
  };

  const softPrice = (a, b) => {
    return () => {
      let new_data = sortByPrice(a, b, productsSub);

      setProductsSub(new_data);
    };
  };

  const getItem = (label, key, icon, children, style, onClick) => {
    return {
      key,
      icon,
      children,
      label,
      style,
      onClick,
    };
  };

  const menuLeftSlice = [
    getItem(
      "Khoảng giá",
      "sub1",
      <AppstoreOutlined />,
      [
        getItem(
          "Từ 100 - 300k",
          "3",
          null,
          null,
          customItems,
          softPrice(100000, 150000)
        ),
        getItem("Từ 300 - 700k", "4", null, null, customItems),
        getItem("Từ 700 - 1 triệu", "5", null, null, customItems),
        getItem("Từ 1 triệu - 3 triệu", "6", null, null, customItems),
        getItem("Từ 3 triệu - 7 triệu", "7", null, null, customItems),
      ],
      customStyle
    ),
    getItem(
      "Thương hiệu",
      "sub2",
      <AppstoreOutlined />,
      [
        getItem("Apple", "7", null, null, customItems),
        getItem("Acer", "8", null, null, customItems),
        getItem("ASUS", "9", null, null, customItems),
        getItem("DELL", "10", null, null, customItems),
        getItem("ASUS", "11", null, null, customItems),
        getItem("DELL", "12", null, null, customItems),
      ],
      customStyle
    ),
  ];

  function getSubItemsBySubKey(menuSlice, subKey) {
    const subItem = menuSlice.find((item) => item.key === subKey);
    return subItem ? subItem.children : [];
  }

  const sub1Items = getSubItemsBySubKey(menuLeftSlice, "sub1");
  const sub2Items = getSubItemsBySubKey(menuLeftSlice, "sub2");

  const itemSlice = [
    {
      label: "Mặc định",
      key: "0",
      value: "default",
    },
    {
      label: "Bán chạy",
      key: "1",
      value: "selling",
    },
    {
      label: "Khuyến mãi tốt",
      key: "2",
      value: "promotion",
    },
    {
      label: "Giá giảm dần",
      key: "3",
      value: "decrease",
    },
    {
      label: "Giá tăng dần",
      key: "4",
      value: "ascending",
    },
  ];

  const newItemSlice = itemSlice?.map((item, index) => {
    const isSelected = selectedTitleId === item.key;

    return {
      label: (
        <div
          key={index}
          className={`${
            isSelected ? "text-purple-900" : "text-black"
          } border-b-2 border-gray-100 py-3 font-medium`}
          onClick={() => handleFilterAll(item.key)}
          data-key={item.key} // Lưu trữ key trong thuộc tính data-key
        >
          <p>{item.label}</p>
        </div>
      ),
      key: item.key,
    };
  });

  return (
    <>
      <div className="bg-slate-100">
        {/* Thanh trượt top */}
        <Row className="lg:hidden lg:bg-black">
          <Drawer
            placement="top"
            closable={false}
            onClose={onClose}
            open={open}
            key="top"
            className="lg:hidden lg:bg-black"
          >
            <Row className="py-2.5 w-full ">
              <Divider style={{ fontSize: "20px" }} orientation="left">
                Theo giá
              </Divider>

              <Row gutter={[16, 16]}>
                {sub1Items?.map((item, index) => {
                  return (
                    <Col sm={8} onClick={item.onClick}>
                      <div key={index}>
                        <span className="px-1 py-1 border border-solid border-gray-300 rounded ">
                          {item.label}
                        </span>
                      </div>
                    </Col>
                  );
                })}

                <Divider style={{ fontSize: "20px" }} orientation="left">
                  Thương hiệu
                </Divider>

                <Row gutter={[4, 32]}>
                  {sub2Items?.map((item, index) => {
                    return (
                      <Col span={12} className="text-center">
                        <div key={index}>
                          <span className="px-1 py-1 border border-solid border-indigo-600 px-3 rounded">
                            {item.label}
                          </span>
                        </div>
                      </Col>
                    );
                  })}
                </Row>

                <Row className="mt-32 w-full">
                  <Col className="text-center p-1" onClose="false" span={12}>
                    <div className="border-indigo-600 border-2 border-solid bg-indigo-600 text-white py-2.5 rounded font-semibold text-base">
                      <span>Xoá bộ lọc</span>
                    </div>
                  </Col>

                  <Col span={12} onClick={onClose} className="text-center p-1">
                    <div className="border-indigo-600 border-2 border-solid text-blue-500 py-2.5 rounded font-semibold text-base">
                      <span>Đóng</span>
                    </div>
                  </Col>
                </Row>
              </Row>
            </Row>
          </Drawer>
        </Row>

        {/* Phần thanh trượt hiển thị mặc định*/}

        <Dropdown
          menu={{
            items: newItemSlice,
          }}
          trigger={["click"]}
        >
          <Row className="bg-white lg:hidden">
            <Row className="mx-4 py-2.5 w-full">
              <Col lg={0} md={24} xs={19}>
                <span
                  className="text-red-600 text-base font-medium"
                  onClick={(e) => e.preventDefault()}
                >
                  Mặc định
                </span>
                <span
                  onClick={(e) => e.preventDefault()}
                  className="text-red-600 text-base font-medium"
                >
                  <FontAwesomeIcon
                    className="text-xl mb-0.5 ml-1"
                    icon={faSortDown}
                  />
                </span>
              </Col>

              <Col lg={0} md={0} xs={5} className="ml-auto">
                <span
                  className="text-red-600 text-base font-medium"
                  onClick={(e) => showDrawer(e)}
                >
                  Bộ lọc
                </span>
                <span
                  // onClick={showDrawer}
                  className="text-red-600 text-base font-medium"
                >
                  <FontAwesomeIcon
                    className="text-sm mb-0 ml-1"
                    icon={faFilter}
                  />
                </span>
              </Col>
            </Row>
          </Row>
        </Dropdown>
        {/*/////////////////////////////////////////*/}

        {/* Phần hiển thị body của trang web */}
        <Row className="lg:mx-20 lg:py-8 sm:mx-2 sm:py-1 mx-2 ">
          <Col xs={0} sm={10} md={8} lg={6}>
            <Menu
              className="lg:w-64 md:w-60 sm:w-48 w-24"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1", "sub2"]}
              mode="inline"
              theme="light"
              items={menuLeftSlice}
            />
          </Col>

          <Col xs={24} sm={14} md={16} lg={18}>
            <Row gutter={[18, 16]}>
              <Col className="gutter-row text-center" lg={4} xs={0}>
                <div className="font-medium py-2.5 pr-px text-black lg:text-base rounded-lg ">
                  Sắp xếp theo:{" "}
                </div>
              </Col>
              {itemSlice?.map((item, index) => (
                <Col
                  key={index}
                  className="gutter-row font-normal px-0 text-center"
                  lg={4}
                  xs={0}
                  onClick={() => handleFilterAll(item.key, item.value)}
                >
                  <div
                    className={`text-${
                      selectedTitleId === item.key ? "white" : "black"
                    } 
                    ${
                      selectedTitleId === item.key
                        ? "bg-indigo-500"
                        : "bg-white"
                    } 
                  rounded-2xl py-2.5 font-medium`}
                  >
                    {item.label}
                  </div>
                </Col>
              ))}
            </Row>
            <Row gutter={[18, 16]}>
              {productsSub?.map((p, index) => {
                return (
                  <Col className="gutter-row" xs={12} sm={12} md={8} lg={6}>
                    <CardItem key={index} product={p} />
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProductCategory;
