import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import {useAuth} from '@contexts/AuthContext'
import Toast from "@components/Toast"
const Register = () =>{
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { login } = useAuth();  // 拿到 context 里的 login 方法
    const [toast, setToast] = useState(null); // toast 状态
    const showToast = (msg, type = 'error') => {
      setToast({ message: msg, type });
    };

    const validateInputs = () => {
      const errors = {};
      if (!username || username.length < 3 || !/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.username = "用户名需大于3位，只能包含字母、数字和下划线";
      }
    
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        errors.email = "请输入有效的邮箱地址";
      }
    
      if (
        !password ||
        password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/[0-9]/.test(password)
      ) {
        errors.password = "密码需至少8位，包含大写、小写和数字";
      }
    
      return errors;
    };

    const handleSubmit = async (e) => {
      e.preventDefault(); // 阻止默认提交行为（防止刷新页面）
      const errors = validateInputs();  // 验证输入
      if (Object.keys(errors).length > 0) {
        showToast(Object.values(errors)[0]); // 显示第一条错误
        return;
      }

      try {
        const res = await fetch('http://localhost:3001/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, email }),
        });
    
        const data = await res.json();
        
        if (res.ok) {
          // localStorage.setItem('token', data.token); // 保存 token
          login(data.token)
          console.log('注册成功');
          showToast('注册成功', 'success');
          setUsername('');
          setPassword('');
          setEmail('');
        } else {
          showToast(data.error, 'error');
        }
      } catch (err) {
        console.error('请求出错:', err);
        showToast('Network Error', 'error');
      }
    };

    return(
        <div className="flex flex-1 flex-row customed-bg-color items-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                {/* Logo + 标题 */}
                <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-black drop-shadow-md mb-3">注册账号</div>
                </div>
                <form onSubmit={handleSubmit} className="relative">
                <div className="mb-4">
                    <label htmlFor="username" className="block mb-1 font-medium">用户名</label>
                    <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="请输入用户名"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1 font-medium">邮箱</label>
                    <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="请输入邮箱"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block mb-1 font-medium">密码</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="请输入密码"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                    注册
                </button>
                  {toast && (
                    <div className="absolute w-full ">
                      <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                        onComplete={() => {
                          if (toast.type === 'success') navigate('/');
                        }}
                      />
                    </div>
                  )}
                </form>
                
            </div>
        </div>
    )
}

export default Register