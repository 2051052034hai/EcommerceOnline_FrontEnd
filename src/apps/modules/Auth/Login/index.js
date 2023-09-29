// Libraries
import { getRedirectResult, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cookie from 'react-cookies'
import { useForm } from 'react-hook-form'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'

//Queries
import { useLoginUser } from 'apps/queries/auth/useLoginUser'
import { useCreateUser } from 'apps/queries/auth/useLoginOnlineUser'

//Molecules
import { auth, providerFb, providerGb } from 'apps/configs/Firebase'

//UserSlice
import { save_user } from 'store/userSlice/userSlice'
import { toast } from 'react-toastify'

const Login = () => {
  const { mutation: mutationRegister, checkEmail } = useCreateUser()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutation, isLoading } = useLoginUser()

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
        const access_token = user.stsTokenManager.accessToken
        const refresh_token = user.stsTokenManager.refreshToken
        const userEmail = user.email
        const userPassword = user.uid
        const username = user.displayName

        const data = {
          access_token,
          refresh_token,
          username,
          email: userEmail,
          password: userPassword,
        }

        if (data) {
          mutationRegister.mutate(data)
          if (checkEmail) {
            cookie.save('access-token', access_token)
            cookie.save('refresh_token', refresh_token)
            dispatch(save_user(data))
            toast.success('Đăng nhập thành công')
            navigate('/')
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleLoginFb = () => {
    signInWithPopup(auth, providerFb)
      .then((result) => {
        const user = result.user
        const access_token = user.stsTokenManager.accessToken
        const refresh_token = user.stsTokenManager.refreshToken
        const userEmail = user.email
        const userPassword = user.uid
        const username = user.displayName

        const data = {
          access_token,
          refresh_token,
          username,
          email: userEmail,
          password: userPassword,
        }

        if (data) {
          mutationRegister.mutate(data)
          if (checkEmail) {
            cookie.save('access-token', access_token)
            cookie.save('refresh_token', refresh_token)
            dispatch(save_user(data))
            toast.success('Đăng nhập thành công')
            navigate('/')
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-8">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Đăng nhập</h3>
            <p className="">
              Chưa có tài khoản?
              <Link
                to={'/'}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Đăng kí
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
            <label className="font-medium">Password</label>
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
            {isLoading ? <Spin /> : <span>Đăng nhập</span>}
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
          <button className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
            <svg
              className="w-5 h-5"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_910_21)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24.0005 1C18.303 1.00296 12.7923 3.02092 8.45374 6.69305C4.11521 10.3652 1.23181 15.452 0.319089 21.044C-0.593628 26.636 0.523853 32.3684 3.47174 37.2164C6.41963 42.0643 11.0057 45.7115 16.4099 47.5059C17.6021 47.7272 18.0512 46.9883 18.0512 46.36C18.0512 45.7317 18.0273 43.91 18.0194 41.9184C11.3428 43.3608 9.93197 39.101 9.93197 39.101C8.84305 36.3349 7.26927 35.6078 7.26927 35.6078C5.09143 34.1299 7.43223 34.1576 7.43223 34.1576C9.84455 34.3275 11.1123 36.6194 11.1123 36.6194C13.2504 40.2667 16.7278 39.2116 18.0949 38.5952C18.3095 37.0501 18.9335 35.999 19.621 35.4023C14.2877 34.8017 8.68408 32.7548 8.68408 23.6108C8.65102 21.2394 9.53605 18.9461 11.156 17.2054C10.9096 16.6047 10.087 14.1785 11.3905 10.8829C11.3905 10.8829 13.4054 10.2427 17.9916 13.3289C21.9253 12.2592 26.0757 12.2592 30.0095 13.3289C34.5917 10.2427 36.6026 10.8829 36.6026 10.8829C37.9101 14.1706 37.0875 16.5968 36.8411 17.2054C38.4662 18.9464 39.353 21.2437 39.317 23.6187C39.317 32.7824 33.7015 34.8017 28.3602 35.3905C29.2186 36.1334 29.9856 37.5836 29.9856 39.8122C29.9856 43.0051 29.9578 45.5736 29.9578 46.36C29.9578 46.9962 30.391 47.7391 31.6071 47.5059C37.0119 45.7113 41.5984 42.0634 44.5462 37.2147C47.4941 32.3659 48.611 26.6326 47.6972 21.0401C46.7835 15.4476 43.8986 10.3607 39.5587 6.68921C35.2187 3.01771 29.7067 1.00108 24.0085 1H24.0005Z"
                  fill="#191717"
                />
                <path
                  d="M9.08887 35.264C9.03721 35.3826 8.84645 35.4181 8.69146 35.3351C8.53646 35.2522 8.42122 35.098 8.47686 34.9755C8.5325 34.853 8.71928 34.8214 8.87428 34.9044C9.02927 34.9874 9.14848 35.1455 9.08887 35.264Z"
                  fill="#191717"
                />
                <path
                  d="M10.0626 36.3428C9.98028 36.384 9.88612 36.3955 9.79622 36.3753C9.70632 36.3551 9.62629 36.3045 9.56979 36.2321C9.41479 36.0662 9.38298 35.837 9.50221 35.7342C9.62143 35.6315 9.83606 35.6789 9.99105 35.8449C10.146 36.0108 10.1818 36.24 10.0626 36.3428Z"
                  fill="#191717"
                />
                <path
                  d="M11.0085 37.714C10.8614 37.8167 10.6111 37.714 10.472 37.5085C10.4335 37.4716 10.4029 37.4274 10.382 37.3785C10.3611 37.3297 10.3503 37.2771 10.3503 37.224C10.3503 37.1709 10.3611 37.1183 10.382 37.0694C10.4029 37.0205 10.4335 36.9763 10.472 36.9395C10.619 36.8407 10.8694 36.9395 11.0085 37.141C11.1476 37.3425 11.1516 37.6112 11.0085 37.714Z"
                  fill="#191717"
                />
                <path
                  d="M12.2921 39.0417C12.161 39.1879 11.8947 39.1484 11.6761 38.9508C11.4575 38.7532 11.4059 38.4845 11.537 38.3423C11.6682 38.2 11.9344 38.2395 12.161 38.4331C12.3875 38.6268 12.4312 38.8994 12.2921 39.0417Z"
                  fill="#191717"
                />
                <path
                  d="M14.0923 39.8162C14.0327 40.0019 13.7625 40.0849 13.4922 40.0059C13.222 39.9268 13.0432 39.7055 13.0948 39.5159C13.1465 39.3262 13.4207 39.2393 13.6949 39.3262C13.9691 39.4131 14.144 39.6226 14.0923 39.8162Z"
                  fill="#191717"
                />
                <path
                  d="M16.0557 39.9505C16.0557 40.1442 15.8331 40.3101 15.547 40.3141C15.2608 40.318 15.0264 40.16 15.0264 39.9663C15.0264 39.7727 15.2489 39.6067 15.535 39.6028C15.8212 39.5988 16.0557 39.753 16.0557 39.9505Z"
                  fill="#191717"
                />
                <path
                  d="M17.8838 39.6463C17.9196 39.8399 17.7208 40.0414 17.4347 40.0888C17.1486 40.1363 16.8982 40.0217 16.8624 39.832C16.8267 39.6423 17.0333 39.4368 17.3115 39.3855C17.5897 39.3341 17.848 39.4526 17.8838 39.6463Z"
                  fill="#191717"
                />
              </g>
              <defs>
                <clipPath id="clip0_910_21">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Continue with Github
          </button>
        </div>
        <div className="text-center">
          <Link to={'/'} className="text-indigo-600 hover:text-indigo-500">
            Forgot password?
          </Link>
        </div>
      </div>
    </main>
  )
}
export default Login
