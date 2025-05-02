import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@contexts/AuthContext'
const RequireAuth = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); // null: 检查中, true: 已认证, false: 未认证
  const { logout } = useAuth();
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuth(false);
        return;
      }

      try {
        await axios.get('http://localhost:3001/api/auth/check-token', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        setIsAuth(true);
      } catch (err) {
        console.log('Token 无效：', err);
        logout()              // localStorage.removeItem('token');
        setIsAuth(false);
      }
    };

    checkToken();
  }, []);
  console.log('isAuth:', isAuth);

  if (isAuth === null) {
    // 验证中：可以显示加载中界面，或什么都不显示
    return <div>正在验证登录状态...</div>;
  }

  if (!isAuth) {
    // 未登录或 token 无效
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
