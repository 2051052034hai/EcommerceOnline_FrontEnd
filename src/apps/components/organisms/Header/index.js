// Libraries
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "antd";
import { useGetDataCategory } from "apps/queries/category";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import cookie from "react-cookies";
//UserSlice
import { log_out } from "store/userSlice/userSlice";

//Antd
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const { SubMenu } = Menu;


export default function Header() {
  const { data, isLoading } = useGetDataCategory();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [menuData, setMenuData] = useState([]);

  //Redux
  const dispatch = useDispatch();
  const countCart = useSelector((state) => state.cart.count);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    setMenuData(data);
  }, [isLoading]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProductMenu = () => {
    setIsProductMenuOpen(!isProductMenuOpen);
  };

  const [current, setCurrent] = useState([]);

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
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
    cookie.remove("access-token")
    cookie.remove("refresh_token")
    dispatch(log_out());
    
  };

  // Item current user
  const items = [
    {
      label: <Link to="/">Thông tin cá nhân</Link>,
      key: "0",
    },
    {
      label: <Link to="/">Quản lí đơn hàng</Link>,
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

  return (
    <header className="border-b border-slate-400">
      <nav
        className="mx-auto flex w-full items-center justify-between p-4 	lg:px-8"
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
              console.log("menu", menu);
              return (
                <SubMenu key={menu.key} title={menu?.label}>
                  {menu?.children?.map((submenu) => (
                    <Menu.Item key={submenu.key}>
                      <Link to={submenu?.link}>{submenu?.label}</Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              );
            })}
          </Menu>
        </div>
        <div className=" lg:flex   lg:justify-end">
          <Link
            to={"/cart"}
            className="text-md relative font-semibold leading-6 mr-7 pl-2 text-gray-900"
          >
            <FontAwesomeIcon icon={faCartShopping} bounce />
            <p className="absolute -top-3 left-7 text-xs border border-black rounded-full px-1">
              {countCart}
            </p>
          </Link>

          {currentUser ? (
            <>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <Link onClick={(e) => e.preventDefault()}>
                  <Space>
                    <div className="lg:w-7 md:w-6 sm:w-5 w-5">
                      <img 
                        className="rounded-full"
                        src="/assets/image/avatar.jpg"
                        alt="ảnh không tồn tại"
                      ></img>
                    </div>
                    <div>{currentUser.username}!</div>
                    <DownOutlined />
                  </Space>
                </Link>
              </Dropdown>
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            </>
          )}
        </div>
      </nav>
      {/* <!-- Mobile menu, show/hide based on menu open state. --> */}
      {isMobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          {/* <!-- Background backdrop, show/hide based on slide-over state. --> */}
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
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <div className="-mx-3">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      aria-controls="disclosure-1"
                      aria-expanded="false"
                      onClick={toggleProductMenu}
                    >
                      Product
                      <svg
                        className="h-5 w-5 flex-none"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {isProductMenuOpen && (
                      <div className="mt-2 space-y-2" id="disclosure-1">
                        <Link
                          to={"/"}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Analytics
                        </Link>
                        <Link
                          to={"/"}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Engagement
                        </Link>
                        <Link
                          to={"/"}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Security
                        </Link>
                        <Link
                          to={"/"}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Integrations
                        </Link>
                        <Link
                          to={"/"}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Automations
                        </Link>
                        <Link
                          to={"/"}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Watch demo
                        </Link>
                        <Link
                          to={"/"}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Contact sales
                        </Link>
                      </div>
                    )}
                  </div>
                  <Link
                    to={"/"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Features
                  </Link>
                  <Link
                    to={"/"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Marketplace
                  </Link>
                  <Link
                    to={"/"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Company
                  </Link>
                </div>
                <div className="py-6">
                  <Link
                    to={"/"}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
