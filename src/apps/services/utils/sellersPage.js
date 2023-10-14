import { Input, Tooltip } from 'antd'
import ExcelJS from 'exceljs'

//SellersPage
import AddProduct from 'apps/modules/Dashboard/SellersPage/AddProduct'
import OrderList from 'apps/modules/Dashboard/SellersPage/OrderList'
import ProductList from 'apps/modules/Dashboard/SellersPage/ProductList'
import StatisticsPage from 'apps/modules/Dashboard/SellersPage/Statistics'

export const renderPage = (key) => {
  let content = null
  switch (key) {
    case '1':
      content = <ProductList />
      break
    case '2':
      content = <AddProduct />

      break
    case '5':
      content = <OrderList />

      break
    case '8':
      content = <StatisticsPage />

      break
    default:
      content = 'not found key'
  }

  return content
}

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

export const handlegetDayAt = (timer) => {
  const originalDate = new Date(timer)

  const day = originalDate.getDate()
  const month = originalDate.getMonth() + 1
  const year = originalDate.getFullYear()

  const dateString = `${day}/${month}/${year}`

  const formattedDateTime = `${dateString}`

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

export const handleArrDataOrder = (data, index) => {
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

  dataTable = dataTable?.map((item, i) => ({
    ...item,
    key: i,
  }))

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

export const filterExcelReport = (data, check) => {
  const { fromDate, toDate, email } = check
  let shouldFilterByEmail = true; 

  if (email.length === 0) {
    shouldFilterByEmail = false; 
  }
  const filteredData = data?.data.filter((item) => {
    let newcreatedAt = handlegetDayAt(item.createdAt)
    const parts = newcreatedAt.split('/')
    const newCreatedAtFormatted = `${parts[1]}/${parts[0]}/${parts[2]}`
    let emailMatch = true; 

    if (shouldFilterByEmail) {
      emailMatch = email.includes(item.userId.email);
    }

    return (
      new Date(newCreatedAtFormatted) >= new Date(fromDate) &&
      new Date(newCreatedAtFormatted) <= new Date(toDate) &&
      emailMatch
    )
  })

  return filteredData
}

export const generateExcelReport = (reportData, arrCheck) => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Report')

  // Đặt tiêu đề cho các cột
  worksheet.columns = [
    { header: 'Tình trạng đơn hàng', key: 'status', width: 20 },
    { header: 'Ngày đặt hàng', key: 'dateOrder', width: 20 },
    { header: 'Tên khách hàng', key: 'userId', width: 20 },
    { header: 'Tên sản phẩm', key: 'name', width: 100, height: 500 },
    { header: 'Giá bán', key: 'unitPrice', width: 15 },
    { header: 'Số Lượng', key: 'quantity', width: 10 },
  ]

  const resultFilterData = filterExcelReport(reportData, arrCheck)
  
  resultFilterData.forEach((item) => {
    let newcreatedAt = handlegetDayAt(item.createdAt)
    let status = item.data[0].statusPayment ? 'đã thanh toán' : 'chưa thanh toán'

    const row = {
      status: status,
      dateOrder: newcreatedAt,
      userId: item.userId.username,
    }

    row.name = item.data[0].product?.title
    row.unitPrice = item.data[0].product?.price
    row.quantity = item.data[0].qty

    for (let i = 1; i < item.data.length; i++) {
      if (item.data[i].product) {
        row.name += `\r\n${item.data[i].product?.title}`
        row.unitPrice += `\r\n${item.data[i].product?.price}`
        row.quantity += `\r\n${item.data[i].qty}`
      }
    }

    worksheet.addRow(row)
  })

  // Tải excel
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'BaoCaoThongKeDonHang.xlsx'
    a.click()
    URL.revokeObjectURL(url)
  })
}

export const handleGetFullEmail = (data) => {
  let arr = []
  let uniqueEmails = {}
  data?.data.forEach((item) => {
    const email = item.userId.email

    if (!uniqueEmails[email]) {
      arr.push({
        label: email,
        value: email,
      })

      uniqueEmails[email] = true
    }
  })

  return arr
}
