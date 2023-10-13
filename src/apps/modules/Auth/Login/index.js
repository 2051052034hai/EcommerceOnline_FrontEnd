// Libraries
import { signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Spin } from 'antd'

//Queries
import { useLoginUser } from 'apps/queries/auth/useLoginUser'

//Molecules
import { auth, providerFb, providerGb } from 'apps/configs/Firebase'
import { useLoginSocial } from 'apps/queries/auth/useLoginSocial'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const Login = () => {
  //useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { t } = useTranslation()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutation, isLoading } = useLoginUser()
  const { mutation: mutationSocial } = useLoginSocial()

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isSubmitting) {
      setIsSubmitting(true)
      handleSubmit(onSubmit)()
    }
  }

  const onSubmit = (data) => {
    mutation.mutate(data)
  }

  const handleLoginGg = () => {
    signInWithPopup(auth, providerGb)
      .then((result) => {
        const user = result.user
        const userEmail = user.email
        const username = user.displayName

        const data = {
          username,
          email: userEmail,
        }

        if (data) {
          mutationSocial.mutate(data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleLoginFb = () => {
    signInWithPopup(auth, providerFb)
      .then(async (result) => {
        const user = result.user
        const userEmail = user.email
        const username = user.displayName

        const data = {
          username,
          email: userEmail,
        }

        if (data) {
          await mutationSocial.mutateAsync(data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <main className="w-full h-auto min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-sm w-full text-gray-600 space-y-8 mb-5">
          <div className="text-center">
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                {t('LOGIN.title')}
              </h3>
              <p className="">
                {t('LOGIN.no_account')}?
                <Link
                  to={'/register'}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {t('LOGIN.register')}
                </Link>
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="font-medium">Email</label>
              <input
                {...register('email', {
                  required: 'Vui lòng nhập trường này',
                  maxLength: 50,
                })}
                type="email"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />

              {errors.email && (
                <p style={{ color: 'red', fontSize: 13 }}>{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="font-medium">{t('LOGIN.password')}</label>
              <input
                {...register('password', {
                  required: 'Vui lòng nhập trường này',
                  maxLength: 50,
                })}
                type="password"
                onKeyPress={handleKeyPress}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.password && (
                <p style={{ color: 'red', fontSize: 13 }}>{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 px-4 py-2 text-white font-medium bg-cyan-500 hover:bg-cyan-400 rounded-lg duration-150"
            >
              {isLoading ? <Spin /> : <span>{t('HOME.login')}</span>}
            </button>
          </form>
          <div className="relative">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
              Or continue with
            </p>
          </div>
          <div className="space-y-4 text-sm font-medium">
            <button
              onClick={handleLoginGg}
              className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_17_40)">
                  <path
                    d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                    fill="#34A853"
                  />
                  <path
                    d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_17_40">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Continue with Google
            </button>
            <button
              onClick={handleLoginFb}
              className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
            >
              <svg
                className="w-7 h-7 ml-3"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
                <path
                  fill="#fff"
                  d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                ></path>
              </svg>
              Continue with Facebook
            </button>
          </div>
          <div className="text-center">
            <Link
              to={'/reset-password'}
              className="text-indigo-600 hover:text-indigo-500  "
            >
              Bạn quên mật khẩu?
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
export default Login
