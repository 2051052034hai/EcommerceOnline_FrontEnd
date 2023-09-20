//libaries
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { Col, Divider, Row, Select, Statistic, Card } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

//Store
import { selectCurrentUser } from "store/userSlice/userSelector";

//Queries
import { useGetOrderByShop } from "apps/queries/order";
import { useGetShopbyUserId } from "apps/queries/shop/useGetShopbyUserId";
import {
  handelGetMonth,
  handleArrDataTable,
  handleRevenueByDate,
  handleRevenueByDay,
  handleRevenueByPrecious,
  handleRevenueByYear,
  optionInputSelectChart,
  sumTotalDay,
  sumTotalMonth,
  sumTotalPrecious,
} from "apps/services/utils/sellersPage";

//Molecules
import LineChartConnect from "apps/components/molecules/LineChartConnect";
import SameDataChart from "apps/components/molecules/SameDataChart";
import PieChartWith from "apps/components/molecules/pieChart";

const StatisticsPage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { data: shop_data } = useGetShopbyUserId(currentUser?._id);
  const { data: new_data, isLoading } = useGetOrderByShop(shop_data?._id);

  const currentDate = useMemo(() => new Date(), []);
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [orderData, setOrderData] = useState([]);
  const [monthAt, setMonthAt] = useState(currentMonth);
  const [yearAt, setYearAt] = useState(currentYear);
  const [yearPre, setYearPre] = useState(currentYear);

  useEffect(() => {
    setOrderData(new_data?.data);
  }, [new_data]);

  const dataTable = handleArrDataTable(orderData);

  //ChangeTime createdAt

  const handleChangeMonth = (value) => {
    setMonthAt(value);
  };

  const handleChangeYear = (value) => {
    setYearAt(value);
  };

  const handleChangeYearPre = (value) => {
    setYearPre(value)
  }

  const optionsMonth = optionInputSelectChart("Tháng", 12, 1);
  const optionsYear = optionInputSelectChart("Năm", 2025, 2020);

  if (dataTable) {
    var revenueByDay = handleRevenueByDay(dataTable, currentDay);
    var revenueByDate = handleRevenueByDate(dataTable, monthAt);
    var revenueByYear = handleRevenueByYear(dataTable, yearAt);
    var revenueByPrecious = handleRevenueByPrecious(dataTable, yearPre);

    //Total day
    if (revenueByDay) {
    var totalDay = sumTotalDay(revenueByDay);
  }

    //Line Chart
    var dataChart = Object.keys(revenueByDate).map((date) => {
      if (revenueByDate) {
        return {
          name: date,
          Total: revenueByDate[date],
        };
      }
    });
  }

  //Same Chart
  var sameChart = {};
  if (revenueByYear) {
    if (Object.keys(revenueByYear).length !== 0) {
      sameChart = Array.from({ length: 12 }, (_, index) => {
        let TotalMonth = sumTotalMonth(revenueByYear, index + 1);
        return {
          name: `Tháng ${index + 1}`,
          Total: TotalMonth,
          key: index + 1,
        };
      });
    } else {
      sameChart = [];
    }
  }

//Pie Chart
  var dataPiechart = {};
  if (revenueByPrecious) {
    if (Object.keys(revenueByPrecious).length !== 0) {
      dataPiechart = Array.from({ length: 4 }, (_, index) => {
        let TotalMonth = sumTotalPrecious(revenueByPrecious, index + 1);
        return {
          name: `Quý ${index + 1}`,
          Total: TotalMonth,
          key: index + 1,
        };
      });
    } else {
      dataPiechart = [];
    }
  }

  return (
    <>
      <Divider
        style={{
          fontSize: "24px",
          color: "#31a9e0",
          textTransform: "uppercase",
        }}
      >
        Thống Kê
      </Divider>

      <Divider
        orientation="left"
        style={{
          fontSize: "15px",
          color: "black",
          textTransform: "uppercase",
        }}
      >
        Doanh thu hôm nay
      </Divider>

      <Row gutter={16} className="px-5">
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Số Lượt Mua"
              value={11.28}
              precision={2}
              valueStyle={{
                color: "#3f8600",
              }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Đơn Huỷ"
              value={9.3}
              precision={2}
              valueStyle={{
                color: "#cf1322",
              }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Doanh Thu"
              value={totalDay}
              precision={0}
              valueStyle={{
                color: "#3f8600",
              }}
              prefix={<ArrowUpOutlined />}
              suffix="VNĐ"
            />
          </Card>
        </Col>
      </Row>

      <Divider
        orientation="left"
        style={{
          fontSize: "15px",
          color: "black",
          textTransform: "uppercase",
        }}
      >
        Doanh thu theo tháng
      </Divider>

      <Row className="my-3 ml-16">
        <Col lg={10}>
          <Select
            onChange={handleChangeMonth}
            value={monthAt}
            className="w-11/12"
            options={optionsMonth}
          />
        </Col>
      </Row>
      <LineChartConnect data={dataChart} loading={isLoading} />

      <Divider
        orientation="left"
        style={{
          fontSize: "15px",
          color: "black",
          textTransform: "uppercase",
        }}
      >
        Doanh thu theo quý
      </Divider>

      <Row className="my-3 ml-16">
        <Col lg={10}>
          <Select
            onChange={handleChangeYearPre}
            value={yearPre}
            className="w-11/12"
            options={optionsYear}
          />
        </Col>
      </Row>

      <PieChartWith data={dataPiechart} loading = {isLoading} />

      <Divider
        orientation="left"
        style={{
          fontSize: "15px",
          color: "black",
          textTransform: "uppercase",
        }}
      >
        Doanh thu theo năm
      </Divider>

      <Row className="my-3 ml-16">
        <Col lg={10}>
          <Select
            onChange={handleChangeYear}
            value={yearAt}
            className="w-11/12"
            options={optionsYear}
          />
        </Col>
      </Row>
      <SameDataChart data={sameChart} loading={isLoading} />
    </>
  );
};

export default StatisticsPage;
