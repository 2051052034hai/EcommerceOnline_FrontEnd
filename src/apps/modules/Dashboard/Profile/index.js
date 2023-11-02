//Libaries
import { useEffect, useState } from 'react'
import { Button, Col, Divider, Drawer, Form, Input, Row, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

//Queries
import { useGetShopbyUserId } from 'apps/queries/shop/useGetShopbyUserId'

//UserSlice
import { selectCurrentUser } from 'store/userSlice/userSelector'

//Utils
import { handleChangeTime } from 'apps/services/utils/sellersPage'
import { useUpdateUserById } from 'apps/queries/auth/useUpdateUserById'
import { useGetUserByUserId } from 'apps/queries/auth/useGetUserByUserId'
import { save_user } from 'store/userSlice/userSlice'

const Profile = () => {
  const currentUser = useSelector(selectCurrentUser)
  const { data: shopData, isLoading } = useGetShopbyUserId(currentUser?._id)
  const { data: dataUserId, isLoadingDataUserId } = useGetUserByUserId(currentUser?._id)
  const { mutation, isLoadingUser } = useUpdateUserById(currentUser?._id)
  const [form] = Form.useForm()
  const [formInfo] = Form.useForm()
  const dispatch = useDispatch()

  //Shop
  const [shopProfile, setShopProfile] = useState({})
  const [shopName, setShopName] = useState('')
  const [shopAddress, setShopAddress] = useState('')
  const [open, setOpen] = useState(false)

  //User
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [openInfo, setOpenInfo] = useState(false)
  const [userId, setUserId] = useState('')

  useEffect(() => {
    setShopProfile(shopData)
  }, [shopData])

  useEffect(() => {
    form.setFieldsValue({
      ShopName: shopName,
      ShopAddress: shopAddress,
    })
  }, [shopName, shopAddress, form])

  useEffect(() => {
    formInfo.setFieldsValue({
      UserName: userName,
      Email: email,
    })
  }, [userName, email, formInfo])

  const showDrawer = (name, address) => {
    setShopName(name)
    setShopAddress(address)
    setOpen(true)
  }

  const showDrawerInfo = (name, email) => {
    setUserId(currentUser?._id)
    setUserName(name)
    setEmail(email)
    setPassword('*******')
    setOpenInfo(true)
  }
  //Form hiện lên khi có sự thay đổi thông tin cửa hàng
  const showModal = () => {
    let shopPrev = {
      name: shopName,
    }
    // const isChange = compareProduct(productTracking, producPrev)
    // if (isChange) {
    //   setOpenForm(true)
    // } else {
    //   setOpenForm(false)
    //   setOpen(false)
    // }
    setOpen(false)
  }

  const showModalInfo = () => {
    let shopPrev = {
      name: shopName,
    }
    // const isChange = compareProduct(productTracking, producPrev)
    // if (isChange) {
    //   setOpenForm(true)
    // } else {
    //   setOpenForm(false)
    //   setOpen(false)
    // }
    setOpenInfo(false)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const handelUdateUser = () => {
    const data = {
      _id: userId,
      username: userName,
      email: email,
    }

    mutation.mutate(data)
    dispatch(save_user(data))
  }
  const handelUdateShop = () => {}

  return (
    <>
      <div className="justify-center bg-profile bg-gray-200">
        <Form
          form={form}
          name="basic"
          autoComplete="off"
          onFinish={handelUdateShop}
          onFinishFailed={onFinishFailed}
        >
          <Drawer
            title={<div className="custom-drawer-title">Thông tin cửa hàng</div>}
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
                  //   onClick={handelUdateProduct}
                  //   loading={isLoading}
                >
                  Thay đổi
                </Button>
              </Space>
            }
          >
            <Row gutter={16}>
              <Col span={24} className="mb-3">
                <label>Tên cửa hàng</label>
                <Form.Item
                  name="ShopName"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập tên của cửa hàng',
                    },
                  ]}
                  initialValue={shopName}
                >
                  <Input
                    className="mt-3"
                    placeholder="Nhập tên cửa hàng..."
                    onChange={(e) => setShopName(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24} className="mb-3">
                <label>Địa chỉ cửa hàng</label>
                <Form.Item
                  name="ShopAddress"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng địa chỉ cửa hàng',
                    },
                  ]}
                  initialValue={shopAddress}
                >
                  <Input
                    className="mt-3"
                    placeholder="Nhập địa chỉ cửa hàng..."
                    onChange={(e) => setShopAddress(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Drawer>
        </Form>

        <Form
          form={formInfo}
          name="basic"
          autoComplete="off"
          onFinish={handelUdateUser}
          onFinishFailed={onFinishFailed}
        >
          <Drawer
            title={<div className="custom-drawer-title">Thông tin cá nhân</div>}
            width={720}
            onClose={showModalInfo}
            open={openInfo}
            bodyStyle={{
              paddingBottom: 80,
            }}
            extra={
              <Space>
                <Button
                  htmlType="submit"
                  type="primary"
                  onClick={handelUdateUser}
                  loading={isLoadingUser}
                >
                  Thay đổi
                </Button>
              </Space>
            }
          >
            <Row gutter={16}>
              <Col span={24} className="mb-3">
                <label>Tên đăng nhập</label>
                <Form.Item
                  name="UserName"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập tên đăng nhập',
                    },
                  ]}
                  initialValue={userName}
                >
                  <Input
                    className="mt-3"
                    placeholder="Nhập tên..."
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24} className="mb-3">
                <label>Email</label>
                <Form.Item
                  name="Email"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập địa chỉ email',
                    },
                  ]}
                  initialValue={email}
                >
                  <Input
                    className="mt-3"
                    placeholder="Nhập địa chỉ email..."
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24} className="mb-3">
                <label>Mật khẩu</label>
                <Form.Item
                  name="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập mật khẩu',
                    },
                  ]}
                  initialValue={password}
                >
                  <Input
                    className="mt-3"
                    placeholder="Nhập mật khẩu..."
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Drawer>
        </Form>

        <Row className="w-8/12 bg-white" style={{ margin: 'auto' }}>
          <Divider
            style={{
              fontSize: '20px',
              color: '#31a9e0',
              textTransform: 'uppercase',
            }}
          >
            Hồ sơ của tôi
          </Divider>
          <Form className="w-full mx-14 p-3">
            <Divider
              orientation="left"
              style={{
                fontSize: '16px',
                color: '#31a9e0',
                textTransform: 'uppercase',
              }}
            >
              Thông tin cá nhân
            </Divider>
            <Form.Item>
              <Row className="items-center">
                <Col lg={4}>
                  <label className="font-medium text-base text-left">Tên đăng nhập</label>
                </Col>
                <Col lg={20} className="mr-2">
                  <Input className="my-2" value={currentUser?.username}></Input>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row className="items-center">
                <Col lg={4}>
                  <label className="font-medium text-base text-left">Email</label>
                </Col>
                <Col lg={20} className="mr-2">
                  <Input className="my-2" value={currentUser?.email}></Input>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row className="items-center">
                <Col lg={4}>
                  <label className="font-medium text-base text-left">Mật khẩu</label>
                </Col>
                <Col lg={20} className="mr-2">
                  <Input className="my-2" value={'********'}></Input>
                </Col>
              </Row>
            </Form.Item>

            {/* <Form.Item>
              <Row className="items-center">
                <Col lg={4}>
                  <label className="font-medium text-base text-left">Ngày tạo</label>
                </Col>
                <Col lg={20} className="mr-2">
                  <Input
                    className="my-2"
                    value={handleChangeTime(currentUser?.createdAt)}
                  ></Input>
                </Col>
              </Row>
            </Form.Item> */}
            <Button
              onClick={() => showDrawerInfo(currentUser?.username, currentUser?.email)}
              type="primary"
            >
              Thay đổi
            </Button>
          </Form>
          {shopData && (
            <>
              <Form className="w-full mx-14 p-3 mb-10">
                <Divider
                  orientation="left"
                  style={{
                    fontSize: '16px',
                    color: '#31a9e0',
                    textTransform: 'uppercase',
                  }}
                >
                  Thông tin Cửa hàng
                </Divider>
                <Form.Item>
                  <Row className="items-center">
                    <Col lg={4}>
                      <label className="font-medium text-base text-left">
                        Tên cửa hàng
                      </label>
                    </Col>
                    <Col lg={20} className="mr-2">
                      <Input className="my-2" value={shopProfile?.name}></Input>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item>
                  <Row className="items-center">
                    <Col lg={4}>
                      <label className="font-medium text-base text-left">Địa chỉ</label>
                    </Col>
                    <Col lg={20} className="mr-2">
                      <Input className="my-2" value={shopProfile?.address}></Input>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item>
                  <Row className="items-center">
                    <Col lg={4}>
                      <label className="font-medium text-base text-left">Ngày tạo</label>
                    </Col>
                    <Col lg={20} className="mr-2">
                      <Input
                        className="my-2"
                        value={handleChangeTime(shopProfile?.createdAt)}
                      ></Input>
                    </Col>
                  </Row>
                </Form.Item>
                {/* <Button
                  onClick={() => showDrawer(shopProfile?.name, shopProfile?.address)}
                  type="primary"
                >
                  Thay đổi
                </Button> */}
              </Form>
            </>
          )}
        </Row>
      </div>
    </>
  )
}

export default Profile
