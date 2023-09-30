//Libaries
import React, { useEffect, useState } from 'react'
import { Upload, Divider, Row, Col, Input, Select, Button, Form } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useSelector } from 'react-redux'
import { useRef } from 'react'

//Utils
import { NumericInput } from 'apps/services/utils/sellersPage'

//Queries
import { useGetShopbyUserId } from 'apps/queries/shop/useGetShopbyUserId'
import { useCreateProduct } from 'apps/queries/product/useCreateProduct'
import { useGetSubCategories } from 'apps/queries/subcategory'
import ReactQuill from 'react-quill'

//UserSlice
import { selectCurrentUser } from 'store/userSlice/userSelector'

const AddProduct = () => {
  const { mutation } = useCreateProduct()
  const { data, isLoading } = useGetSubCategories()
  const buttonRef = useRef()

  const currentUser = useSelector(selectCurrentUser)
  const [isLoadingAdd, setIsLoadingAdd] = useState(false)
  const [fileList, setFileList] = useState([])
  const [fileListImgs, setFileListImgs] = useState([])
  const [subData, setSubdata] = useState([])

  //product
  const [productDiscount, setProductDiscount] = useState(0)
  const [productName, setProductName] = useState('')
  const [productSub, setProductSub] = useState('')
  const [productStock, setProductStock] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const [productDescription, setProductDescription] = useState('')
  const [productImage, setProductImage] = useState({})
  const [productImages, setProductImages] = useState([])

  useEffect(() => {
    setSubdata(data)
  }, [data, isLoading])

  const { data: shop_data } = useGetShopbyUserId(currentUser?._id)

  //Upload Img
  const onChange = ({ fileList: newFileList }) => {
    const isValidImg = beforeUpload(fileList)
    if (isValidImg) {
      setFileList(newFileList)
      setProductImage(newFileList[0])
    } else {
      setFileList([])
      alert('vui lòng nhập ảnh có dung lượng nhỏ hơn 2mb')
    }
  }

  const onPreview = async (file) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  //Upload Imgs
  const onChangeImgs = ({ fileList: newFileList }) => {
    setFileListImgs(newFileList)
    setProductImages(newFileList)
  }

  //Select
  const options = subData?.map((item, index) => {
    return {
      value: index,
      label: item?.name,
      key: item?._id,
    }
  })

  // Reac-quill
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ['right', 'center', 'justify'] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [
        {
          color: [
            'red',
            '#785412',
            '#00CC33',
            '#FF9966',
            '#FF9900',
            '#FFCCFF',
            '#00CCFF',
            '#3399CC',
            '#CC33FF',
            '#00DD00',
            '#9900FF',
            '#110000',
            '#555555',
            '#FFFF66',
            '#FFFFFF',
          ],
        },
      ],
      [
        {
          background: [
            'red',
            '#785412',
            '#00CC33',
            '#FF9966',
            '#FF9900',
            '#FFCCFF',
            '#00CCFF',
            '#3399CC',
            '#CC33FF',
            '#00DD00',
            '#9900FF',
            '#110000',
            '#555555',
            '#FFFF66',
            '#FFFFFF',
          ],
        },
      ],
    ],
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'color',
    'image',
    'background',
    'align',
    'size',
    'font',
  ]

  const handleProcedureContentChange = (content, delta, source, editor) => {
    setProductDescription(content)
  }

  const handleProductSubChange = (value, option) => {
    const selectedKey = option.key
    setProductSub(selectedKey)
  }

  //Add product
  const handleAddProduct = async (values) => {
    setIsLoadingAdd(true)
    let new_product = {
      title: productName,
      price: productPrice,
      stock: productStock,
      discountPercentage: productDiscount,
      subcategory: productSub,
      description: productDescription,
      shop: shop_data?._id,
      thumbnail: productImage.originFileObj,
      images: [],
    }

    for (const file of productImages) {
      new_product.images.push(file.originFileObj)
    }
    await mutation.mutateAsync(new_product)
    setIsLoadingAdd(false)
    buttonRef.current.type = 'reset'
    setFileList([])
    setFileListImgs([])
    buttonRef.current.click()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const beforeUpload = (file) => {
    const maxSize = 2 * 1024 * 1024
    if (file[0]?.size > maxSize) {
      return false
    }
    return true
  }

  return (
    <>
      <div className="px-5 overflow-x-hidden">
        <Divider
          style={{
            fontSize: '24px',
            color: '#31a9e0',
            textTransform: 'uppercase',
          }}
        >
          thêm sản phẩm
        </Divider>

        <Form
          name="basic"
          autoComplete="off"
          onFinish={handleAddProduct}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col lg={24} md={20}>
              <h3 className="text-base mb-3 pt-3">
                <span style={{ fontWeight: 'bold' }}>* </span>Hình ảnh sản phẩm ({' '}
                <span className="text-sm">
                  <span style={{ fontWeight: 'bold' }}>* </span>vui lòng tải hình ảnh có
                  dung lượng {`<= 2MB`}
                </span>
                )
              </h3>
            </Col>
            <Col className="lg:ml-44 ml-48">
              <ImgCrop rotationSlider>
                <Form.Item
                  name="ProductImg"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng tải ảnh chính của sản phẩm',
                    },
                  ]}
                >
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
                </Form.Item>
              </ImgCrop>
            </Col>
          </Row>
          <Row>
            <Col lg={24} md={20}>
              <h3 className="text-base mb-3 pt-3">
                <span style={{ fontWeight: 'bold' }}>* </span>Hình ảnh kèm theo
              </h3>
            </Col>
            <Col className="lg:ml-44 ml-48">
              <ImgCrop rotationSlider>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileListImgs}
                  onChange={onChangeImgs}
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
            <Col lg={4} md={4}>
              <h3 className="text-base mb-5 pt-3 w-32">
                <span style={{ fontWeight: 'bold' }}>* </span>Tên sản phẩm
              </h3>
            </Col>
            <Col lg={20} md={14}>
              <Form.Item
                name="ProductName"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên sản phẩm',
                  },
                ]}
              >
                <Input
                  onChange={(e) => setProductName(e.target.value)}
                  className="p-2"
                  placeholder="Nhập vào tên..."
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={4} md={4}>
              <h3 className="text-base mb-5 pt-3 w-32">
                <span style={{ fontWeight: 'bold' }}>* </span>Nhập giá
              </h3>
            </Col>
            <Col lg={20} md={14}>
              <NumericInput
                value={productPrice}
                className="p-2 w-full"
                onChange={setProductPrice}
                text="Nhập giá sản phẩm..."
              />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={4} md={4}>
              <h3 className="text-base mb-5 pt-3 w-32">
                <span style={{ fontWeight: 'bold' }}>* </span>Giảm giá %
              </h3>
            </Col>
            <Col lg={20} md={14}>
              <NumericInput
                value={productDiscount}
                className="p-2 w-full"
                onChange={setProductDiscount}
                text="Nhập giảm giá..."
              />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={4} md={4}>
              <h3 className="text-base mb-5 pt-3 w-32">
                <span style={{ fontWeight: 'bold' }}>* </span>SL tồn kho
              </h3>
            </Col>
            <Col lg={20} md={14}>
              <Form.Item
                name="ProductStock"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập SL tồn kho của sản phẩm',
                  },
                ]}
              >
                <NumericInput
                  className="p-2 w-full"
                  value={productStock}
                  onChange={setProductStock}
                  text="Nhập số lượng tồn kho"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={4} md={4}>
              <h3 className="text-base mb-5 pt-3 w-32">
                <span style={{ fontWeight: 'bold' }}>* </span>Loại sản phẩm
              </h3>
            </Col>
            <Col lg={20} md={14}>
              <Form.Item
                name="ProductSub"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập loại của sản phẩm',
                  },
                ]}
              >
                <Select
                  onChange={handleProductSubChange}
                  showSearch
                  className="w-full p-1"
                  placeholder="Chọn loại sản phẩm"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label?.toLowerCase() ?? '').includes(input.toLowerCase())
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label?.toLowerCase() ?? '').localeCompare(
                      optionB?.label?.toLowerCase(),
                    )
                  }
                  options={options}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={4} md={4}>
              <h3 className="text-base mb-5 pt-5 ">
                <span style={{ fontWeight: 'bold' }}>* </span>Mô tả sản phẩm
              </h3>
            </Col>
            <Col lg={20} md={14}>
              <Form.Item
                name="ProductDescription"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mô tả của sản phẩm',
                  },
                ]}
              >
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  value={productDescription}
                  onChange={handleProcedureContentChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className="mb-3 lg:justify-start md:ml-32 lg:ml-48">
            <Button
              className="bg-blue-600 text-white rounded "
              htmlType="submit"
              type="primary"
              loading={isLoadingAdd}
              ref={buttonRef}
            >
              Thêm sản phẩm
            </Button>
          </Row>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          ></Form.Item>
        </Form>
      </div>
    </>
  )
}

export default AddProduct
