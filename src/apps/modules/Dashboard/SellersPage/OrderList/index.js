//libaries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Divider, Popconfirm, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//Queries
import { useGetOrderByShop } from "apps/queries/order";
import { useGetShopbyUserId } from "apps/queries/shop/useGetShopbyUserId";

//Utils
import { handleChangeTime } from "apps/services/utils/sellersPage";

//Store
import { selectCurrentUser } from "store/userSlice/userSelector";

const OrderList = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [orderData, setOrderData] = useState([]);
  const [total, setTotal] = useState();
  const [pageSize, setPageSize] = useState(5);

  const { data: shop_data } = useGetShopbyUserId(currentUser?._id);

  const { data: new_data, isLoading } = useGetOrderByShop(shop_data?._id);

  useEffect(() => {
    setOrderData(new_data?.data);
    setTotal(new_data?.total);
  }, [new_data]);

  //Load data
  const columns = [
    {
      title: "",
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: 400,
      render: (link, record) => {
        return (
          <Link to={`/product/${record.id}`}>
            <img className="lg:w-20 w-16 m-auto" alt="not found" src={link} />
          </Link>
        );
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
      width: 600,
      render: (text) => <h3 className="text-justify font-medium">{text}</h3>,
    },

    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
      render: (text) => (
        <h3 className="font-medium">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(text)}
        </h3>
      ),
    },

    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 150,
      render: (text) => <h3 className="font-medium text-center">{text}</h3>,
    },

    {
      title: "Người Mua",
      dataIndex: "username",
      key: "username",
      width: 300,
      render: (text) => <h3 className="font-medium text-blue-800">{text}</h3>,
    },

    {
      title: "Ngày Mua",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (text) => <h3 className="font-medium ">{text}</h3>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 300,
      render: (_, record) => {
        let color = record?.status ? "green" : "volcano";
        let title = record?.status ? "đã thanh toán" : "chưa thanh toán";
        return (
          <>
            {!record?.status && (
              <Popconfirm
                title="Chuyển đơn hàng sang đã thanh toán?"
                // onConfirm={() => handleDelete(record.key)}
              >
                <span>
                  <FontAwesomeIcon
                    icon={faPen}
                    style={{ color: "#1b61da", cursor: "pointer" }}
                  />
                </span>
              </Popconfirm>
            )}

            <Tag className="font-medium ml-3" color={color}>
              {title.toUpperCase()}
            </Tag>
          </>
        );
      },
    },
  ];

  const dataTable = orderData?.reduce((result, items, orderIndex) => {
    let new_Time = handleChangeTime(items?.createdAt);
    let arrProducts = [];

    items?.data.forEach((p, productIndex) => {
      arrProducts.push({
        key: `${orderIndex}-${productIndex}`,
        username: items?.userId?.username,
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

  //Pagination
  const paginationConfig = {
    pageSize: pageSize,
    total: total,
    showSizeChanger: true,
    position: ["bottomCenter"],
    onChange: (_, pageSize) => {
      setPageSize(pageSize);
    },
  };

  return (
    <>
      <Divider
        style={{
          fontSize: "24px",
          color: "#31a9e0",
          textTransform: "uppercase",
        }}
      >
        Đơn Hàng
      </Divider>
      <Table
        columns={columns}
        dataSource={dataTable}
        pagination={paginationConfig}
        loading={isLoading}
      />
    </>
  );
};

export default OrderList;
