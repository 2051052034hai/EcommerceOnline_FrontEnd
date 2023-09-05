//Libaries
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Input,
  Select,
  Space,
  Table,
  Form,
  Button,
  Drawer,
} from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

//UserSlice
import { selectCurrentUser } from "store/userSlice/userSelector";

//Queries
import { useGetProductsByShopId } from "apps/queries/shop";
import { useGetSubCategories } from "apps/queries/subcategory";
import { NumericInput } from "apps/services/utils/sellersPage";

const { Option } = Select;

const ProductList = () => {
  const [pageSize, setPageSize] = useState(5);
  const [productData, setProductData] = useState([]);
  const [total, setTotal] = useState();
  const [page, setPage] = useState(1);
  const [subData, setSubdata] = useState([]);

  //InfoProduct
  const [productId, setProductId] = useState("")
  const [productName, setProductName] = useState("");
  const [productSub, setProductSub] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  

  const currentUser = useSelector(selectCurrentUser);
  const { data: new_data, isLoading } = useGetProductsByShopId(
    currentUser?._id,
    page,
    pageSize
  );
  const { data: subcateData, isLoading: subLoading } = useGetSubCategories();

  useEffect(() => {
    setProductData(new_data?.products);
    setTotal(new_data?.total);
  }, [new_data, isLoading]);

  useEffect(() => {
    setSubdata(subcateData);
  }, [subcateData, subLoading]);

  const columns = [
    {
      title: "",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (link, record) => {
        return (
          <Link to={`/product/${record.id}`}>
            <img className="lg:w-16 w-8 m-auto" alt="not found" src={link} />
          </Link>
        );
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: 400,
      render: (text, record) => (
        <Link to={`/product/${record.id}`} className="font-medium">
          {text}
        </Link>
      ),
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
      render: (text) => (
        <h3 className="font-bold">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(text)}
        </h3>
      ),
    },
    {
      title: "Tồn Kho",
      dataIndex: "stock",
      key: "stock",
      render: (text) => <h3 className="font-bold">{text}</h3>,
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      key: "sold",
      render: (text) => <h3 className="font-bold">{text}</h3>,
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "subCategory",
      key: "subCategory",
      render: (text) => <h3 className="font-bold text-blue-800">{text}</h3>,
    },
    {
      title: "Hành động",
      key: "action",
      render: (record) => {
        let record_Data = {
          id:record.id,
          name: record.name,
          subCategory: record.subCategory,
          stock: record.stock,
          price: record.price,
          description: record.description,
        };

        return (
          <Space size="middle">
            <span>
              <FontAwesomeIcon icon={faTrash} style={{ color: "#e74023" }} />
            </span>
            <span>
              <FontAwesomeIcon
                onClick={showDrawer(record_Data)}
                icon={faPen}
                style={{ color: "#1b61da" }}
              />
            </span>
          </Space>
        );
      },
    },
  ];

  const data = productData?.map((item, index) => {
    return {
      key: String(index + 1),
      thumbnail: item.thumbnail,
      id: item._id,
      name: item.title,
      price: item.price,
      stock: item.stock,
      sold: item.sold,
      subCategory: item.subcategory?.name,
      description: item.description,
    };
  });

  const paginationConfig = {
    pageSize: pageSize,
    total: total,
    showSizeChanger: true,
    position: ["bottomCenter"],
    onChange: (page, pageSize) => {
      setPage(page);
      setPageSize(pageSize);
    },
  };

  //Drawer
  const [open, setOpen] = useState(false);
  const showDrawer = (data) => {
    return () => {
      setProductId(data.id)
      setProductName(data.name);
      setProductPrice(data.price);
      setProductStock(data.stock);
      setProductSub(data.subCategory);
      setProductDescription(data.description);
      setOpen(true);
    };
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleProductSubChange = (value) => {
    setProductSub(value);
  };

  const handelUdateProduct = () => {
    const productUpdate = {
      id: productId,
      name: productName,
      price: productPrice,
      stock: productStock,
      subcategory: productSub,
      description: productDescription,
    };

    console.log("productUpdate:", productUpdate);
    setOpen(false);
  };
  return (
    <>
      <Drawer
        title="Thông Tin Sản Phẩm"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Huỷ bỏ</Button>
            <Button onClick={handelUdateProduct} type="primary">
              Thay đổi
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24} className="mb-3">
              <label>Tên Sản Phẩm</label>
              <Input
                className="mt-3"
                placeholder="Nhập tên sản phẩm..."
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <label>Giá sản phẩm</label>
              <NumericInput
                className="mt-2"
                value={productPrice}
                onChange={setProductPrice}
                text="Nhập giá sản phẩm"
              />
            </Col>
            <Col span={12}>
              <label>SL tồn kho</label>
              <NumericInput
                className="mt-2"
                value={productStock}
                onChange={setProductStock}
                text="Nhập số lượng tồn kho"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24} className="mt-2">
              <label>Loại sản phẩm</label>
              <Select
                className="block my-2"
                value={productSub}
                placeholder="Please choose the type"
                onChange={handleProductSubChange}
              >
                {subData?.map((item, index) => (
                  <Option key={index} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <label>Mô Tả</label>
              <Input.TextArea
                className="mt-2"
                value={productDescription}
                rows={4}
                placeholder="Nhập mô tả..."
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </Col>
          </Row>
        </Form>
      </Drawer>

      <Table
        columns={columns}
        dataSource={data}
        pagination={paginationConfig}
      />
    </>
  );
};

export default ProductList;
