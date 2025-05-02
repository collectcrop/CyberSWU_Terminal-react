import TreeView from "@components/Tree"
import { useState,useEffect } from 'react'
import { useLocation, Outlet } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import Card from "@components/Card"
import Unauthorize from "@page/Unauthorize";
import axios from "axios";

const Dashboard = () =>{
    const [ isAdmin, setIsAdmin ] = useState(false);
    
    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        fetch('http://localhost:3001/api/auth/check-admin', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        .then(res => res.json())
        .then(data => {
            if (data.isAdmin) {
            console.log('你是管理员！');
            setIsAdmin(true);
            } else {
            setIsAdmin(false);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setIsAdmin(false);
        });
    })
    return(
        <div className="flex flex-1 flex-row">
            {isAdmin ?
            (<div className="flex flex-1 flex-row">
                {/* 分为左右两个容器横向排列 */}
                <div className="sticky shrink-0 w-1/5 top-0 left-0 min-w-[16rem] max-w-[32rem] 
                customed-bg-color border-r border-r-layer-content/10 print:hidden">
                {/* 左侧导航栏 */}
                        {/* 自定义OverlayScrollbars组件实现，左侧导航栏滚动条效果 */}
                        <div className="p-3 lg:p-6 flex flex-col space-y-2 flex-1 min-h-[calc(100%-4rem)]">
                            {/* 左侧导航栏内容 */}
                            <Card 
                                text={"训练题目管理"}
                                path={"/admin/dashboard/challenge-manage"}
                                variant="center"
                                requireAuth={true}
                            />
                            <Card 
                                text={"知识管理"}
                                path={"/admin/dashboard/knowledge-manage"}
                                variant="center"
                                requireAuth={true}
                            />
                            <Card 
                                text={"赛事管理"}
                                path={"/admin/dashboard/competition-manage"}
                                variant="center"
                                requireAuth={true}
                            />
                            <Card 
                                text={"用户管理"}
                                path={"/admin/dashboard/user-manage"}
                                variant="center"
                                requireAuth={true}
                            />
                            <Card 
                                text={"公告发布"}
                                path={"/admin/dashboard/system-manage"}
                                variant="center"
                                requireAuth={true}
                            />
                        </div>
    
                </div>
    
                
    
                <div className="flex flex-1 flex-col overflow-auto bg-customed-color">
                    {/* 右侧内容 */}
                    <Outlet />
                </div>  
            </div>
            ):(
                <Unauthorize />
            )
        }
        </div>
    )
}

export default Dashboard