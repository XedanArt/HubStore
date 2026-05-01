import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import MainView from "../components/MainView"

export default function AppLayout() {
  return (
    <div>
      <Sidebar />
      <div>
        <Header />
        <MainView />
      </div>
    </div>
  )
}
