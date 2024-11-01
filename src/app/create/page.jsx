import KonvaCanvas from "@/components/Create"
import TopBar from "@/components/editorTopBar"
import Sidebar from "@/components/editorSideBar"
import InnerTopBar from "@/components/innerTopbar"

const page = () => {
  return (
    <div>
        <TopBar/>
        <div className="flex items-start items-stretch"  style={{height: 'calc(100vh - 65px)'}}>
          <Sidebar/>
          <div className="w-full h-full">
            <InnerTopBar />
            <KonvaCanvas />
          </div>
        </div>
    </div>
  )
}

export default page