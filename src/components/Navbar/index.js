import { useNavigate, useLocation} from "react-router-dom"
const NavbarCard = ({ imageSrc, text, onClick, path }) => {
  const location = useLocation();
  // 动态计算className
  const isActive = location.pathname === path;
  const className = `flex mr-5 ml-1 flex-row items-center justify-start px-2.5 py-2 rounded-lg cursor-pointer 
  transition-all ease-linear duration-300 hover:bg-customed-color-hover ${isActive ? 'bg-customed-color-hover' : ''}`;
  return (
  <button onClick={onClick} className={className}>
      <img src={imageSrc} className="w-4 h-4 mr-2" />
      <span className="ml-1 font-bold">{text}</span>
  </button>
  )
}
const Navbar = () =>{
  const navigate = useNavigate()
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
              <NavbarCard
                  imageSrc="/images/people.svg"
                  text="登录"
                  path="/login"
                  onClick={() => navigate("/login")}
              />
          </div>
      </div>
  )
}

export default Navbar