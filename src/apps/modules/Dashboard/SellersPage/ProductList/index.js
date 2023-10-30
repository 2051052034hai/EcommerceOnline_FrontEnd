//Libaries
import React, { useEffect, useState } from 'react'
import {
  Row,
  Col,
  Input,
  Select,
  Space,
  Form,
  Button,
  Drawer,
  Upload,
  Modal,
  Divider,
  Popconfirm,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

//UserSlice
import { selectCurrentUser } from 'store/userSlice/userSelector'

//Queries
import { useGetProductsByShopId } from 'apps/queries/shop'
import { useGetSubCategories } from 'apps/queries/subcategory'
import { NumericInput, compareProduct, getBase64 } from 'apps/services/utils/sellersPage'

//Queries
import { useUpdateProduct } from 'apps/queries/product/useUpdateProduct'
import { useDeleteProduct } from 'apps/queries/product/useDeleteProduct'
import { useGetShopbyUserId } from 'apps/queries/shop/useGetShopbyUserId'
import ReactQuill from 'react-quill'

//Services
import { uploadImage } from 'apps/services/utils/uploadImage'
import TableFilterAll from 'apps/components/molecules/TableFilterAll'
import { Helmet } from 'react-helmet'

const ProductList = () => {
  const { mutationDelete } = useDeleteProduct()
  const [pageSize, setPageSize] = useState(5)
  const [productData, setProductData] = useState([])
  const [total, setTotal] = useState()
  const [page, setPage] = useState(1)
  const [fileList, setFileList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)

  //InfoProduct
  const [productId, setProductId] = useState('')
  const [productName, setProductName] = useState('')
  const [productSubId, setProductSubId] = useState('')
  const [productStock, setProductStock] = useState('')
  const [productWeight, setProductWeight] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productImage, setProductImage] = useState('')
  const [productImages, setProductImages] = useState([])
  const [productSubName, setProductSubName] = useState('')
  const [productTracking, setProductTracking] = useState({})

  //Upload Images
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileListImgs, setFileListImgs] = useState([])
  const [uid, setUid] = useState('')
  const [uidList, setUidList] = useState([])
  const [defaultImgs, setDefaultImgList] = useState([])

  //load form
  const [openForm, setOpenForm] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const currentUser = useSelector(selectCurrentUser)
  const { mutation } = useUpdateProduct()
  const { data: shop_data } = useGetShopbyUserId(currentUser?._id)
  const { data: new_data, isLoading: isLoadingGetProducts } = useGetProductsByShopId(
    shop_data?._id,
  )
  const { data: subcateData } = useGetSubCategories()

  //UseEffect
  useEffect(() => {
    setProductData(new_data?.products)
    setTotal(new_data?.total)
  }, [new_data])

  useEffect(() => {
    if (productImage) {
      const initialFileList = [
        {
          status: 'done',
          url: productImage,
        },
      ]
      setFileList(initialFileList)
    }
  }, [productImage])

  useEffect(() => {
    if (productImages) {
      const imageList = productImages.map((img, index) => ({
        status: 'done',
        url: img,
      }))
      setFileListImgs(imageList)
    }
  }, [productImages])

  useEffect(() => {
    form.setFieldsValue({
      ProductName: productName,
    })
  }, [productName, form])

  // Loa data
  const columns = [
    {
      title: '',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (link, record) => {
        return (
          <Link to={`/product/${record.id}`}>
            <img className="lg:w-16 w-8 m-auto" alt="not found" src={link} />
          </Link>
        )
      },
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: 400,
      render: (text, record) => (
        <Link to={`/product/${record.id}`} className="font-medium text-justify">
          {text}
        </Link>
      ),
    },
    {
      title: 'Giá bán',
      dataIndex: 'price',
      key: 'price',
      render: (text) => (
        <h3 className="font-medium">
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(text)}
        </h3>
      ),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Tồn Kho',
      dataIndex: 'stock',
      key: 'stock',
      render: (text) => <h3 className="font-medium">{text}</h3>,
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: 'Đã bán',
      dataIndex: 'sold',
      key: 'sold',
      render: (text) => <h3 className="font-medium">{text}</h3>,
      sorter: (a, b) => a.sold - b.sold,
    },
    {
      title: 'Loại sản phẩm',
      dataIndex: 'subCategory',
      key: 'subCategory',
      render: (text, record) => (
        <h3 className="font-medium text-blue-800">{record.subCategoryName}</h3>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (record) => {
        let record_Data = {
          id: record.id,
          name: record.name,
          subCategory: record.subCategoryName,
          weight: record.weight,
          thumbnail: record.thumbnail,
          stock: record.stock,
          price: record.price,
          description: record.description,
          images: record.images,
          subcategoryId: record.subcategoryId,
        }

        return (
          <>
            <Helmet>
              <title>Bán hàng | Quản lý sản phẩm</title>
            </Helmet>
            <Space size="middle">
              <Popconfirm
                title="Bạn có chắc muốn xoá sản phẩm này?"
                onConfirm={() => handleDeleteProduct(record.id)}
              >
                <span>
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: '#e74023', cursor: 'pointer' }}
                  />
                </span>
              </Popconfirm>

              <span>
                <FontAwesomeIcon
                  onClick={() => showDrawer(record_Data)}
                  icon={faPen}
                  style={{ color: '#1b61da', cursor: 'pointer' }}
                />
              </span>
            </Space>
          </>
        )
      },
    },
  ]

  const data = productData?.map((item, index) => {
    return {
      key: String(index + 1),
      thumbnail: item.thumbnail,
      id: item._id,
      name: item.title,
      price: item.price,
      stock: item.stock,
      sold: item.sold,
      subCategoryName: item.subcategory?.name,
      description: item.description,
      images: item.images,
      weight: item.weight,
      user: currentUser?._id,
      subcategoryId: item.subcategory?._id,
    }
  })

  const options = subcateData?.map((item, index) => {
    return {
      value: index,
      label: item?.name,
      key: item?._id,
    }
  })

  // Pagination
  const paginationConfig = {
    pageSize: pageSize,
    total: total,
    showSizeChanger: true,
    position: ['bottomCenter'],
    onChange: (page, pageSize) => {
      setPage(page)
      setPageSize(pageSize)
    },
  }

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
  )

  //Drawer
  const showDrawer = (data) => {
    setProductId(data.id)
    setProductName(data.name)
    setProductPrice(data.price)
    setProductStock(data.stock)
    setProductSubName(data.subCategory)
    setProductDescription(data.description)
    setProductImage(data.thumbnail)
    setProductImages(data.images)
    setProductSubId(data.subcategoryId)
    setProductWeight(data.weight)
    setOpen(true)
    setDefaultImgList(data.images)
    const resetImg = [
      {
        status: 'done',
        uid: uid,
        url: data.thumbnail,
      },
    ]

    let resetImgs = []

    for (let i = 0; i < defaultImgs.length; i++) {
      resetImgs.push({
        status: 'done',
        url: defaultImgs[i],
        uid: uidList[i],
      })
    }

    setFileList(resetImg)
    setFileListImgs(resetImgs)

    // Lưu trữ dữ liệu ban đầu để theo dõi sự thay đổi của form
    let productInit = {
      name: data.name,
      price: data.price,
      stock: data.stock,
      subcategory: data.subCategory,
      image: data.thumbnail,
      images: data.images,
      weight: data.weight,
      description: data.description,
    }
    setProductTracking(productInit)
  }

  const onClose = () => {
    setUid(fileList[0]?.uid)
    let arr = []
    fileListImgs.map((item) => {
      arr.push(item?.uid)
    })
    setUidList(arr)
    setOpen(false)
  }
  // ImgProduct
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

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

  //Handle function
  const handleDeleteProduct = async (id) => {
    mutationDelete.mutate(id)
  }
  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
    // setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    setPreviewTitle('Ảnh sản phẩm')
  }
  const handleChange = ({ fileList: newFileList }) => setFileListImgs(newFileList)

  const handleProductSubChange = (value, option) => {
    setProductSubId(option.key)
    setProductSubName(value)
  }

  const handleProcedureContentChange = (content, delta, source, editor) => {
    setProductDescription(content)
  }

  const handelUdateProduct = async () => {
    setIsLoading(true)
    if (!productName || !fileList) {
      setIsLoading(false)
      return toast.error('Cập nhật thất bại!')
    }
    const productUpdate = {
      page,
      pageSize,
      _id: productId,
      title: productName,
      price: productPrice,
      stock: productStock,
      subcategory: productSubId,
      description: productDescription,
      weight: productWeight,
      shop: shop_data?._id,
      thumbnail: '',
      images: [],
    }

    for (const file of fileList) {
      if (file.url) {
        productUpdate.thumbnail = file.url
      } else {
        const imagetest = await uploadImage(file.originFileObj)
        productUpdate.thumbnail = imagetest
      }
    }
    for (const file of fileListImgs) {
      if (file.url) {
        productUpdate.images.push(file.url)
      } else {
        const imagetest = await uploadImage(file.originFileObj)

        productUpdate.images.push(imagetest)
      }
    }

    if (productUpdate) {
      mutation.mutate(productUpdate)
    }
    setOpen(false)
    setIsLoading(false)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  //Form hiện lên khi có sự thay đổi thông tin sản phẩm
  const showModal = () => {
    let producPrev = {
      name: productName,
      price: productPrice,
      stock: productStock,
      subcategory: productSubName,
      image: productImage,
      images: fileListImgs,
      weight: productWeight,
      description: productDescription,
    }
    const isChange = compareProduct(productTracking, producPrev)
    if (isChange) {
      setOpenForm(true)
    } else {
      setOpenForm(false)
      setOpen(false)
    }
  }

  const handleOk = () => {
    handelUdateProduct()
    setConfirmLoading(true)
    setTimeout(() => {
      setOpenForm(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancelForm = () => {
    setOpenForm(false)
    onClose()
  }

  return (
    <>
      <Form
        form={form}
        name="basic"
        autoComplete="off"
        onFinish={handelUdateProduct}
        onFinishFailed={onFinishFailed}
      >
        <Drawer
          title={<div className="custom-drawer-title">Thông Tin Sản Phẩm</div>}
          width={720}
          onClose={showModal}
          open={open}
          bodyStyle={{
            paddingBottom: 80,
          }}
          extra={
            <Space>
              <Button
                htmlType="submit"
                type="primary"
                onClick={handelUdateProduct}
                loading={isLoading}
              >
                Thay đổi
              </Button>
            </Space>
          }
        >
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
                  onPreview={handlePreview}
                >
                  {fileList.length < 1 && 'Thay đổi'}
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
                    width: '100%',
                  }}
                  src={previewImage}
                />
              </Modal>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24} className="mb-3">
              <label>Tên Sản Phẩm</label>
              <Form.Item
                name="ProductName"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên của sản phẩm',
                  },
                ]}
                initialValue={productName}
              >
                <Input
                  className="mt-3"
                  placeholder="Nhập tên sản phẩm..."
                  onChange={(e) => setProductName(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <label>Giá sản phẩm</label>
              <NumericInput
                className="mt-2"
                value={productPrice}
                onChange={setProductPrice}
                text="Nhập giá sản phẩm"
              />
            </Col>
            <Col span={8}>
              <label>SL tồn kho</label>
              <NumericInput
                className="mt-2"
                value={productStock}
                onChange={setProductStock}
                text="Nhập số lượng tồn kho"
              />
            </Col>
            <Col span={8}>
              <label>Cân nặng</label>
              <NumericInput
                className="mt-2"
                value={productWeight}
                onChange={setProductWeight}
                text="Nhập số lượng tồn kho"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24} className="mt-2">
              <label>Loại sản phẩm</label>
              <Select
                onChange={handleProductSubChange}
                value={productSubName}
                showSearch
                className="w-full pt-3"
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
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24} className="my-2">
              <label>Mô Tả</label>
              <ReactQuill
                className="mt-2"
                theme="snow"
                modules={modules}
                formats={formats}
                value={productDescription}
                onChange={handleProcedureContentChange}
              />
            </Col>
          </Row>
        </Drawer>
      </Form>
      <Divider
        style={{
          fontSize: '24px',
          color: '#31a9e0',
          textTransform: 'uppercase',
        }}
      >
        Danh sách sản phẩm
      </Divider>

      <Row className="lg:w-full">
        <Col lg={24} xs={24}>
          <TableFilterAll
            dataSource={data}
            columns={columns}
            pagination={paginationConfig}
            loading={isLoadingGetProducts}
          />
        </Col>
      </Row>

      <Row>
        <Modal
          open={openForm}
          onOk={handleOk}
          closable={false}
          confirmLoading={confirmLoading}
          onCancel={handleCancelForm}
        >
          <p className="font-medium text-base">
            Bạn có chắc muốn cập nhật thông tin sản phẩm ?
          </p>
        </Modal>
      </Row>
    </>
  )
}

export default ProductList
