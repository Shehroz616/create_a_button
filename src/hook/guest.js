
import { auth } from "@/auth";
import { redirect } from "next/navigation";
const Guest = async ({children}) => {
  const session = await auth()
  console.log("guest",session)
  return (
    session?.user ? redirect('/') : children
  )
}

export default Guest