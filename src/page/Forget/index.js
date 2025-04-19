import { useNavigate } from "react-router-dom"
import { useState } from 'react'
const Forget = () =>{
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false); // 控制显示提示信息
    const handleSubmit = async (e) => {
      e.preventDefault(); // 阻止默认提交行为（防止刷新页面）

      try {
        const res = await fetch('http://localhost:3001/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
    
        const data = await res.json();
        
        if (res.ok) {
          console.log('请求成功');
          setSubmitted(true); // 显示提示
        } else {
          console.log(data.error || '请求失败');
        }
      } catch (err) {
        console.error('请求出错:', err);
      }
    };

    return(
        <div className="flex flex-1 flex-row customed-bg-color items-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                {/* Logo + 标题 */}
                <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-black drop-shadow-md mb-3">找回密码</div>
                </div>
                {submitted ? (
                <div>
                    <p>如果该邮箱存在，我们已经发送了一封邮件给你，请查收并按照提示重置密码。</p>
                    {/* 加个返回主页按钮 */}
                    <button onClick={() => window.location.href = '/'}>返回主页</button>
                </div>
                ) : (
                <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-1 font-medium">邮箱</label>
                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="请输入邮箱"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                    发送邮箱找回账号
                </button>
                </form>
                )}
            </div>
        </div>
    )
}

export default Forget