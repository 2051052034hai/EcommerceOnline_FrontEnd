import { Input, Tooltip } from "antd";

export const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

//Input Number
const formatNumber = (value) => new Intl.NumberFormat().format(value);

export const NumericInput = (props) => {
  const { value, onChange, text } = props;
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      onChange(+inputValue);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value;
    if (
      typeof value === "string" &&
      (value.charAt(value.length - 1) === "." || value === "-")
    ) {
      valueTemp = value.slice(0, -1);
      onChange(valueTemp.replace(/0*(\d+)/, "$1"));
    }
  };
  const title = value ? (
    <span className="numeric-input-title">
      {value !== "-" ? formatNumber(Number(value)) : "-"}
    </span>
  ) : (
    `${text}...`
  );
  return (
    <Tooltip
      trigger={["focus"]}
      title={title}
      placement="topLeft"
      overlayClassName="numeric-input"
    >
      <Input
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={text + "..."}
        maxLength={16}
      />
    </Tooltip>
  );
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const handleChangeTime = (timer) => {
  const originalDate = new Date(timer);

  const day = originalDate.getDate();
  const month = originalDate.getMonth() + 1;
  const year = originalDate.getFullYear();

  const hours = originalDate.getHours();
  const minutes = originalDate.getMinutes();

  const dateString = `${day}/${month}/${year}`;
  const timeString = `${hours}h ${minutes}phút`;

  const formattedDateTime = `${dateString}  ${timeString}`;

  return formattedDateTime;
};

export const handleArrDataTable = (data) => {
  const dataTable = data?.reduce((result, items, orderIndex) => {
    let new_Time = handleChangeTime(items?.createdAt);
    let arrProducts = [];

    items?.data.forEach((p, productIndex) => {
      arrProducts.push({
        key: `${orderIndex}-${productIndex}`,
        username: items?.userId?.email,
        id: p.product._id,
        productName: p.product.title,
        thumbnail: p.product.thumbnail,
        price: p.product.price,
        quantity: p.qty,
        createdAt: new_Time,
        status: p.statusPayment,
      });
    });

    return result.concat(arrProducts);
  }, []);

  return dataTable;
};

export const optionInputSelectChart = (text, length, number) => {
  let arr = Array.from({ length: length - number + 1 }, (_, index) => ({
    value: number + index,
    label: `${text} ${number + index}`,
    key: number + index,
  }));

  return arr;
};

//Get day
export const handelGetDay = (timer) => {
  const parts = timer.split("/");
  const day = parseInt(parts[0], 10);
  return day;
};

//Get month
export const handelGetMonth = (timer) => {
  const parts = timer.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  const date = new Date(year, month - 1, day);

  const monthNumber = date.getMonth() + 1;

  return monthNumber;
};

//Get year
export const handelGetYear = (timer) => {
  const parts = timer.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  return year;
};

//Get total month
export const sumTotalMonth = (data, month) => {
  let sum = 0;
  Object.keys(data).map((date) => {
    let getMonth = handelGetMonth(date);
    if (month === getMonth) {
      sum += data[date];
    }
  });
  return sum;
};

export const sumTotalDay = (data) => {
  let sum = 0;
  Object.keys(data).map((date) => {
    sum += data[date];
  });
  return sum;
};

//Get total precious
export const sumTotalPrecious = (data, precious) => {
  let sum = 0;
  for (let i = 1; i <= 4; i++) {
    if (precious === i) {
      for (let month = (i - 1) * 3 + 1; month <= i * 3; month++) {
        sum += sumTotalMonth(data, month);
      }
      break; // Thoát khỏi vòng lặp khi đã tính tổng xong
    }
  }
  return sum;
};

//ChangeTimeChart
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

// RevenueByDate
export const handleRevenueByDate = (data, month) => {
  let revenueByDate = {};
  data?.forEach((product) => {
    if (product.status) {
      let newCreateAt = changeTimeChart(product.createdAt);
      let getMonth = handelGetMonth(newCreateAt);

      if (getMonth === month) {
        if (!revenueByDate[newCreateAt]) {
          revenueByDate[newCreateAt] = 0;
        }
        revenueByDate[newCreateAt] += product.price;
      }
    }
  });

  return revenueByDate;
};

export const handleRevenueByDay = (data, day) => {
  let revenueByDay = {};
  data?.forEach((product) => {
    if (product.status) {
      let newCreateAt = changeTimeChart(product.createdAt);
      let getday = handelGetDay(newCreateAt);

      if (getday === day) {
        if (!revenueByDay[newCreateAt]) {
          revenueByDay[newCreateAt] = 0;
        }
        revenueByDay[newCreateAt] += product.price;
      }
    }
  });

  return revenueByDay;
};

export const handleRevenueByYear = (data, year) => {
  let revenueByYear = {};
  data?.forEach((product) => {
    if (product.status) {
      let newCreateAt = changeTimeChart(product.createdAt);
      let getYear = handelGetYear(newCreateAt);

      if (year === getYear) {
        if (!revenueByYear[newCreateAt]) {
          revenueByYear[newCreateAt] = 0;
        }
        revenueByYear[newCreateAt] += product.price;
      }
    }
  });

  return revenueByYear;
};

export const handleRevenueByPrecious = (data, year) => {
  let revenueByYear = {};
  data?.forEach((product) => {
    if (product.status) {
      let newCreateAt = changeTimeChart(product.createdAt);
      let getYear = handelGetYear(newCreateAt);

      if (year === getYear) {
        if (!revenueByYear[newCreateAt]) {
          revenueByYear[newCreateAt] = 0;
        }
        revenueByYear[newCreateAt] += product.price;
      }
    }
  });

  return revenueByYear;
};
