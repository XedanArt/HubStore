import Sidebar from "../components/Sidebar"
import MainView from "../components/MainView"

export default function AppLayout() {
  return (
    <div className="flex h-screen w-screen bg-gray-900 text-white">
      <Sidebar />
      <MainView />
    </div>
  )
}
