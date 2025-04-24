
import { useNavigate } from "react-router-dom"
import Card from "@components/Card"
import InputBox from "@components/InputBox";
import {useAuth} from "@contexts/AuthContext"
const UserSettings = () =>{
    const { isLoggedIn,user } = useAuth();
    const navigate = useNavigate();
    if (!isLoggedIn){
        navigate("/login");
    }
    return(
        <div className="flex flex-1 flex-row">
            {/* 分为左右两个容器横向排列 */}
            
            <div className="sticky shrink-0 w-1/5 top-0 left-0 min-w-[16rem] max-w-[32rem] 
            customed-bg-color border-r border-gray-300 print:hidden">
            {/* 左侧导航栏 */}
                {/* 左侧导航栏内容 */}
                <div className="flex flex-col space-y-2 pb-2 pt-10 pl-5 pr-5">
                    <Card
                        imageSrc={"/images/dumbbell.svg"}
                        text={"用户信息"} 
                    />
                    <Card
                        text={"修改密码"} 
                    />
                </div>
            </div>

            <div className="flex flex-1 flex-col overflow-auto bg-customed-color">
                {/* 右侧内容 */}
                <div className="flex flex-col pt-10 pl-20 pr-20">
                    <div className="flex flex-row border-b border-gray-300 mb-2 font-bold">
                        <Card 
                            text="用户信息"
                            disableActive={true}
                        />
                    </div>
                    <div className="px-2.5 py-2 ml-1 font-light text-gray-500">
                        用户名
                    </div>

                    <div className="flex flex-row font-normal">
                        <InputBox 
                        action="info"
                        buttonExist={false} 
                        originalContent={user && user.username}
                        />
                    </div>

                    <div className="px-2.5 py-2 ml-1 font-light text-gray-500">
                        邮箱
                    </div>

                    <div className="flex flex-row font-normal">
                        <InputBox 
                        action="info"
                        buttonExist={false} 
                        originalContent={user && user.email}
                        />
                    </div>

        
                </div>
            </div>      
        </div>
    )
}

export default UserSettings;