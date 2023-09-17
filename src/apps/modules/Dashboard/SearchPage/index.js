import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Select,
  Divider,
  Pagination,
  Result,
  Skeleton,
  Button,
} from "antd";
import Search from "antd/es/input/Search";

import CardItem from "apps/components/molecules/CardItem";
import { useGetDataProductPage } from "apps/queries/product";
import { useGetSubCategories } from "apps/queries/subcategory";
import { useGetAllShops } from "apps/queries/shop";

const SearchPage = () => {
  const [productSubId, setProductSubId] = useState();
  const [shopId, setShopId] = useState();
  const [subData, setSubdata] = useState([]);
  const [products, setProduct] = useState([]);
  const [shopsData, setShopsData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [keyWord, setKeyWord] = useState();
  const [valueSeach, setValueSeach] = useState("");
  const [productLoading, setProductLoading] = useState(true);
  const [subName, setSubName] = useState("Loại sản phẩm");
  const [shopName, setShopName] = useState("Cửa hàng");
  const [isDeleteteFilter, setIsDeleteteFilter] = useState(true);

  const { data: subcateData, isLoading: subLoading } = useGetSubCategories();
  const { data: shopData, isLoading: shopLoading } = useGetAllShops();
  const { data, isLoading } = useGetDataProductPage(
    page,
    pageSize,
    keyWord,
    productSubId,
    shopId
  );

  useEffect(() => {
    if (data) {
      setTotal(data?.total);
      setProduct(data?.data);
      setProductLoading(false);
    }
  }, [data, isLoading]);

  useEffect(() => {
    setSubdata(subcateData);
  }, [subcateData, subLoading]);

  useEffect(() => {
    setShopsData(shopData);
  }, [shopData, shopLoading]);

  const options = subData?.map((item, index) => {
    return {
      value: index,
      label: item?.name,
      key: item?._id,
    };
  });

  const optionShops = shopsData?.map((item, index) => {
    return {
      value: index,
      label: item?.name,
      key: item?._id,
    };
  });

  const handleProductSubChange = (value, item) => {
    setSubName(value);
    setProductSubId(item.key);
    setProductLoading(true);
    setIsDeleteteFilter(true);
    setPage(1);
  };

  const handleShopChange = (value, item) => {
    setShopName(value);
    setShopId(item.key);
    setIsDeleteteFilter(true);
    setProductLoading(true);
    setPage(1);
  };

  const handleOnchangePage = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const handleClickSearch = () => {
    setProductLoading(true);
    setKeyWord(valueSeach);
    setValueSeach("");
  };

  const handleValueChange = (e) => {
    const { value } = e.target;
    setValueSeach(value);
    setIsDeleteteFilter(true);
  };

  const handleDeleteFilter = () => {
    setValueSeach("");
    setSubName("Loại sản phẩm");
    setShopName("Cửa hàng");
    setIsDeleteteFilter(false);
    setPage(1);
    setProductSubId();
    setShopId();
    setValueSeach("");
    setKeyWord();
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
        Tìm kiếm sản phẩm
      </Divider>

      <Row className="p-5 items-center w-full justify-center">
        <Col lg={5} className="justify-center">
          <Search
            className="w-11/12"
            placeholder="Nhập tên sản phẩm"
            onChange={handleValueChange}
            value={valueSeach}
            enterButton
            onSearch={handleClickSearch}
          />
        </Col>
        <Col lg={5} className="justify-center">
          <Select
            onChange={handleProductSubChange}
            showSearch
            className="w-11/12"
            placeholder="Tìm kiếm theo loại"
            value={subName}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label?.toLowerCase() ?? "").includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label?.toLowerCase() ?? "").localeCompare(
                optionB?.label?.toLowerCase()
              )
            }
            loading={subLoading}
            options={options}
          />
        </Col>

        <Col lg={5} className="justify-center">
          <Select
            onChange={handleShopChange}
            showSearch
            value={shopName}
            className="w-11/12"
            placeholder="Tìm kiếm theo cửa hàng"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label?.toLowerCase() ?? "").includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label?.toLowerCase() ?? "").localeCompare(
                optionB?.label?.toLowerCase()
              )
            }
            loading={shopLoading}
            options={optionShops}
          />
        </Col>

        {(productSubId || shopId || valueSeach) && isDeleteteFilter ? (
          <>
            <Col lg={5} className="justify-center">
              <Button
                htmlType="text"
                type="primary"
                onClick={handleDeleteFilter}
              >
                Xoá bộ lọc
              </Button>
            </Col>
          </>
        ) : null}
      </Row>

      <Divider
        style={{ fontSize: "20px", fontWeight: "bold" }}
        orientation="left"
      >
        Kết quả
      </Divider>

      <div className="grid gap-5 py-4 px-2 md:px-1 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mx-14">
        {productLoading ? (
          <div style={{ width: "100%" }}>
            <Skeleton
              active
              paragraph={{
                rows: 10,
                width: "1200px",
              }}
            />
          </div>
        ) : (
          products?.length !== 0 &&
          products.map((item, index) => <CardItem key={index} product={item} />)
        )}
      </div>

      {products?.length === 0 && !productLoading && (
        <div className="flex justify-center items-center w-full">
          <Result status="404" title="Không có sản phẩm phù hợp với bạn" />
        </div>
      )}

      <div className="flex justify-center py-12">
        <Pagination
          className="text-base"
          onChange={handleOnchangePage}
          defaultCurrent={1}
          total={total}
          current={page}
          pageSize={10}
        />
      </div>
    </>
  );
};

export default SearchPage;
