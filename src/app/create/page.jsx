import KonvaCanvas from "@/components/Create"
import TopBar from "@/components/editorTopBar"
import Sidebar from "@/components/editorSideBar"

const page = () => {
  return (
    <div>
        <TopBar/>
        <div className="flex items-start items-stretch"  style={{height: 'calc(100vh - 65px)'}}>
          <Sidebar/>
          <KonvaCanvas />
        </div>
    </div>
  )
}

export default page