
import { auth } from "@/auth";
import { redirect } from "next/navigation";
const Protected = async ({children}) => {
  const session = await auth()
  console.log(session)
  return (
    session?.user ? children : redirect('/signin')  
  )
}

export default Protected 