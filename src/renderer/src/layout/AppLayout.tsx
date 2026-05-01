import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import MainView from "../components/MainView"

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-bg text-text-primary">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />
        <MainView />
      </div>
    </div>
  )
}