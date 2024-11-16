import React from 'react'
import Guest from '@/hook/guest'

const Layout = ({children}) => {
  return (
    <Guest>
        {children}
    </Guest>
  )
}

export default Layout