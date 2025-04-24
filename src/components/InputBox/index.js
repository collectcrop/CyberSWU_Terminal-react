import { useNavigate, useLocation} from "react-router-dom"
import { useState } from "react";
import Toast  from "@components/Toast"
import {useAuth} from "@contexts/AuthContext"
const InputBox = ({ challengeId, submitUrl, textPlaceholder, buttonText, action="challenge", buttonExist=true, originalContent=""}) => {
    const [content, setContent] = useState(originalContent);
    const [status, setStatus] = useState(null); // null | "success" | "error"
    const [message, setMessage] = useState("");
    const { user } = useAuth();  
    const userId = user.id;
    const habdleChallengeSubmit = async () => {
      try {
        const res = await fetch(submitUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ challengeId, content, userId}),
        });
        const data = await res.json();
        console.log(data);
        if (data.success) {
          setStatus("success");
          setMessage("🎉 恭喜你，Flag 正确！");
        } else {
          setStatus("error");
          setMessage("❌ 很遗憾，Flag 错误，请再试一次！");
        }
        setContent("");
      } catch (err) {
        console.error(err);
        setStatus("error");
        setMessage("提交出错，请稍后重试！");
      }
    };
    

    return (
        <div>
            <div className="flex flex-row space-x-2 mt-1 w-full">
                <input
                type="text"
                placeholder={textPlaceholder}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="px-4 py-1 w-[80%] bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                {buttonExist && <button
                    onClick={action=="challenge"?habdleChallengeSubmit:habdleChallengeSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-black-600 transition"
                    >
                    {buttonText}
                </button>}
                
            </div>
            {status && (
                <Toast 
                message={message}
                type={status}
                onClose={() => setStatus(null)}
                />
            )}
        </div>
    
    )
  }


export default InputBox