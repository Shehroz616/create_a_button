import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { signOut } from "@/auth"
const Navbar = () => {
    return (
        <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
            <div className='container px-2.5 md:px-20'>
                <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
                    <Link href='/' className='flex z-40 font-semibold'>
                        CreateA<span className='text-green-600'> Button</span>
                    </Link>
                    <div className='h-full flex items-center space-x-4'>
                        <div className='h-8 w-px bg-zinc-200 hidden sm:block' />
                        <Link
                            href='/create'
                            className={buttonVariants({
                                size: 'sm',
                                className: 'hidden sm:flex items-center gap-1',
                            })}>
                            Create
                        </Link>
                        <Link
                            href='/dashboard'
                            className={buttonVariants({
                                size: 'sm',
                                className: 'hidden sm:flex items-center gap-1',
                            })}>
                            Dashboard
                        </Link>
                        <form
                            action={async () => {
                            "use server"
                            await signOut()
                            }}
                        > 
                            <button type="submit">Sign Out</button>
                        </form>
                          
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar