import { useNavigate, useLocation} from "react-router-dom"
import { useState, useRef, useEffect } from "react"
// import useAuth from "@hooks/useAuth"
import { useAuth } from '@contexts/AuthContext'
import NavbarCard from "@components/Card";
const AvatarMenu = ({ user, logout }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
  
    // 点击外部关闭菜单
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
    return (
      <div className="relative mr-5" ref={menuRef}>
        <button
          onClick={() => setOpen(!open)}
          className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold"
        >
          {user.username.slice(0, 2).toUpperCase()}
        </button>
  
        {open && (
          <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50 p-3">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold">
                {user.username.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-bold">{user.username}</div>
                <div className="text-sm text-gray-500">ID: {user.id}</div>
              </div>
            </div>
            <button
              onClick={() => navigate("/UserSettings")}
              className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
            >
              用户设置
            </button>
            <button
              onClick={logout}
              className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
            >
              退出登录
            </button>
          </div>
        )}
      </div>
    );
  };


const Navbar = () =>{
  const navigate = useNavigate()
  const { user, isLoggedIn, logout } = useAuth();
  return(
      <div className="navbar">
          <div className="navbar-list-left">
              <NavbarCard
                  imageSrc="/images/terminal-icon.svg"
                  text="CyberSWU CTF 终端"
                  onClick={() => navigate("/")}
              />
              <NavbarCard
                  imageSrc="/images/book.svg"
                  text="知识"
                  path="/knowledge"
                  onClick={() => navigate("/knowledge")}
              />
              <NavbarCard
                  imageSrc="/images/dumbbell.svg"
                  text="训练"
                  path="/training"
                  onClick={() => navigate("/training")}
              />
              <NavbarCard
                  imageSrc="/images/flag.svg"
                  text="赛事"
                  path="/games"
                  onClick={() => navigate("/games")}
              />
              <NavbarCard
                  imageSrc="/images/announce.svg"
                  text="公告"
                  path="/bulletin"
                  onClick={() => navigate("/bulletin")}
              />
          </div>
          <div className="navbar-list-right">
            {isLoggedIn ? (
              <AvatarMenu user={user} logout={logout}/>
            ) : (
              <NavbarCard
                imageSrc="/images/people.svg"
                text="登录"
                path="/login"
                onClick={() => navigate("/login")}
            />
            )}
          </div>
      </div>
  )
}

export default Navbar