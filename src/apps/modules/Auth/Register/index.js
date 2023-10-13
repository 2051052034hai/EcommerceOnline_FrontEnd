// Libraries
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Spin } from 'antd'

//Queries
import { useRegisterUser } from 'apps/queries/auth/useRegister'
import { Helmet } from 'react-helmet'

const Register = () => {
  //useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [checkPassword, setcheckPassword] = useState(true)
  const { mutation, isLoading } = useRegisterUser()

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isSubmitting) {
      setIsSubmitting(true)
      handleSubmit(onSubmit)()
    }
  }

  const onSubmit = (data) => {
    if (data.password !== '' || data.confirmPassword !== '') {
      if (data.password !== data.confirmPassword) {
        setcheckPassword(false)
      } else {
        setcheckPassword(true)
        const { confirmPassword, ...other } = data
        mutation.mutate(other)
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Đăng ký</title>
      </Helmet>
      <main className="w-full h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-sm w-full text-gray-600 space-y-8">
          <div className="text-center">
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Đăng ký</h3>
              <p className="">
                Đã có tài khoản?
                <Link
                  to={'/login'}
                  className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                >
                  Đăng nhập
                </Link>
              </p>
            </div>
          </div>
          <div
            className={`bg-red-600 justify-center p-2 ${
              checkPassword ? 'hidden' : 'block'
            }`}
          >
            <h3 className="text-white text-center w-full">
              Mật khẩu nhập lại không chính xác
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="font-medium">Tên đăng nhập</label>
              <input
                {...register('username', {
                  required: 'Vui lòng nhập trường này',
                  maxLength: 50,
                })}
                type="text"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />

              {errors.username && (
                <p style={{ color: 'red', fontSize: 13 }}>{errors.username.message}</p>
              )}
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                {...register('email', {
                  required: 'Vui lòng nhập trường này',
                  maxLength: 50,

                  pattern: {
                    value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/,
                    message: 'Vui lòng nhập đúng địa chỉ email',
                  },
                })}
                type="email"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />

              {errors.email && (
                <p style={{ color: 'red', fontSize: 13 }}>{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="font-medium">Mật khẩu</label>
              <input
                {...register('password', {
                  required: 'Vui lòng nhập trường này',
                  maxLength: 50,
                  pattern: {
                    value:
                      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
                    message:
                      'Nhập bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 kỹ tự',
                  },
                })}
                type="password"
                onKeyPress={handleKeyPress}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.password && (
                <p style={{ color: 'red', fontSize: 13 }}>{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="font-medium">Nhập lại mật khẩu</label>
              <input
                {...register('confirmPassword', {
                  required: 'Vui lòng nhập trường này',
                  maxLength: 50,
                })}
                type="password"
                onKeyPress={handleKeyPress}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.confirmPassword && (
                <p style={{ color: 'red', fontSize: 13 }}>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 px-4 py-2 text-white font-medium bg-cyan-500 hover:bg-cyan-400 rounded-lg duration-150"
            >
              {isLoading ? <Spin /> : <span>Đăng ký</span>}
            </button>
          </form>
        </div>
      </main>
    </>
  )
}
export default Register
