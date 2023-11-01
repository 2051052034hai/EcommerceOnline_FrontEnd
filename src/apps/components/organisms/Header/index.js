// Libraries
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu, Select } from 'antd'
import { useGetDataCategory } from 'apps/queries/category'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import cookie from 'react-cookies'
import { Dropdown, Space } from 'antd'
//UserSlice
import { log_out } from 'store/userSlice/userSlice'

//Antd
import { selectCurrentUser } from 'store/userSlice/userSelector'
import { ROLE } from 'apps/constants'
import { useGetShopbyUserId } from 'apps/queries/shop/useGetShopbyUserId'
import { SearchStyle } from './styled'
import { useTranslation } from 'react-i18next'
import { value } from 'apps/modules/Cart/styledCart'

export default function Header() {
  // Translations
  const { t, i18n, ready } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  const { data, isLoading } = useGetDataCategory()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [menuData, setMenuData] = useState([])

  const navigate = useNavigate()
  //Redux
  const dispatch = useDispatch()
  const listCart = useSelector((state) => state?.cart?.products)

  const currentUser = useSelector(selectCurrentUser)
  const { data: shop } = useGetShopbyUserId(currentUser?._id)

  useEffect(() => {
    setMenuData(data)
  }, [isLoading])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const [current, setCurrent] = useState([])

  const onClick = (e) => {
    setCurrent(e.key)
    setIsMobileMenuOpen(false)
  }

  const transformedData = [
    {
      label: t('HOME.men_fashion'),
      key: '64ea08f80aa5dbf9b67df09f',
      children: [
        {
          label: 'Áo Khoác',
          key: '64ea0a5a0aa5dbf9b67df0a9',
          link: '64ea0a5a0aa5dbf9b67df0a9',
        },
        {
          label: 'Áo Vest và Blazer',
          key: '64ea0a850aa5dbf9b67df0ad',
          link: '64ea0a850aa5dbf9b67df0ad',
        },
        {
          label: 'Áo Hoodie, Áo Len & Áo Nỉ',
          key: '64ea0aae0aa5dbf9b67df0b1',
          link: '64ea0aae0aa5dbf9b67df0b1',
        },
        {
          label: 'Quần Jeans',
          key: '64ea0abe0aa5dbf9b67df0b5',
          link: '64ea0abe0aa5dbf9b67df0b5',
        },
        {
          label: 'Quần Dài/ Quần Âu',
          key: '64ea0ace0aa5dbf9b67df0b9',
          link: '64ea0ace0aa5dbf9b67df0b9',
        },
      ],
    },
    {
      label: t('HOME.women_fashion'),
      key: '64ea09370aa5dbf9b67df0a1',
      children: [
        {
          label: 'Chân váy',
          key: '64ea0b0d0aa5dbf9b67df0bd',
          link: '64ea0b0d0aa5dbf9b67df0bd',
        },
        {
          label: 'Quần jeans',
          key: '64ea0b1e0aa5dbf9b67df0c1',
          link: '64ea0b1e0aa5dbf9b67df0c1',
        },
        {
          label: 'Đầm/Váy',
          key: '64ea0b280aa5dbf9b67df0c5',
          link: '64ea0b280aa5dbf9b67df0c5',
        },
        {
          label: 'Váy cưới',
          key: '64ea0b390aa5dbf9b67df0c9',
          link: '64ea0b390aa5dbf9b67df0c9',
        },
        {
          label: 'Áo len & Cardigan',
          key: '64ea0b500aa5dbf9b67df0cd',
          link: '64ea0b500aa5dbf9b67df0cd',
        },
      ],
    },
    {
      label: t('HOME.electronic_device'),
      key: '64ea095a0aa5dbf9b67df0a3',
      children: [
        {
          label: 'Thiết bị đeo thông minh',
          key: '64ea0b7b0aa5dbf9b67df0d1',
          link: '64ea0b7b0aa5dbf9b67df0d1',
        },
        {
          label: 'Phụ kiện tivi',
          key: '64ea0b840aa5dbf9b67df0d5',
          link: '64ea0b840aa5dbf9b67df0d5',
        },
        {
          label: 'Máy Game Console',
          key: '64ea0b930aa5dbf9b67df0d9',
          link: '64ea0b930aa5dbf9b67df0d9',
        },
        {
          label: 'Tai nghe',
          key: '64ea0baa0aa5dbf9b67df0dd',
          link: '64ea0baa0aa5dbf9b67df0dd',
        },
        {
          label: 'Loa',
          key: '64ea0bbb0aa5dbf9b67df0e1',
          link: '64ea0bbb0aa5dbf9b67df0e1',
        },
      ],
    },
    {
      label: t('HOME.beauty'),
      key: '64ea097e0aa5dbf9b67df0a5',
      children: [
        {
          label: 'Chăm sóc da mặt',
          key: '64ea0be10aa5dbf9b67df0e5',
          link: '64ea0be10aa5dbf9b67df0e5',
        },
        {
          label: 'Trang điểm',
          key: '64ea0beb0aa5dbf9b67df0e9',
          link: '64ea0beb0aa5dbf9b67df0e9',
        },
        {
          label: 'Chăm sóc tóc',
          key: '64ea0bf20aa5dbf9b67df0ed',
          link: '64ea0bf20aa5dbf9b67df0ed',
        },
        {
          label: 'Dụng cụ & Phụ kiện làm đẹp',
          key: '64ea0bff0aa5dbf9b67df0f1',
          link: '64ea0bff0aa5dbf9b67df0f1',
        },
        {
          label: 'Nước hoa',
          key: '64ea0c090aa5dbf9b67df0f5',
          link: '64ea0c090aa5dbf9b67df0f5',
        },
      ],
    },
    {
      label: t('HOME.women_purse'),
      key: '64ea09860aa5dbf9b67df0a7',
      children: [
        {
          label: 'Ba Lô Nữ',
          key: '64ea0c330aa5dbf9b67df0f9',
          link: '64ea0c330aa5dbf9b67df0f9',
        },
        {
          label: 'Ví Dự Tiệc & Ví Cầm Tay',
          key: '64ea0c4e0aa5dbf9b67df0fd',
          link: '64ea0c4e0aa5dbf9b67df0fd',
        },
        {
          label: 'Túi Đeo Ngực',
          key: '64ea0c640aa5dbf9b67df101',
          link: '64ea0c640aa5dbf9b67df101',
        },
        {
          label: 'Túi Tote',
          key: '64ea0c6e0aa5dbf9b67df105',
          link: '64ea0c6e0aa5dbf9b67df105',
        },
        {
          label: 'Phụ Kiện Túi',
          key: '64ea0c840aa5dbf9b67df109',
          link: '64ea0c840aa5dbf9b67df109',
        },
      ],
    },
  ]

  //Log out
  const handleLogOut = () => {
    cookie.remove('access-token')
    cookie.remove('refresh_token')
    dispatch(log_out())
    navigate('/')
    window.location.href = '/'
  }

  //
  function getItem(label, key, icon, children, type, to, onClick) {
    return {
      key,
      icon,
      children,
      label: to ? <Link to={to}>{label}</Link> : label,
      type,
      onClick,
    }
  }

  // Item current user
  const items = [
    {
      label: <Link to="/profile">Thông tin cá nhân</Link>,
      key: '0',
    },
    {
      label: <Link to="/purchase-history">Lịch sử mua hàng</Link>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: <Link onClick={handleLogOut}>Đăng xuất</Link>,
      key: '3',
    },
  ]

  const menuItems = [
    getItem(currentUser?.username, 'sub1', <UserOutlined />, [
      getItem('Thông tin cá nhân', '1', null, null, null, '/'),
      getItem('Lịch sử mua hàng', '2', null, null, null, '/purchase-history'),
      getItem('Đăng xuất', '3', null, null, null, null, handleLogOut),
    ]),
  ]

  if (currentUser?.role === ROLE.SELLER && shop) {
    items.splice(1, 0, {
      label: <Link to="/sellerspage">Kênh bán hàng</Link>,
      key: '2',
    })

    const newItem = getItem('Kênh bán hàng', '4', null, null, null, '/sellerspage')
    menuItems[0].children?.splice(1, 0, newItem)
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
          <Link to={'/'} className="-m-1.5 p-1.5">
            <img className="h-12 w-auto" src="https://i.ibb.co/42jSVG0/logo.png" alt="" />
          </Link>
        </div>
        {currentUser?.role === ROLE.USER && (
          <Link to={'/register-seller'}>Đăng kí bán hàng</Link>
        )}

        <div className="hidden md:flex lg:flex">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            style={{ minWidth: '620px' }}
          >
            {transformedData?.map((menu) => {
              return (
                <Menu.SubMenu key={menu.key} title={menu?.label}>
                  {menu?.children?.map((submenu) => (
                    <Menu.Item key={submenu.key}>
                      <Link to={`/productsub/${submenu?.link}`}>{submenu?.label}</Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              )
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
              to={'/cart'}
              className="text-md relative font-semibold leading-6 mr-7 pl-2 text-gray-900"
            >
              <FontAwesomeIcon icon={faCartShopping} bounce />
              <p className="absolute -top-3 left-7 text-xs border border-black rounded-full px-1">
                {listCart?.length}
              </p>
            </Link>
          </div>
          <div className="hidden lg:block md:hidden">
            {currentUser?.username ? (
              <div className="text-center">
                <Select
                  defaultValue="vi"
                  style={{ width: 60 }}
                  onChange={changeLanguage}
                  options={['en', 'vi'].map((lang) => ({ label: lang, value: lang }))}
                />
                <Dropdown menu={{ items }} trigger={['click']} placement="bottom">
                  <Link onClick={(e) => e.preventDefault()}>
                    <Space>
                      <div style={{ marginTop: '-10px', paddingLeft: '10px' }}>
                        <UserOutlined />
                      </div>
                    </Space>
                  </Link>
                </Dropdown>
              </div>
            ) : (
              <>
                <Select
                  defaultValue="vi"
                  style={{ width: 60 }}
                  onChange={changeLanguage}
                  options={['en', 'vi'].map((lang) => ({ label: lang, value: lang }))}
                />
                <Link
                  to={'/login'}
                  className="text-sm font-semibold leading-6 text-gray-900"
                  style={{ paddingLeft: '20px' }}
                >
                  {t('HOME.login')} <span aria-hidden="true">&rarr;</span>
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
              <Link to={'/'} className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://i.ibb.co/42jSVG0/logo.png"
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
                  )
                })}
              </Menu>
              {currentUser?.username ? (
                <>
                  <Menu
                    mode="inline"
                    style={{
                      width: '100%',
                    }}
                    items={menuItems}
                  />
                </>
              ) : (
                <>
                  <Link
                    to={'/login'}
                    className="text-sm font-semibold leading-6 text-gray-900"
                    style={{ paddingLeft: '27px' }}
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
  )
}
