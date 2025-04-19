import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
const ResetPassword = () =>{
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState(false); // 控制显示提示信息
    const navigate = useNavigate();
    const [valid, setValid] = useState(null); // null:加载中, false:非法, true:合法
    const token = useParams().token;
    console.log(token);
    useEffect(() => {
        // 向后端验证 token 是否有效
        fetch(`http://localhost:3001/api/auth/validate-reset-token/${token}`)
          .then(res => res.json())
          .then(data => {
            if (data.valid) {
              setValid(true);
            } else {
              setValid(false);
              setTimeout(() => navigate('/'), 3000); // 无效就跳转
            }
          })
          .catch(() => {
            setValid(false);
            setTimeout(() => navigate('/'), 3000);
          });
      }, [token, navigate]);
    
    if (valid === null) return <p>正在验证链接...</p>;
    if (valid === false) return <p>链接无效或已过期，正在跳转...</p>;
    const handleSubmit = async (e) => {
      e.preventDefault(); // 阻止默认提交行为（防止刷新页面）
      
      if (newPassword !== confirmPassword) {
        alert('两次密码输入不一致！');
        return;
      }
      if (newPassword === '' || confirmPassword === '') {
        alert('密码不能为空！');
        return;
      }
      try {
        const res = await fetch(`http://localhost:3001/api/auth/reset-password/${token}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newPassword }),
        });
    
        const data = await res.json();
        
        if (res.ok) {
          setSuccess(true);
          console.log('修改成功');
          
        } else {
          console.log(data.error || '修改失败');
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
                    <div className="text-4xl font-bold text-black drop-shadow-md mb-3">设置新密码</div>
                </div>
                {success ? (
                <div>
                    <p>密码修改成功</p>
                </div>
                ) : (
                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block mb-1 font-medium">新密码</label>
                    <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="请输入新密码"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block mb-1 font-medium">确认新密码</label>
                    <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="再次输入新密码"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                    修改密码
                </button>
                </form>
                )}
            </div>
        </div>
    )
}

export default ResetPassword