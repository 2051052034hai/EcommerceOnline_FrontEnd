//options select chart
export const optionInputSelectChart = (text, length, number) => {
  let arr = Array.from({ length: length - number + 1 }, (_, index) => ({
    value: number + index,
    label: `${text} ${number + index}`,
    key: number + index,
  }))

  return arr
}

//Get day
export const handelGetDay = (timer) => {
  const parts = timer.split('/')
  const day = parseInt(parts[0], 10)
  return day
}

//Get month
export const handelGetMonth = (timer) => {
  const parts = timer.split('/')
  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10)
  const year = parseInt(parts[2], 10)

  const date = new Date(year, month - 1, day)
  const monthNumber = date.getMonth() + 1

  return monthNumber
}

//Get year
export const handelGetYear = (timer) => {
  const parts = timer.split('/')
  const year = parseInt(parts[2], 10)

  return year
}

//Total month
export const sumTotalMonth = (data, month) => {
  let sum = 0
  Object.keys(data).forEach((date) => {
    let getMonth = handelGetMonth(date)
    if (month === getMonth) {
      sum += data[date]
    }
  })
  return sum
}

//Total day
export const sumTotalDay = (data) => {
  let sum = 0
  Object.keys(data).forEach((date) => {
    sum += data[date]
  })
  return sum
}

//Total precious
export const sumTotalPrecious = (data, precious) => {
  let sum = 0
  for (let i = 1; i <= 4; i++) {
    if (precious === i) {
      for (let month = (i - 1) * 3 + 1; month <= i * 3; month++) {
        sum += sumTotalMonth(data, month)
      }
      break // Thoát khỏi vòng lặp khi đã tính tổng xong
    }
  }
  return sum
}

//Change Time
const changeTimeChart = (timer) => {
  const parts = timer.split(' ')

  const datePart = parts[0]

  const dateComponents = datePart.split('/')
  const day = dateComponents[0].padStart(2, '0')
  const month = dateComponents[1].padStart(2, '0')
  const year = dateComponents[2]

  const newDate = `${day}/${month}/${year}`

  return newDate
}

export const handleRevenueByDay = (data, day) => {
  let revenueByDay = {}
  data?.forEach((product) => {
    if (product.status) {
      let newCreateAt = changeTimeChart(product.createdAt)
      let getday = handelGetDay(newCreateAt)

      if (getday === day) {
        if (!revenueByDay[newCreateAt]) {
          revenueByDay[newCreateAt] = 0
        }
        revenueByDay[newCreateAt] += product.price * product.quantity
      }
    }
  })
  let totalDay = sumTotalDay(revenueByDay)
  return totalDay
}

export const handleRevenueByYear = (data, year) => {
  let revenueByYear = {}
  data?.forEach((product) => {
    if (product.status) {
      let newCreateAt = changeTimeChart(product.createdAt)
      let getYear = handelGetYear(newCreateAt)

      if (year === getYear) {
        if (!revenueByYear[newCreateAt]) {
          revenueByYear[newCreateAt] = 0
        }
        revenueByYear[newCreateAt] += product.price * product.quantity
      }
    }
  })

  let sameChart = {}
  if (Object.keys(revenueByYear).length !== 0) {
    sameChart = Array.from({ length: 12 }, (_, index) => {
      let TotalMonth = sumTotalMonth(revenueByYear, index + 1)
      return {
        name: `Tháng ${index + 1}`,
        Total: TotalMonth,
        key: index + 1,
      }
    })
  } else {
    sameChart = []
  }

  return sameChart
}

export const handleRevenueByPrecious = (data, year) => {
  let revenueByPrecious = {}
  data?.forEach((product) => {
    if (product.status) {
      let newCreateAt = changeTimeChart(product.createdAt)
      let getYear = handelGetYear(newCreateAt)

      if (year === getYear) {
        if (!revenueByPrecious[newCreateAt]) {
          revenueByPrecious[newCreateAt] = 0
        }
        revenueByPrecious[newCreateAt] += product.price * product.quantity
      }
    }
  })

  let dataPiechart = {}

  if (Object.keys(revenueByPrecious).length !== 0) {
    dataPiechart = Array.from({ length: 4 }, (_, index) => {
      let TotalMonth = sumTotalPrecious(revenueByPrecious, index + 1)
      return {
        name: `Quý ${index + 1}`,
        Total: TotalMonth,
        key: index + 1,
      }
    })
  } else {
    dataPiechart = []
  }

  return dataPiechart
}

