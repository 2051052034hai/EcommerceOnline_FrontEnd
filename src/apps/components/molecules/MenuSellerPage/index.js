import { Menu } from 'antd'
import { useState } from 'react'

const MenuSellerPage = ({ data , onClick }) => {
  
  const [openKeys, setOpenKeys] = useState(['sub1'])
  const rootSubmenuKeys = ['sub1', 'sub2']
  

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
    
  }


  return (
    <>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        defaultOpenKeys={['sub1', 'sub2']}
        style={{
          width: 256,
          height: '100vh',
        }}
        items={data}
        onClick={onClick}
      />
    </>
  )
}

export default MenuSellerPage
