// Libraries
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Spin } from 'antd'

//Queries
import { useSelector } from 'react-redux'
import { selectCurrentUser } from 'store/userSlice/userSelector'
import { useCreateShop } from 'apps/queries/shop/useCreateShop'

//Molecules

const RegisterSeller = () => {
  const currentUser = useSelector(selectCurrentUser)
  const { mutation, isLoading } = useCreateShop()

  //useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isSubmitting) {
      setIsSubmitting(true)
      handleSubmit(onSubmit)()
    }
  }

  const onSubmit = (data) => {
    const shop = {
      name: data.name,
      address: data.address,
      userId: currentUser?._id,
    }
    mutation.mutate(shop)
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-8">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Đăng Kí Bán Hàng
            </h3>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="font-medium">Tên Shop của bạn</label>
            <input
              {...register('name', {
                required: 'Vui lòng nhập trường này',
                maxLength: 100,
              })}
              type="text"
              onKeyPress={handleKeyPress}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
            {errors.name && (
              <p style={{ color: 'red', fontSize: 13 }}>{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="font-medium"> Địa chỉ</label>
            <input
              {...register('address', {
                required: 'Vui lòng nhập trường này',
                maxLength: 100,
              })}
              type="text"
              onKeyPress={handleKeyPress}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
            {errors.address && (
              <p style={{ color: 'red', fontSize: 13 }}>{errors.address.message}</p>
            )}
          </div>
          <button
            type="submit"
            // disabled={isLoading}
            className="w-full mt-4 px-4 py-2 text-white font-medium bg-cyan-500 hover:bg-cyan-400 rounded-lg duration-150"
          >
            {isLoading ? <Spin /> : <span>Đăng ký</span>}
          </button>
        </form>
      </div>
    </main>
  )
}
export default RegisterSeller
