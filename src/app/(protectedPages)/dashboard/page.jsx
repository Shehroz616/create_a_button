import { signOut } from "@/auth"
import Navbar from "../components/Navbar"
export default function Dashboard() {
  return (
    <>
    <Navbar/>
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      > 
          Dashboard
          <button>Sign Out</button>
        </form>
    </>
  )
}