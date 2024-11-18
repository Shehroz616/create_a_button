import GoogleButton from '@/components/googleButton'
import SignupForm from '@/components/signupForm'
import Link from 'next/link'



const Signup = () => {
  return (
      <>
        <div className="text-center bg-gradient-to-r from-green-800 to-green-600  sm:pt-12 pt-8 sm:pb-24 pb-12">
          <h4 className="sm:text-3xl text-2xl font-bold text-white">Create your free account</h4>
        </div>
        <div className="mx-4 mb-4 -mt-14">
          <div className='max-w-xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md'>

           <SignupForm/>
            <GoogleButton/>
            <p className='mt-10 text-center'>Already have an account? <Link href='/signin' className='text-green-600'>Signin</Link></p>
          </div>
        </div>
      </>
  )
}

export default Signup
