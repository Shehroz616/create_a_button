
import { auth } from "@/auth";
import { redirect } from "next/navigation";
const Protected = async ({children}) => {
  
  return (
    session?.user ? children : redirect('/signin')  
  )
}

export default Protected 