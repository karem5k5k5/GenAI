import { useNavigate, NavLink } from 'react-router-dom'
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from "lucide-react"
import { assets } from './../assets/assets'
import { useAppContext } from '../context/AppContext'

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Articles", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const navigate = useNavigate()
  const { user, logout } = useAppContext()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full"} transition-all duration-300 ease-in-out`}>
      <div className="my-7 w-full">
        <img src={assets.user_profile} alt="user" className="w-13 rounded-full mx-auto" />
        <h1 className="mt-1 text-center text-sm font-medium text-gray-700 truncate px-4">
          {user?.name || user?.email || 'User'}
        </h1>

        <div className="px-6 mt-5 font-medium text-sm text-gray-600">
          {navItems.map(({ to, label, Icon }, idx) => (
            <NavLink
              key={idx}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded ${isActive ? 'bg-gradient-to-r from-[#3c81f6] to-[#9234ea] text-white' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={assets.user_profile} alt="user" className="w-8 rounded-full" />
          <div>
            <h5 className="text-sm font-medium truncate max-w-[100px]">
              {user?.name || user?.email || 'User'}
            </h5>
          </div>
        </div>
        <LogOut
          onClick={handleLogout}
          className="w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer"
          title="Logout"
        />
      </div>
    </div>
  )
}

export default Sidebar
