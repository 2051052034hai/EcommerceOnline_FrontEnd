//libaries
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { Col, Divider, Row, Select } from "antd";

//Store
import { selectCurrentUser } from "store/userSlice/userSelector";

//Queries
import { useGetOrderByShop } from "apps/queries/order";
import { useGetShopbyUserId } from "apps/queries/shop/useGetShopbyUserId";
import { handleArrDataTable } from "apps/services/utils/sellersPage";

//Molecules
import LineChartConnect from "apps/components/molecules/LineChartConnect";

const StatisticsPage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { data: shop_data } = useGetShopbyUserId(currentUser?._id);
  const { data: new_data } = useGetOrderByShop(shop_data?._id);

  const currentDate = useMemo(() => new Date(), []);
  const currentMonth = currentDate.getMonth() + 1;

  const [orderData, setOrderData] = useState([]);
  const [monthAt, setMonthAt] = useState(currentMonth);

  useEffect(() => {
    setOrderData(new_data?.data);
  }, [new_data]);

  const dataTable = handleArrDataTable(orderData);

  //ChangeTime createdAt
  const changeTimeChart = (timer) => {
    const parts = timer.split(" ");

    const datePart = parts[0];

    const dateComponents = datePart.split("/");
    const day = dateComponents[0].padStart(2, "0");
    const month = dateComponents[1].padStart(2, "0");
    const year = dateComponents[2];

    const newDate = `${day}/${month}/${year}`;

    return newDate;
  };

  const handleChangeMonth = (value) => {
    console.log(value);
  };
  //Get month
  const handelGetMonth = (timer) => {
    const parts = timer.split("/");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    const date = new Date(year, month - 1, day);

    const monthNumber = date.getMonth() + 1;

    return monthNumber;
  };

  //Data chart
  const revenueByDate = {};
  // Duyệt qua mảng dataTable
  dataTable?.forEach((product) => {
    if (product.status) {
      let newCreateAt = changeTimeChart(product.createdAt);

      let getMonth = handelGetMonth(newCreateAt);

      console.log("getMonth:", getMonth);

      if (!revenueByDate[newCreateAt]) {
        revenueByDate[newCreateAt] = 0;
      }
      revenueByDate[newCreateAt] += product.price;
    }
  });

  // Tạo mảng data mới dựa trên revenueByDate
  const dataChart = Object.keys(revenueByDate).map((date) => {
    return {
      name: date,
      Total: revenueByDate[date],
    };
  });

  const optionShops = Array.from({ length: 12 }, (_, index) => ({
    value: index + 1,
    label: `Tháng ${index + 1}`,
    key: index + 1,
  }));

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

      <Row className="mb-3 ml-32">
        <Col lg={7}>
          <Select
            onChange={handleChangeMonth}
            value={monthAt}
            className="w-11/12"
            options={optionShops}
          />
        </Col>
      </Row>
      <LineChartConnect data={dataChart} />
    </>
  );
};

export default StatisticsPage;
