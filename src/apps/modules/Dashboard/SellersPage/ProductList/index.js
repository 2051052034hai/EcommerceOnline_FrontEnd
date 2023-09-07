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
  Upload,
  Modal,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

//UserSlice
import { selectCurrentUser } from "store/userSlice/userSelector";

//Queries
import { useGetProductsByShopId } from "apps/queries/shop";
import { useGetSubCategories } from "apps/queries/subcategory";
import { NumericInput, getBase64 } from "apps/services/utils/sellersPage";
import ReactQuill from "react-quill";
import { uploadImage } from "apps/services/utils/uploadImage";
import { useUpdateProduct } from "apps/queries/product/useUpdateProduct";
import { useDeleteProduct } from "apps/queries/product/useDeleteProduct";

const { Option } = Select;

const ProductList = () => {
  const { mutation, isLoading: isLoadingUpdateProduct } = useUpdateProduct();
  const { mutationDelete, isLoadingDelete } = useDeleteProduct();
  const [pageSize, setPageSize] = useState(5);
  const [productData, setProductData] = useState([]);
  const [total, setTotal] = useState();
  const [page, setPage] = useState(1);
  const [subData, setSubdata] = useState([]);
  const [fileList, setFileList] = useState([]);

  //InfoProduct
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productSub, setProductSub] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productImages, setProductImages] = useState([]);

  //Upload Images
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [fileListImgs, setFileListImgs] = useState([]);

  useEffect(() => {
    if (productImages) {
      const imageList = productImages.map((img, index) => ({
        status: "done",
        url: img,
      }));
      setFileListImgs(imageList);
    }
  }, [productImages]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) =>
    setFileListImgs(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        <span>Thêm ảnh</span>
      </div>
    </div>
  );

  const currentUser = useSelector(selectCurrentUser);
  const { data: new_data, isLoading: isLoadingGetProducts } =
    useGetProductsByShopId(currentUser?._id, page, pageSize);

  const { data: subcateData, isLoading: subLoading } = useGetSubCategories();

  useEffect(() => {
    setProductData(new_data?.products);
    setTotal(new_data?.total);
  }, [new_data, isLoadingGetProducts]);

  useEffect(() => {
    setSubdata(subcateData);
  }, [subcateData, subLoading]);

  useEffect(() => {
    if (productImage) {
      const initialFileList = [
        {
          status: "done",
          url: productImage,
        },
      ];
      setFileList(initialFileList);
    }
  }, [productImage]);

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
          id: record.id,
          name: record.name,
          subCategory: record.subCategory,
          thumbnail: record.thumbnail,
          stock: record.stock,
          price: record.price,
          description: record.description,
          images: record.images,
        };

        return (
          <Space size="middle">
            <span>
              <FontAwesomeIcon
                onClick={() => handleDeleteProduct(record.id)}
                icon={faTrash}
                style={{ color: "#e74023", cursor: "pointer" }}
              />
            </span>
            <span>
              <FontAwesomeIcon
                onClick={showDrawer(record_Data)}
                icon={faPen}
                style={{ color: "#1b61da", cursor: "pointer" }}
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
      images: item.images,
      user: currentUser?._id,
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
      setProductId(data.id);
      setProductName(data.name);
      setProductPrice(data.price);
      setProductStock(data.stock);
      setProductSub(data.subCategory);
      setProductDescription(data.description);
      setProductImage(data.thumbnail);
      setProductImages(data.images);
      setOpen(true);
    };
  };

  const onClose = () => {
    setOpen(false);
  };

  const handelUdateProduct = async () => {
    const productUpdate = {
      _id: productId,
      title: productName,
      price: productPrice,
      stock: productStock,
      subcategory: productSub,
      description: productDescription,
      thumbnail: "",
      images: [],
    };

    for (const file of fileList) {
      if (file.url) {
        productUpdate.thumbnail = file.url;
      } else {
        const imagetest = await uploadImage(file.originFileObj);
        productUpdate.thumbnail = imagetest;
      }
    }
    for (const file of fileListImgs) {
      if (file.url) {
        productUpdate.images.push(file.url);
      } else {
        const imagetest = await uploadImage(file.originFileObj);

        productUpdate.images.push(imagetest);
      }
    }

    if (productUpdate) {
      mutation.mutate(productUpdate);
    }
    setOpen(false);
  };

  const handleDeleteProduct = async (id) => {
    const dataDelete = {
      id,
      page,
      pageSize,
      user: currentUser?._id,
    };
    mutationDelete.mutate(dataDelete);
  };

  // ImgProduct
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  // Reac-quill
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        {
          color: [
            "red",
            "#785412",
            "#00CC33",
            "#FF9966",
            "#FF9900",
            "#FFCCFF",
            "#00CCFF",
            "#3399CC",
            "#CC33FF",
            "#00DD00",
            "#9900FF",
            "#110000",
            "#555555",
            "#FFFF66",
            "#FFFFFF",
          ],
        },
      ],
      [
        {
          background: [
            "red",
            "#785412",
            "#00CC33",
            "#FF9966",
            "#FF9900",
            "#FFCCFF",
            "#00CCFF",
            "#3399CC",
            "#CC33FF",
            "#00DD00",
            "#9900FF",
            "#110000",
            "#555555",
            "#FFFF66",
            "#FFFFFF",
          ],
        },
      ],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
  ];

  const handleProcedureContentChange = (content, delta, source, editor) => {
    setProductDescription(content);
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
              <label>Ảnh Sản Phẩm</label>
              <ImgCrop rotationSlider>
                <Upload
                  className="mt-3"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 1 && "Thay đổi"}
                </Upload>
              </ImgCrop>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24} className="mb-3">
              <label>Ảnh Kèm Theo</label>
              <Upload
                className="mt-3"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileListImgs}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileListImgs.length >= 5 ? null : uploadButton}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{
                    width: "100%",
                  }}
                  src={previewImage}
                />
              </Modal>
            </Col>
          </Row>

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
                placeholder="Please choose the type"
              >
                {subData?.map((item, index) => (
                  <Option
                    key={index}
                    value={item.name}
                    onChange={() => setProductSub(item?._id)}
                  >
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <label>Mô Tả</label>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={productDescription}
                onChange={handleProcedureContentChange}
              />
            </Col>
          </Row>
        </Form>
      </Drawer>

      <Table
        columns={columns}
        dataSource={data}
        pagination={paginationConfig}
        loading={
          isLoadingUpdateProduct || isLoadingGetProducts || isLoadingDelete
        }
      />
    </>
  );
};

export default ProductList;