export const handleRevenueByMonth = (data, month) => {
  let revenueByMonth = {}
  data?.forEach((product) => {
    if (product.price !== undefined) {
      if (product.status) {
        let newCreateAt = changeTimeChart(product.createdAt)
        let getMonth = handelGetMonth(newCreateAt)

        if (getMonth === month) {
          if (!revenueByMonth[newCreateAt]) {
            revenueByMonth[newCreateAt] = 0
          }

          revenueByMonth[newCreateAt] += product.price * product.quantity
        }
      }
    }
  })

  let totalMonth = Object.keys(revenueByMonth).map((date) => {
    return {
      name: date,
      Total: revenueByMonth[date],
    }
  })

  return totalMonth
}

export const findTop3BuyersMonth = (data, month) => {
  const buyerCounts = {}

  data.forEach((item) => {
    if (item.price !== undefined) {
      if (item.status) {
        let newCreateAt = changeTimeChart(item.createdAt)
        let getMonth = handelGetMonth(newCreateAt)

        if (getMonth === month) {
          const username = item.username
          if (buyerCounts[username]) {
            buyerCounts[username] += item.price * item.quantity
          } else {
            buyerCounts[username] = item.price * item.quantity
          }
        }
      }
    }
  })

  const buyerCountsArray = Object.entries(buyerCounts)

  buyerCountsArray.sort((a, b) => b[1] - a[1])

  const top3Buyers = buyerCountsArray.slice(0, 3)
  let result = top3Buyers.map((user) => {
    return {
      name: user[0],
      uv: user[1],
    }
  })
  return result
}

export const findTop3BuyersYear = (data, year) => {
  const buyerCounts = {}

  data.forEach((item) => {
    if (item.price !== undefined) {
      if (item.status) {
        let newCreateAt = changeTimeChart(item.createdAt)
        let getYear = handelGetYear(newCreateAt)
        if (getYear === year) {
          const username = item.username
          if (buyerCounts[username]) {
            buyerCounts[username] += item.price * item.quantity
          } else {
            buyerCounts[username] = item.price * item.quantity
          }
        }
      }
    }
  })

  const buyerCountsArray = Object.entries(buyerCounts)

  buyerCountsArray.sort((a, b) => b[1] - a[1])

  const top3Buyers = buyerCountsArray.slice(0, 3)
  let result = top3Buyers.map((user) => {
    return {
      name: user[0],
      uv: user[1],
    }
  })
  return result
}

export const findTop3BuyersPrecious = (data, precious) => {
  const buyerCounts = {}

  data.forEach((item) => {
    if (item.price !== undefined) {
      if (item.status) {
        let newCreateAt = changeTimeChart(item.createdAt)
        let getMonth = handelGetMonth(newCreateAt)
        if (Math.ceil(getMonth / 3) === precious) {
          const username = item.username
          if (buyerCounts[username]) {
            buyerCounts[username] += item.price * item.quantity
          } else {
            buyerCounts[username] = item.price * item.quantity
          }
        }
      }
    }
  })

  const buyerCountsArray = Object.entries(buyerCounts)

  buyerCountsArray.sort((a, b) => b[1] - a[1])

  const top3Buyers = buyerCountsArray.slice(0, 3)
  let result = top3Buyers.map((user) => {
    return {
      name: user[0],
      uv: user[1],
    }
  })
  return result
}

export const handleCountDataOrder = (data, dayAt) => {
  let sum = 0
  data?.forEach((item) => {
    let newCreateAt = changeTimeChart(item.createdAt)

    let getday = handelGetDay(newCreateAt)
    if (dayAt === getday) {
      sum += 1
    }
  })
  return sum
}

