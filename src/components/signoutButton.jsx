import React from 'react'
import { signOut } from "@/auth"

const SignoutButton = () => {
  return (
    <button
        onClick={async () => {
            // "use server"
            await signOut()
        }}
        className='hidden sm:flex items-center gap-1'>
        Sign Out
    </button>
  )
}

export default SignoutButton