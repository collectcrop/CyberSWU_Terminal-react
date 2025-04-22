import { useNavigate, useLocation} from "react-router-dom"
import { useAuth } from '@contexts/AuthContext'
const Card = ({ imageSrc, text, onClick, path, customContent, variant = "left", height = "h-auto",
  requireAuth = false, disableActive = false
 }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    // 通过 variant 动态控制内容对齐方式
    const alignmentClass = {
      left: "justify-start text-left",
      center: "justify-center text-center",
      right: "justify-end text-right",
    }[variant];

    const className = `
    flex mr-1 ml-1 flex-row items-center px-2.5 py-2 rounded-lg cursor-pointer 
    transition-all ease-linear duration-300 
    ${(!disableActive) ? 'hover:bg-customed-color-hover' : ''} 
    ${alignmentClass}
    ${height}
    `;

    const handleClick = () => {       
      if (requireAuth && !isLoggedIn) {
        // 未登录则跳转到登录界面，附带原始跳转意图（可选）
        navigate("/login", { state: { redirectTo: path } });
      } else {
        // 已登录或者不需要登录，继续跳转
        if (onClick) onClick();
        else if (path) navigate(path);
      }
    };

    return (
    <button onClick={handleClick} className={className}>
      {customContent ? (
          customContent
        ) : (
          <>
            {imageSrc && <img src={imageSrc} className="w-4 h-4 mr-2" />}
            <span className="ml-1 font-bold">{text}</span>
          </>
        )}
        
    </button>
    )
  }


export default Card