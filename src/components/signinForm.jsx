'use client'
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';

export default function SigninForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disableBtn, setDisableBtn] = useState(false);
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisableBtn(true)

        try {
            let response = await fetch(
              `https://create-a-button-backend.vercel.app/api/user/login`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, isGoogleSignUp: false }),
              }
            );
            response = await response.json();
            console.log("response", response);
            if (response.message == "Successfully logged in") {
                
                const result = await signIn('credentials', {
                    redirect: true,
                    email,
                    password,
                    token:response.token
                });
                setError("");
            }
            else{
                console.log(response);
                setError(response.error);
                setDisableBtn(false)
            }
          } catch (error) {
            console.error("Error submitting form:", error);
            setDisableBtn(false)
          }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="text-center my-5">
                <Link href='/' className='flex text-4xl z-40 font-semibold justify-center'>
                    CreateA<span className='text-green-600'> Button</span>
                </Link>
            </div>
            <div className="grid md:grid-cols-1 gap-8">
                <div>
                    <label className="text-gray-800 text-sm mb-2 block">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-green-600 transition-all" placeholder="Enter name" />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <div>
                    <label className="text-gray-800 text-sm mb-2 block">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-green-600 transition-all" placeholder="Enter name" />
                </div>
            </div>
            <div className="mt-8">
              <button type="submit" disabled={disableBtn? true:false}  className="disabled:opacity-75 py-3 px-6 text-xl tracking-wider font-semibold rounded-md text-white bg-green-600 focus:outline-none w-full">Sign In</button>
            </div>
            <div className="my-8 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 text-center">Or</p>
            </div>
        </form>
    );
}