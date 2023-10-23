//libaries
import { useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { Col, Divider, Row, Select, Statistic, Card } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'

//Store
import { selectCurrentUser } from 'store/userSlice/userSelector'

//Queries
import { useGetOrderByShop } from 'apps/queries/order'
import { useGetShopbyUserId } from 'apps/queries/shop/useGetShopbyUserId'

//Molecules
import LineChartConnect from 'apps/components/molecules/Chart/LineChartConnect'
import SameDataChart from 'apps/components/molecules/Chart/SameDataChart'
import PieChartWith from 'apps/components/molecules/Chart/pieChart'
import CustomContentOfTooltip from 'apps/components/molecules/Chart/CustomContentOfTooltip'

//services/utils
import {
  handleRevenueByMonth,
  handleRevenueByDay,
  handleRevenueByPrecious,
  handleRevenueByYear,
  optionInputSelectChart,
  findTop3BuyersMonth,
  findTop3BuyersYear,
  findTop3BuyersPrecious,
  handleCountDataOrder,
  handleRevenueByProviderYear,
  handleRevenueByProviderMonth,
  handleRevenueByProviderPrecious,
} from 'apps/services/utils/chart'
import { handleArrDataTable } from 'apps/services/utils/sellersPage'
import { Helmet } from 'react-helmet'

const StatisticsPage = () => {
  const currentUser = useSelector(selectCurrentUser)
  const { data: shop_data } = useGetShopbyUserId(currentUser?._id)
  const { data: new_data, isLoading } = useGetOrderByShop(shop_data?._id)

  const currentDate = useMemo(() => new Date(), [])
  const currentDay = currentDate.getDate()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  const [orderData, setOrderData] = useState([])
  const [monthAt, setMonthAt] = useState(currentMonth)
  const [yearAt, setYearAt] = useState(currentYear)
  const [yearPre, setYearPre] = useState(currentYear)
  const [titleUser, setTitleUser] = useState('Theo Tháng')
  const [dataOptionsUserTop, setDataOptionsUserTop] = useState([])
  const [dataOptionsProvider, setDataOptionsProvider] = useState([])

  const optionsMonth = optionInputSelectChart('Tháng', 12, 1)
  const optionsYear = optionInputSelectChart('Năm', 2025, 2020)
  const dataTable = handleArrDataTable(orderData)
  const titleTopUser = [
    {
      key: 1,
      value: 'Theo tháng',
    },
    {
      key: 2,
      value: 'Theo quý',
    },
    {
      key: 3,
      value: 'Theo năm',
    },
  ]

  useEffect(() => {
    setOrderData(new_data?.data)
  }, [new_data])

  const handleChangeMonth = (value) => {
    setMonthAt(value)
  }

  const handleChangeYear = (value) => {
    setYearAt(value)
  }

  const handleChangeYearPre = (value) => {
    setYearPre(value)
  }

  const handleChangeTitleTopUser = (value, data) => {
    setTitleUser(value)

    switch (data.key) {
      case 1:
        setDataOptionsUserTop(topBuyersMonth)
        break
      case 2:
        setDataOptionsUserTop(top3BuyersPrecious)
        break
      case 3:
        setDataOptionsUserTop(topBuyersYear)
        break
      default:
        return 'not found case'
    }
  }
  const handleChangeTitleProvider = (value, data) => {
    setTitleUser(value)

    switch (data.key) {
      case 1:
        setDataOptionsProvider(revenueByProviderMonth)
        break
      case 2:
        setDataOptionsProvider(revenueByProviderPrecious)
        break
      case 3:
        setDataOptionsProvider(revenueByProviderYear)
        break
      default:
        return 'not found case'
    }
  }

  if (dataTable) {
    var countDataOrder = handleCountDataOrder(dataTable, currentDay)
    var revenueByDay = handleRevenueByDay(dataTable, currentDay)
    var revenueByMonth = handleRevenueByMonth(dataTable, monthAt)
    var revenueByYear = handleRevenueByYear(dataTable, yearAt)
    var revenueByPrecious = handleRevenueByPrecious(dataTable, yearPre)
    var topBuyersMonth = findTop3BuyersMonth(dataTable, monthAt)
    var topBuyersYear = findTop3BuyersYear(dataTable, yearAt)
    var top3BuyersPrecious = findTop3BuyersPrecious(dataTable, Math.ceil(monthAt / 3))
    var revenueByProviderYear = handleRevenueByProviderYear(dataTable, yearAt)
    var revenueByProviderMonth = handleRevenueByProviderMonth(dataTable, monthAt)
    var revenueByProviderPrecious = handleRevenueByProviderPrecious(
      dataTable,
      Math.ceil(monthAt / 3),
    )
  }

  return (
    <>
      <Helmet>
        <title>Bán hàng | Thống kê</title>
      </Helmet>
      <div className="overflow-x-hidden">
        <Divider
          style={{
            fontSize: '24px',
            color: '#31a9e0',
            textTransform: 'uppercase',
          }}
        >
          Thống Kê
        </Divider>
        <Divider
          orientation="left"
          style={{
            fontSize: '15px',
            color: 'black',
            textTransform: 'uppercase',
          }}
        >
          Doanh thu hôm nay
        </Divider>
        <Row gutter={16} className="px-5">
          <Col lg={8} className="mt-3 lg:mt-0 w-1/3">
            <Card bordered={false}>
              <Statistic
                title="Số Lượt Mua"
                value={countDataOrder}
                precision={0}
                valueStyle={{
                  color: '#3f8600',
                  fontSize: '15px',
                }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>

          <Col lg={8} className="mt-3 lg:mt-0 w-1/3">
            <Card bordered={false}>
              <Statistic
                title="Đơn Huỷ"
                value={0}
                precision={0}
                valueStyle={{
                  color: '#cf1322',
                }}
                prefix={<ArrowDownOutlined />}
              />
            </Card>
          </Col>

          <Col lg={8} className="mt-3 lg:mt-0 w-1/3">
            <Card bordered={false}>
              <Statistic
                title="Doanh Thu"
                value={revenueByDay}
                precision={0}
                valueStyle={{
                  color: '#3f8600',
                  fontSize: '15px',
                }}
                prefix={<ArrowUpOutlined />}
                suffix="VNĐ"
              />
            </Card>
          </Col>
        </Row>

        <Row className="w-full ">
          <Col lg={12} xs={24}>
            <Divider
              orientation="center"
              style={{
                fontSize: '15px',
                color: 'black',
                textTransform: 'uppercase',
              }}
            >
              Doanh thu theo tháng
            </Divider>
            <Row className="my-3 ml-16 w-full">
              <Col lg={10} xs={24}>
                <Select
                  onChange={handleChangeMonth}
                  value={monthAt}
                  className="lg:w-11/12 w-2/3"
                  options={optionsMonth}
                />
              </Col>
            </Row>
            <LineChartConnect data={revenueByMonth} loading={isLoading} />
          </Col>

          <Col lg={12} xs={24}>
            <Divider
              orientation="center"
              style={{
                fontSize: '15px',
                color: 'black',
                textTransform: 'uppercase',
              }}
            >
              Doanh thu theo quý
            </Divider>

            <Row className="my-3 ml-16 w-full">
              <Col lg={10} xs={24}>
                <Select
                  onChange={handleChangeYearPre}
                  value={yearPre}
                  className="lg:w-11/12 w-2/3"
                  options={optionsYear}
                />
              </Col>
            </Row>

            <PieChartWith data={revenueByPrecious} loading={isLoading} />
          </Col>
        </Row>

        <Row>
          <Col lg={12} xs={24}>
            <Divider
              orientation="center"
              style={{
                fontSize: '15px',
                color: 'black',
                textTransform: 'uppercase',
              }}
            >
              Doanh thu theo năm
            </Divider>

            <Row className="my-3 ml-16 w-full">
              <Col lg={10} xs={24}>
                <Select
                  onChange={handleChangeYear}
                  value={yearAt}
                  className="w-11/12 w-2/3"
                  options={optionsYear}
                />
              </Col>
            </Row>
            <SameDataChart data={revenueByYear} loading={isLoading} />
          </Col>
          <Col lg={12} xs={24}>
            <Divider
              orientation="center"
              style={{
                fontSize: '15px',
                color: 'black',
                textTransform: 'uppercase',
              }}
            >
              Top người mua hàng
            </Divider>
            <Row className="my-3 ml-16 w-full">
              <Col lg={10} xs={24}>
                <Select
                  onChange={handleChangeTitleTopUser}
                  value={titleUser}
                  className="w-11/12 w-2/3"
                  options={titleTopUser}
                />
              </Col>
            </Row>
            {dataOptionsUserTop.length > 0 ? (
              <CustomContentOfTooltip data={dataOptionsUserTop} loading={isLoading} />
            ) : (
              <CustomContentOfTooltip data={topBuyersMonth} loading={isLoading} />
            )}
          </Col>
        </Row>
        <Row>
          <Col lg={12} xs={24}>
            <Divider
              orientation="center"
              style={{
                fontSize: '15px',
                color: 'black',
                textTransform: 'uppercase',
              }}
            >
              Doanh thu theo phương thức thanh toán
            </Divider>

            <Row className="my-3 ml-16 w-full">
              <Col lg={10} xs={24}>
                <Select
                  onChange={handleChangeTitleProvider}
                  value={titleUser}
                  className="w-11/12 w-2/3"
                  options={titleTopUser}
                />
              </Col>
            </Row>
            {dataOptionsProvider.length > 0 ? (
              <PieChartWith data={dataOptionsProvider} loading={isLoading} />
            ) : (
              <PieChartWith data={revenueByProviderMonth} loading={isLoading} />
            )}
          </Col>
        </Row>
      </div>
    </>
  )
}

export default StatisticsPage
