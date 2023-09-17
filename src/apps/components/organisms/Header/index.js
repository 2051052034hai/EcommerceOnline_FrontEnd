// Libraries
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "antd";
import { useGetDataCategory } from "apps/queries/category";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";
import cookie from "react-cookies";
import { Dropdown, Space } from "antd";
//UserSlice
import { log_out } from "store/userSlice/userSlice";

//Antd
import { selectCurrentUser } from "store/userSlice/userSelector";
import { ROLE } from "apps/constants";
import { useGetShopbyUserId } from "apps/queries/shop/useGetShopbyUserId";
import { SearchStyle } from "./styled";

const { SubMenu } = Menu;

export default function Header() {
  const { data, isLoading } = useGetDataCategory();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuData, setMenuData] = useState([]);

  const navigate = useNavigate();
  //Redux
  const dispatch = useDispatch();
  const countCart = useSelector((state) => state.cart.count);
  const currentUser = useSelector(selectCurrentUser);
  const { data: shop } = useGetShopbyUserId(currentUser?._id);

  useEffect(() => {
    setMenuData(data);
  }, [isLoading]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const [current, setCurrent] = useState([]);

  const onClick = (e) => {
    setCurrent(e.key);
    setIsMobileMenuOpen(false);
  };

  const transformedData = data?.map((category) => {
    const subcategories = category.subcategories.map((subcategory) => ({
      label: subcategory.name,
      key: subcategory._id,
      link: subcategory._id,
    }));

    return {
      label: category.name,
      key: category._id,
      children: subcategories,
    };
  });

  //Log out
  const handleLogOut = () => {
    navigate("/");
    cookie.remove("access-token");
    cookie.remove("refresh_token");
    dispatch(log_out());
  };

  //
  function getItem(label, key, icon, children, type, to, onClick) {
    return {
      key,
      icon,
      children,
      label: to ? <Link to={to}>{label}</Link> : label,
      type,
      onClick,
    };
  }

  // Item current user
  const items = [
    {
      label: <Link to="/">Thông tin cá nhân</Link>,
      key: "0",
    },
    {
      label: <Link to="/purchase-history">Lịch sử mua hàng</Link>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <Link onClick={handleLogOut}>Đăng xuất</Link>,
      key: "3",
    },
  ];

  if (currentUser?.role === ROLE.SELLER && shop) {
    items.splice(1, 0, {
      label: <Link to="/sellerspage">Kênh bán hàng</Link>,
      key: "2",
    });
  }

  return (
    <header className="border-b border-slate-400">
      <nav
        className="mx-auto flex w-full items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:hidden md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="flex ">
          <Link to={"/"} className="-m-1.5 p-1.5">
            <img className="h-12 w-auto" src="/assets/image/logo.png" alt="" />
          </Link>
        </div>
        <div className="hidden md:flex lg:flex">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            style={{ minWidth: "580px" }}
          >
            {transformedData?.map((menu) => {
              return (
                <Menu.SubMenu key={menu.key} title={menu?.label}>
                  {menu?.children?.map((submenu) => (
                    <Menu.Item key={submenu.key}>
                      <Link to={`/productsub/${submenu?.link}`}>
                        {submenu?.label}
                      </Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              );
            })}
          </Menu>
        </div>

        <div className="flex justify-end flex-row">
          <div>
            <Link to="/searchpage">
              <SearchStyle>
                <SearchOutlined />
              </SearchStyle>
            </Link>
          </div>
          <div>
            <Link
              to={"/cart"}
              className="text-md relative font-semibold leading-6 mr-7 pl-2 text-gray-900"
            >
              <FontAwesomeIcon icon={faCartShopping} bounce />
              <p className="absolute -top-3 left-7 text-xs border border-black rounded-full px-1">
                {countCart}
              </p>
            </Link>
          </div>
          <div className="hidden lg:block md:hidden">
            {currentUser?.username ? (
              <div className=" w-36 text-center">
                <Dropdown
                  menu={{ items }}
                  trigger={["click"]}
                  placement="bottom"
                >
                  <Link onClick={(e) => e.preventDefault()}>
                    <Space>
                      <div style={{ marginTop: "-10px" }}>
                        <UserOutlined />
                      </div>
                    </Space>
                  </Link>
                </Dropdown>
              </div>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="text-sm font-semibold leading-6 text-gray-900"
                  style={{ paddingLeft: "20px" }}
                >
                  Log in <span aria-hidden="true">&rarr;</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to={"/"} className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <Menu onClick={onClick} selectedKeys={[current]} mode="inline">
                {transformedData?.map((menu) => {
                  return (
                    <Menu.SubMenu key={menu.key} title={menu?.label}>
                      {menu?.children?.map((submenu) => (
                        <Menu.Item key={submenu.key}>
                          <Link to={`/productsub/${submenu?.link}`}>
                            {submenu?.label}
                          </Link>
                        </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                  );
                })}
              </Menu>
              {currentUser?.username ? (
                <>
                  <Menu
                    mode="inline"
                    style={{
                      width: "100%",
                    }}
                    items={[
                      getItem(currentUser?.username, "sub1", <UserOutlined />, [
                        getItem(
                          "Thông tin cá nhân",
                          "1",
                          null,
                          null,
                          null,
                          "/"
                        ),
                        getItem(
                          "Lịch sử mua hàng",
                          "2",
                          null,
                          null,
                          null,
                          "/purchase-history"
                        ),
                        getItem(
                          "Đăng xuất",
                          "3",
                          null,
                          null,
                          null,
                          null,
                          handleLogOut
                        ),
                      ]),
                    ]}
                  />
                </>
              ) : (
                <>
                  <Link
                    to={"/login"}
                    className="text-sm font-semibold leading-6 text-gray-900"
                    style={{ paddingLeft: "27px" }}
                  >
                    Log in <span aria-hidden="true">&rarr;</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
