import { Input, Tooltip } from 'antd'

export const getItem = (label, key, icon, children, type, onClick) => {
  return {
    key,
    icon,
    children,
    label,
    type,
    onClick,
  }
}

//Input Number
const formatNumber = (value) => new Intl.NumberFormat().format(value)

export const NumericInput = (props) => {
  const { value, onChange, text } = props
  const handleChange = (e) => {
    const { value: inputValue } = e.target
    const reg = /^-?\d*(\.\d*)?$/
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange(+inputValue)
    }
  }

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value
    if (
      typeof value === 'string' &&
      (value.charAt(value.length - 1) === '.' || value === '-')
    ) {
      valueTemp = value.slice(0, -1)
      onChange(valueTemp.replace(/0*(\d+)/, '$1'))
    }
  }
  const title = value ? (
    <span className="numeric-input-title">
      {value !== '-' ? formatNumber(Number(value)) : '-'}
    </span>
  ) : (
    `${text}...`
  )
  return (
    <Tooltip
      trigger={['focus']}
      title={title}
      placement="topLeft"
      overlayClassName="numeric-input"
    >
      <Input
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={text + '...'}
        maxLength={16}
      />
    </Tooltip>
  )
}

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export const handleChangeTime = (timer) => {
  const originalDate = new Date(timer)

  const day = originalDate.getDate()
  const month = originalDate.getMonth() + 1
  const year = originalDate.getFullYear()

  const hours = originalDate.getHours()
  const minutes = originalDate.getMinutes()

  const dateString = `${day}/${month}/${year}`
  const timeString = `${hours}h ${minutes}phút`

  const formattedDateTime = `${dateString}  ${timeString}`

  return formattedDateTime
}

export const handleArrDataTable = (data) => {
  const dataTable = data?.reduce((result, items, orderIndex) => {
    let new_Time = handleChangeTime(items?.createdAt)
    let arrProducts = []

    items?.data.forEach((p, productIndex) => {
      if (p?.product?.price !== undefined) {
        arrProducts.push({
          key: `${orderIndex}-${productIndex}`,
          username: items.userId.email,
          id: p.product._id,
          productName: p.product.title,
          thumbnail: p.product.thumbnail,
          price: p.product.price,
          quantity: p.qty,
          createdAt: new_Time,
          status: p.statusPayment,
          orderId: items.orderId,
        })
      }
    })

    return result.concat(arrProducts)
  }, [])

  return dataTable
}

export const handleArrDataOrder = (data) => {
  let dataTable = data?.reduce((result, items) => {
    let new_Time = handleChangeTime(items?.createdAt)
    let arrProducts = []

    if (items?.data[0].product !== null) {
      arrProducts.push({
        orderId: items?.orderId,
        username: items?.userId.email,
        createdAt: new_Time,
        status: items?.data[0].statusPayment,
      })
    }

    return result.concat(arrProducts)
  }, [])

  return dataTable
}

export const handleArrProductByOrderId = (data, orderId) => {
  let dataTable = data?.reduce((result, items) => {
    let dataList = []

    items?.data.forEach((p) => {
      if (p?.product?.price !== undefined) {
        if (items.orderId === orderId)
          dataList.push({
            id: p.product._id,
            productName: p.product.title,
            thumbnail: p.product.thumbnail,
            price: p.product.price,
            quantity: p.qty,
          })
      }
    })
    return result.concat(dataList)
  }, [])
  return dataTable
}
