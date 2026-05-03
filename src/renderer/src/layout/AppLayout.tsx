import Sidebar from "./Sidebar"
import Header from "./Header"
import MainView from "./MainView"

export default function AppLayout() {
  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Background image */}
      <div
        className="
          absolute inset-0
          bg-cover bg-center bg-no-repeat
          -z-50
        "
        style={{ backgroundImage: "url('/background.png')" }}
      />

      {/* App content */}
      <div className="relative z-10 flex flex-col h-full">

        {/* Header */}
        <Header />

        {/* Sidebar + MainView */}
        <div className="flex flex-1 min-h-0">  {/* ← LA LIGNE QUI RÈGLE TOUT */}
          <Sidebar />
          <MainView />
        </div>
      </div>
    </div>
  )
}
