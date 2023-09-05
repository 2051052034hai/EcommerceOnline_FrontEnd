import React, { useEffect, useState } from "react";
import { Upload, Divider, Row, Col, Input, Select } from "antd";
import ImgCrop from "antd-img-crop";
import TextArea from "antd/es/input/TextArea";

//Utils
import { NumericInput } from "apps/services/utils/sellersPage";

// Queries
import { useGetSubCategories } from "apps/queries/subcategory";

const AddProduct = () => {
  const [fileList, setFileList] = useState([]);
  const [value, setValue] = useState("");
  const { data, isLoading} = useGetSubCategories();
  const [subData, setSubdata] = useState([])

  useEffect(()=> {
    setSubdata(data)
  },[data, isLoading])


  //Upload Img
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

  //Select
  const options = subData?.map((item, index) => {
    return {
    value:index,
    label: item?.name,
  }});

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
            <Input className="p-2" placeholder="Nhập vào tên..." />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg={3}>
            <h3 className="text-base mb-5 pt-3">Giá sản phẩm</h3>
          </Col>
          <Col lg={21}>
            <NumericInput
              className="p-2 w-full"
              value={value}
              onChange={setValue}
              text="Nhập giá sản phẩm"
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
              value={value}
              onChange={setValue}
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
            <TextArea rows={8} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AddProduct;