export const handleCountDataOrderCandle = (data, dayAt) => {
  let sum = 0
  data?.forEach((item) => {
    let newCreateAt = changeTimeChart(item.createdAt)
    let getday = handelGetDay(newCreateAt)

    if (dayAt === getday) {
      sum += 1
    }
  })
  return sum
}

export const getTitleForProvider = (providerValue) => {
  switch (providerValue) {
    case 0:
      return 'Tại nhà'
    case 1:
      return 'PayPal'
    case 2:
      return 'VNPAY'
    default:
      return 'Unknown Provider'
  }
}

export const handleRevenueByProviderYear = (data, year) => {
  let revenueByPrecious = {
    name: [],
  }

  data?.forEach((product) => {
    if (product.status) {
      let newCreateAt = changeTimeChart(product.createdAt)
      let getYear = handelGetYear(newCreateAt)
      if (getYear === year) {
        let providerTitle = product.provider

        for (let i = 0; i < 3; i++) {
          revenueByPrecious.name.push(getTitleForProvider(i))
        }

        if (!revenueByPrecious[providerTitle]) {
          revenueByPrecious.name.push(getTitleForProvider(providerTitle))
          revenueByPrecious[providerTitle] = 0
        }
        revenueByPrecious[providerTitle] += product.price * product.quantity
      }
    }
  })

  let dataPiechart = {}
  if (Object.keys(revenueByPrecious).length !== 0) {
    dataPiechart = Array.from({ length: 3 }, (_, index) => {
      return {
        name: revenueByPrecious.name[index],
        Total: revenueByPrecious[index],
        key: index + 1,
      }
    })
  } else {
    dataPiechart = []
  }
  return dataPiechart
}

export const handleRevenueByProviderPrecious = (data, precious) => {
  let revenueByPrecious = {
    name: [],
  }

  data?.forEach((product) => {
    if (product.status) {
      let newCreateAt = changeTimeChart(product.createdAt)
      let getMonth = handelGetMonth(newCreateAt)
      if (Math.ceil(getMonth / 3) === precious) {
        let providerTitle = product.provider

        for (let i = 0; i < 3; i++) {
          revenueByPrecious.name.push(getTitleForProvider(i))
        }

        if (!revenueByPrecious[providerTitle]) {
          revenueByPrecious.name.push(getTitleForProvider(providerTitle))
          revenueByPrecious[providerTitle] = 0
        }
        revenueByPrecious[providerTitle] += product.price * product.quantity
      }
    }
  })

  let dataPiechart = {}
  if (Object.keys(revenueByPrecious).length !== 0) {
    dataPiechart = Array.from({ length: 3 }, (_, index) => {
      return {
        name: revenueByPrecious.name[index],
        Total: revenueByPrecious[index],
        key: index + 1,
      }
    })
  } else {
    dataPiechart = []
  }
  return dataPiechart
}

export const handleRevenueByProviderMonth = (data, month) => {
  let revenueByPrecious = {
    name: [],
  }

  data?.forEach((product) => {
    if (product.status) {
      let newCreateAt = changeTimeChart(product.createdAt)
      let getMonth = handelGetMonth(newCreateAt)
      if (getMonth === month) {
        let providerTitle = product.provider

        for (let i = 0; i < 3; i++) {
          revenueByPrecious.name.push(getTitleForProvider(i))
        }

        if (!revenueByPrecious[providerTitle]) {
          revenueByPrecious[providerTitle] = 0
        }
        revenueByPrecious[providerTitle] += product.price * product.quantity
      }
    }
  })

  let dataPiechart = {}
  if (Object.keys(revenueByPrecious).length !== 0) {
    dataPiechart = Array.from({ length: 3 }, (_, index) => {
      return {
        name: revenueByPrecious.name[index],
        Total: revenueByPrecious[index],
        key: index + 1,
      }
    })
  } else {
    dataPiechart = []
  }

  return dataPiechart
}
