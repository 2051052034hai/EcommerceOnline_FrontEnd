// Libraries
import React, { useState } from 'react'
import { Button, Col, message, Steps, Row, Divider, Statistic } from 'antd'
import { useForm } from 'react-hook-form'

//Queries
import { useResetPassword } from 'apps/queries/auth/userResetPassword'
import { useResendMail } from 'apps/queries/auth/useSendMail'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const { Countdown } = Statistic

const ResetPassword = () => {
  const [current, setCurrent] = useState(0)
  const [email, setEmail] = useState('')
  const [keyEmail, setKeyEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [checkSendMail, setCheckSendMail] = useState(false)
  const [timer, setTimer] = useState(0)
  const [checkPassword, setcheckPassword] = useState(true)

  const { mutation } = useResetPassword()
  const { mutation: mutateSendMail, isLoading } = useResendMail()

  const otp = useSelector((state) => state?.user?.otp)

  //useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm()

  const {
    register: register3,
    handleSubmit: handleSubmit3,
    formState: { errors: errors3 },
  } = useForm()

  const onSubmit = () => {
    if (email) {
      setCurrent(current + 1)
      setTimer(Date.now() + 1 * 60 * 1000)
      mutateSendMail.mutate({ email: email })
    }
  }
  const onSubmit1 = () => {
    if (keyEmail) {
      if (otp) {
        if (keyEmail == otp) {
          setCurrent(current + 1)
        } else {
          toast.error('Bạn đã nhập sai mã OTP')
        }
      }

      // if (keyEmail == '543211') {
      //   setCurrent(current + 1)
      // } else {
      //   toast.error('Bạn đã nhập sai mã OTP')
      // }
    }
  }

  const onSubmit2 = () => {
    if (password === confirmPassword) {
      setcheckPassword(true)
      let user = {
        email: email,
        newPassword: password,
      }
      mutation.mutate(user)
    } else {
      setcheckPassword(false)
    }
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const onChange = (val) => {
    if (typeof val === 'number' && val <= 0) {
      setCheckSendMail(true)
    }
  }

  const steps = [
    {
      title: 'Bước 1',
      content: (
        <div className="p-5 items-center ">
          <div className="w-3/6" style={{ margin: 'auto' }}>
            <label className="font-normal text-base">
              Email <span className="text-red-600">*</span>
            </label>
            <form>
              <input
                {...register('email', {
                  required: 'Vui lòng nhập trường này',
                  maxLength: 50,
                  pattern: {
                    value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/,
                    message: 'Vui lòng nhập đúng địa chỉ email',
                  },
                })}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full mt-2 lock px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                placeholder="Nhập email..."
              />
              {errors.email && (
                <p style={{ color: 'red', fontSize: 13 }}>{errors.email.message}</p>
              )}
              <Button
                type="primary"
                className="absolute left-0 bottom-0"
                onClick={handleSubmit(onSubmit)}
              >
                Tiếp tục
              </Button>
            </form>
          </div>
        </div>
      ),
    },
    {
      title: 'Bước 2',
      content: (
        <div className="p-5 items-center ">
          <div className="w-3/6" style={{ margin: 'auto' }}>
            <label className="font-normal text-base">
              Nhập mã xác thực <span className="text-red-600">*</span>
            </label>
            <form>
              <input
                {...register2('keyMail', {
                  required: 'Vui lòng nhập trường này',
                  pattern: {
                    value: /^[a-zA-Z0-9]{6}$/,
                    message: 'Vui lòng nhập đúng 6 ký tự',
                  },
                })}
                value={keyEmail}
                onChange={(e) => setKeyEmail(e.target.value)}
                type="text"
                className="w-full mt-2 lock px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                placeholder="Nhập mã xác thực gồm 6 chữ số..."
              />
              {errors2.keyMail && (
                <p style={{ color: 'red', fontSize: 13 }}>{errors2.keyMail.message}</p>
              )}
              <Button
                type="primary"
                onClick={handleSubmit2(onSubmit1)}
                className="absolute left-24 bottom-0"
              >
                Tiếp tục
              </Button>
            </form>
          </div>
          <div className="ml-64 flex alice-center mt-3">
            {!checkSendMail ? (
              <>
                <div className="mr-3 text-base ">
                  <span>Mã xác thực sẽ hết hạn sau: </span>
                </div>
                <div>
                  <Countdown value={timer} onChange={onChange} />
                </div>
              </>
            ) : (
              <>
                <div className="ml-48 text-base">
                  <Button>Gửi lại mã</Button>
                </div>
              </>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Bước 3',
      content: (
        <div className="p-5 items-center">
          <div
            className={`bg-red-600 justify-center rounded p-2 mb-3 w-3/6 ml-44 ${
              checkPassword ? 'hidden' : 'block'
            }`}
          >
            <h3 className="text-white text-center w-full">
              Mật khẩu nhập lại không chính xác
            </h3>
          </div>
          <form>
            <div className="w-3/6 mt-2" style={{ margin: 'auto' }}>
              <label className="font-normal text-base">
                Mật khẩu <span className="text-red-600">*</span>
              </label>

              <input
                {...register3('password', {
                  required: 'Vui lòng nhập trường này',
                  maxLength: 50,
                  pattern: {
                    value:
                      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
                    message:
                      'Nhập bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 kỹ tự',
                  },
                })}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full mt-2 lock px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                placeholder="Nhập mật khẩu..."
              />
              {errors3.password && (
                <p style={{ color: 'red', fontSize: 13 }}>{errors3.password.message}</p>
              )}
            </div>
            <div className="w-3/6 pt-3" style={{ margin: 'auto' }}>
              <label className="font-normal text-base">
                Nhập lại mật khẩu <span className="text-red-600">*</span>
              </label>
              <input
                {...register3('confirmPassword', {
                  required: 'Vui lòng nhập trường này',
                  maxLength: 50,
                })}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                className="w-full mt-2 lock px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                placeholder="Nhập lại mật khẩu..."
              />
              {errors3.confirmPassword && (
                <p style={{ color: 'red', fontSize: 13 }}>
                  {errors3.confirmPassword.message}
                </p>
              )}
            </div>
            <Button
              type="primary"
              className="absolute left-0 bottom-0"
              onClick={handleSubmit3(onSubmit2)}
            >
              Hoàn thành
            </Button>
          </form>
        </div>
      ),
    },
  ]

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }))
  const contentStyle = {
    marginTop: 16,
  }

  return (
    <>
      <Divider
        style={{
          fontSize: '24px',
          color: '#31a9e0',
          textTransform: 'uppercase',
        }}
      >
        Đặt lại mật khẩu
      </Divider>
      <Row className="justify-center p-5 m-5">
        <Col lg={14}>
          <Steps current={current} items={items} />
          <div style={contentStyle}>{steps[current].content}</div>
          <div
            style={{
              marginTop: 24,
            }}
          >
            {current > 0 && current < 2 && (
              <Button
                style={{
                  margin: '0 8px',
                }}
                onClick={() => prev()}
              >
                Quay lại
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </>
  )
}

export default ResetPassword
