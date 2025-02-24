//Libaries
import { useEffect, useRef, useState } from 'react'
import { Button, Col, Divider, Drawer, Form, Input, Modal, Row, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

//Queries
import { useGetShopbyUserId } from 'apps/queries/shop/useGetShopbyUserId'
import { useUpdateUserById } from 'apps/queries/auth/useUpdateUserById'
import { useCheckedPassword } from 'apps/queries/auth/useCheckedPassword'

//UserSlice
import { selectCurrentUser } from 'store/userSlice/userSelector'
import { save_user } from 'store/userSlice/userSlice'

//Utils
import { handleChangeTime } from 'apps/services/utils/sellersPage'
import { compareUser } from 'apps/services/utils/user'

const Profile = () => {
  const currentUser = useSelector(selectCurrentUser)
  const { data: shopData, isLoading } = useGetShopbyUserId(currentUser?._id)
  const { mutation, isLoadingUser } = useUpdateUserById(currentUser?._id)
  const { mutation: mutationCheckPass, isLoadingChedkPass } = useCheckedPassword()

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
  const [titlePass, setTitlePass] = useState('********')
  const [openInfo, setOpenInfo] = useState(false)
  const [userId, setUserId] = useState('')
  const [userTracking, setUserTracking] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [openPass, setOpenPass] = useState(false)
  const inputRef = useRef()
  const [checkHineChange, setCheckHineChange] = useState(false)

  //load form
  const [openForm, setOpenForm] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

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
      Password: password,
      OldPassword: oldPassword,
    })
  }, [userName, email, oldPassword, password, formInfo])

  const showDrawer = (name, address) => {
    setShopName(name)
    setShopAddress(address)
    setOpen(true)
  }

  const showDrawerInfo = (name, email) => {
    setUserId(currentUser?._id)
    setUserName(name)
    setEmail(email)
    setPassword(titlePass)
    setCheckHineChange(false)
    setOpenInfo(true)
    setOpenPass(false)

    setUserTracking({
      userName: name,
      email: email,
      password: titlePass,
    })
  }
  const showModalInfo = () => {
    inputRef.current.input.disabled = true
    inputRef.current.input.style.backgroundColor = '#d9d9d9'
    let userPrev = {
      userName,
      email,
      password,
    }
    const isChange = compareUser(userTracking, userPrev)
    if (isChange) {
      setOpenForm(true)
    } else {
      setOpenForm(false)
      setOpenInfo(false)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const handelUdateUser = async () => {
    let data = {
      _id: userId,
      username: userName,
      email: email,
      role: currentUser?.role,
    }
    if (password !== titlePass) {
      data = {
        ...data,
        password,
      }
    }
    mutation.mutate(data)
    dispatch(save_user(data))
    setOpenInfo(false)
  }
  const handelUdateShop = () => {}

  const handleChangePass = () => {
    if (password === titlePass) {
      setOpenPass(true)
      setCheckHineChange(true)
    }
    setOldPassword('')
  }

  const handleCheckPass = async (_id, password) => {
    const response = await mutationCheckPass.mutateAsync({ _id, password })
    const isPasswordValid = response.data
    if (isPasswordValid) {
      setOpenPass(false)
      inputRef.current.input.disabled = false
      inputRef.current.input.style.backgroundColor = 'white'
      inputRef.current.input.style.color = 'black'
      setPassword('')
    } else {
      setOpenPass(true)
    }
    setCheckHineChange(true)
  }

  const handleOk = () => {
    handelUdateUser()
    setConfirmLoading(true)
    setTimeout(() => {
      setOpenInfo(false)
      setOpenForm(false)
      setConfirmLoading(false)
    }, 1000)
  }

  const handleCancelForm = () => {
    setOpenForm(false)
    setOpenInfo(false)
  }

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
            // onClose={showModal}
            open={open}
            bodyStyle={{
              paddingBottom: 80,
            }}
            extra={
              <Space>
                <Button htmlType="submit" type="primary">
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
            <Row gutter={16} className="items-center">
              <Col xs={24} lg={21} className="lg:mb-3">
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
                  style={{ marginBottom: '3px' }}
                >
                  <Input
                    ref={inputRef}
                    className="mt-3"
                    placeholder="Nhập mật khẩu..."
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      backgroundColor: '#d9d9d9',
                      color: 'black',
                    }}
                    disabled
                  />
                </Form.Item>
              </Col>
              {!checkHineChange && (
                <>
                  <Col lg={3} className="mt-0">
                    <span
                      onClick={handleChangePass}
                      className="underline text-red-600 hover:text-blue-800 hover:decoration-blue-800 hover:cursor-pointer"
                    >
                      Thay đổi
                    </span>
                  </Col>
                </>
              )}
            </Row>
            {openPass && (
              <>
                <Row gutter={16} className="items-center mt-3 lg:mt-0">
                  <Col xs={24} lg={21} className="lg:mb-3">
                    <label>Mật khẩu cũ</label>
                    <Form.Item
                      name="OldPassword"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập mật khẩu cũ',
                        },
                      ]}
                      initialValue={oldPassword}
                      style={{ marginBottom: '3px' }}
                    >
                      <Input
                        className="mt-3"
                        placeholder="Nhập mật khẩu cũ..."
                        type="password"
                        onChange={(e) => setOldPassword(e.target.value)}
                        style={{ marginBottom: '3px' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={3}>
                    <span
                      onClick={() => handleCheckPass(currentUser?._id, oldPassword)}
                      className="mt-0 underline text-red-600 decoration-red-800 hover:text-blue-800 hover:decoration-blue-800 hover:cursor-pointer"
                    >
                      Xác nhận
                    </span>
                  </Col>
                </Row>
              </>
            )}
          </Drawer>
        </Form>

        <Row className="lg:w-8/12 bg-white" style={{ margin: 'auto' }}>
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
                  <label className="font-medium text-base text-left mr-4">Email</label>
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
                  <Input className="my-2" value={titlePass}></Input>
                </Col>
              </Row>
            </Form.Item>

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
                    <Col xs={5} lg={4}>
                      <label className="font-medium text-base text-left">Địa chỉ</label>
                    </Col>
                    <Col xs={19} lg={20} className="mr-2">
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

        <Row>
          <Modal
            open={openForm}
            cancelText="Thoát"
            onOk={handleOk}
            closable={false}
            confirmLoading={confirmLoading}
            onCancel={handleCancelForm}
          >
            <p className="font-medium text-base">
              Bạn có muốn lưu lại những thay đổi này ?
            </p>
          </Modal>
        </Row>
      </div>
    </>
  )
}

export default Profile
