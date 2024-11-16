import React from 'react'
import Protected from '@/hook/page'

const Layout = ({children}) => {
  return (
    <Protected>
        {children}
    </Protected>
  )
}

export default Layout