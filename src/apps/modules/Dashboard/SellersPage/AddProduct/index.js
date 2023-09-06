import React, { useEffect, useState } from "react";
import { Upload, Divider, Row, Col, Input, Select, Button } from "antd";
import ImgCrop from "antd-img-crop";

//Utils
import { NumericInput } from "apps/services/utils/sellersPage";

// Queries
import { useGetSubCategories } from "apps/queries/subcategory";
import ReactQuill from "react-quill";
import { selectCurrentUser } from "store/userSlice/userSelector";
import { useSelector } from "react-redux";

const AddProduct = () => {
  const currentUser = useSelector(selectCurrentUser);

  const [fileList, setFileList] = useState([]);
  const [fileListImgs, setFileListImgs] = useState([]);
  const { data, isLoading } = useGetSubCategories();
  const [subData, setSubdata] = useState([]);

  //product
  const [productDiscount, setProductDiscount] = useState(0);
  const [productName, setProductName] = useState("");
  const [productSub, setProductSub] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    setSubdata(data);
  }, [data, isLoading]);

  //Upload Img
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setProductImage(newFileList);
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

  //Upload Imgs
  const onChangeImgs = ({ fileList: newFileList }) => {
    setFileListImgs(newFileList);
    setProductImages(newFileList);
  };
  const onPreviewImgs = async (file) => {
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
  //Select
  const options = subData?.map((item, index) => {
    return {
      value: index,
      label: item?.name,
    };
  });

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

  //update
  const handleAddProduct = () => {
    let new_product = {
      title: productName,
      price: productPrice,
      stock: productStock,
      discountPercentage: productDiscount,
      subcategory: productSub,
      description: productDescription,
      shop: currentUser?._id,
      thumbnail: productImage,
      images: productImages,
    };

    console.log("new_product:", new_product);
  };

  return (
    <>
      <div className="px-5">
        <Divider style={{ fontSize: "20px" }} orientation="left">
          Thêm sản phẩm
        </Divider>
        <Row>
          <Col lg={24}>
            <h3 className="text-base mb-3 pt-3">Hình ảnh sản phẩm</h3>
          </Col>
          <Col className="ml-32">
            <ImgCrop rotationSlider>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 1 && (
                  <span className="text-red-500 font-medium w-20">
                    Thêm hình ảnh (0/1)
                  </span>
                )}
              </Upload>
            </ImgCrop>
          </Col>
        </Row>

        <Row>
          <Col lg={24}>
            <h3 className="text-base mb-3 pt-3">Hình ảnh kèm theo</h3>
          </Col>
          <Col className="ml-32">
            <ImgCrop rotationSlider>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileListImgs}
                onChange={onChangeImgs}
                onPreview={onPreviewImgs}
              >
                {fileList.length < 5 && (
                  <span className="text-red-500 font-medium w-20">
                    Thêm hình ảnh (0/5)
                  </span>
                )}
              </Upload>
            </ImgCrop>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg={3}>
            <h3 className="text-base mb-5 pt-3">Tên sản phẩm</h3>
          </Col>
          <Col lg={21}>
            <Input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="p-2"
              placeholder="Nhập vào tên..."
            />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg={3}>
            <h3 className="text-base mb-5 pt-3">Giá sản phẩm</h3>
          </Col>
          <Col lg={21}>
            <NumericInput
              value={productPrice}
              className="p-2 w-full"
              onChange={setProductPrice}
              text="Nhập giá sản phẩm"
            />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg={3}>
            <h3 className="text-base mb-5 pt-3 w-32">Giảm giá %</h3>
          </Col>
          <Col lg={21}>
            <NumericInput
              value={productDiscount}
              className="p-2 w-full"
              onChange={setProductDiscount}
              text="Nhập giảm giá..."
            />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg={3}>
            <h3 className="text-base mb-5 pt-3">SL tồn kho</h3>
          </Col>
          <Col lg={21}>
            <NumericInput
              className="p-2 w-full"
              value={productStock}
              onChange={setProductStock}
              text="Nhập số lượng tồn kho"
            />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg={3}>
            <h3 className="text-base mb-5 pt-3">Loại sản phẩm</h3>
          </Col>
          <Col lg={21}>
            <Select
              value={productSub}
              onChange={(value) => setProductSub(value)}
              showSearch
              className="w-full pt-3"
              placeholder="Chọn loại sản phẩm"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label?.toLowerCase() ?? "").includes(
                  input.toLowerCase()
                )
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label?.toLowerCase() ?? "").localeCompare(
                  optionB?.label?.toLowerCase()
                )
              }
              options={options}
            />
          </Col>
        </Row>

        <Row className="my-5">
          <Col lg={3}>
            <h3 className="text-base mb-5 pt-5 ">Mô tả sản phẩm</h3>
          </Col>
          <Col lg={21}>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={productDescription}
              onChange={handleProcedureContentChange}
            />
          </Col>
        </Row>
        <Row className="mb-3 justify-end">
          <Button
            className="bg-blue-600 text-white rounded "
            type="submit"
            onClick={handleAddProduct}
          >
            Thêm sản phẩm
          </Button>
        </Row>
      </div>
    </>
  );
};

export default AddProduct;
