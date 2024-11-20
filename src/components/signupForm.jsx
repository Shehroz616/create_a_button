'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link';

const SignupForm = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [disableBtn, setDisableBtn] = useState(false);
    const [error, setError] = useState({
      confirmPassword:"",
      email:"",
    });
    const [formData, setFormData] = useState({})
  
    const handleChange = (event) => {
      const { name, value } = event.target
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }))
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault()
      setDisableBtn(true)
      try {
        console.log(formData)
        let response = await fetch(`https://create-a-button-backend.vercel.app/api/user/signup`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
        response = await response.json()
        console.log(response)
        if (response.message == "Email already exists") {
          setError((prev) => ({ ...prev, email: response.message }))
          setDisableBtn(false)
        } else{
          setError((prev) => ({ ...prev, email: "" }))
          setDisableBtn(false)

        }
      } catch (error) {
        console.error('Error submitting form:', error)
        setDisableBtn(false)
      }
    }
  
    useEffect(() => {
      if (confirmPassword && password !== confirmPassword) {
        setError((prev) => ({ ...prev, confirmPassword: 'Password does not match' })) ;
      } else {
        setError((prev) => ({ ...prev, confirmPassword: '' }));
        setFormData((prev) => ({
          ...prev,
          password: password
        }))
  
      }
    }, [confirmPassword]);
  return (
    
    <form onSubmit={handleSubmit}>
            <div className="text-center my-5">
              <Link href='/' className='flex text-4xl z-40 font-semibold justify-center'>
                  CreateA<span className='text-green-600'> Button</span>
              </Link>
            </div>
            <div className="grid md:grid-cols-1 gap-8">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Full Name</label>
                <input onChange={handleChange} name="name" type="text" className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-green-600 transition-all" placeholder="Enter name" />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                <input onChange={handleChange} name="email" type="text" className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-green-600 transition-all" placeholder="Enter email" />
                {error.email && <p className="text-red-500 text-sm mt-2">{error.email}</p>}
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} name="password" type="password" className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-green-600 transition-all" placeholder="Enter password" />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                <input onChange={(e) => setConfirmPassword(e.target.value)} name="cpassword" type="password" className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-green-600 transition-all" placeholder="Enter confirm password" />
                {error.confirmPassword && <p className="text-red-500 text-sm mt-2">{error.confirmPassword}</p>}
              </div>
            </div>
            <div className="mt-8">
              <button type="submit" disabled={disableBtn? true:false} className="py-3 px-6 text-xl tracking-wider font-semibold rounded-md text-white bg-green-600 disabled:opacity-75 focus:outline-none w-full">Sign up</button>
            </div>
            <div
              className="my-8 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p
                className="mx-4 text-center">
                Or
              </p>
            </div>
        </form>

  )
}

export default SignupForm