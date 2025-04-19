import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import { useAuth } from '@contexts/AuthContext'
const Login = () =>{
    const navigate = useNavigate()
    const { login } = useAuth(); // 拿到 context 里的 login 方法
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault(); // 阻止默认提交行为（防止刷新页面）

      try {
        const res = await fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
    
        const data = await res.json();
        
        if (res.ok) {
          // localStorage.setItem('token', data.token); // 保存 token
          login(data.token)
          console.log('登录成功');
          navigate('/'); // 返回主页
        } else {
          console.log(data.error || '登录失败');
        }
      } catch (err) {
        console.error('请求出错:', err);
        alert('网络错误，请稍后再试。');
      }
    };

    return(
        <div className="flex flex-1 flex-row customed-bg-color items-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                {/* Logo + 标题 */}
                <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-black drop-shadow-md mb-3">🏴‍☠️ 登录</div>
                    <div className="text-sm text-black/70 mt-1">Hello CTFer.</div>
                </div>
                <form onSubmit={handleSubmit}>
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
                    登录
                </button>
                </form>

                <div className="flex justify-between mt-4 text-sm text-blue-500">
                <button className="hover:underline" 
                        onClick={() => navigate('/register')}>
                注册账号
                </button>
                <button className="hover:underline"
                        onClick={() => navigate('/forget')}>
                忘记密码？
                </button>
                </div>
            </div>
        </div>
    )
}

export default Login