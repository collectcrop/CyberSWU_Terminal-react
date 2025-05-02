import TreeView from "@components/Tree"
import Scrollbar from "@components/Scrollbar";
import { useState,useEffect } from 'react'
import { fetchknowledgeTree,clearknowledgeTree,toggleNode } from "@/store/modules/knowledgeStore"
import { setKnowledgeLoaded } from "@/store/modules/flagsStore"
import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import Card from "@components/Card"
import RequireAuth from "@components/RequireAuth";

const Training = () =>{
    const dispatch = useDispatch()
    const location = useLocation();  // 获取当前路由位置
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/data/trainingCategories.json')
          .then(res => res.json())
          .then(data => setCategories(data))
          .catch(err => console.error("加载分类失败", err));
      }, []);

    return(
        <RequireAuth>
            <div className="flex flex-1 flex-row">
                {/* 分为左右两个容器横向排列 */}
                
                <div className="sticky shrink-0 w-1/5 top-0 left-0 min-w-[16rem] max-w-[32rem] 
                customed-bg-color border-r border-gray-300 print:hidden">
                {/* 左侧导航栏 */}
                    {/* 左侧导航栏内容 */}
                    <div className="flex flex-col space-y-2 pb-2 pt-2 pl-3 border-b border-gray-300">
                        <Card
                            imageSrc={"/images/dumbbell.svg"}
                            text={"练习场"} 
                        />
                    </div>
                    <div className="flex pt-1 pl-3">
                        <Card
                            text={"训练"} 
                        />
                    </div>
                    <div className="flex flex-col pt-1 pl-3 space-y-2">
                        {categories.map(cat => (
                            <Card
                                key={cat._id} 
                                imageSrc={cat.imageSrc} 
                                text={cat.name} 
                                onClick={() => navigate(`/training/${cat.id}`)}
                                requireAuth={true}
                                height="min-h-12"
                                variant="center"
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-1 flex-col overflow-auto justify-center items-center bg-customed-color">
                    {/* 右侧内容 */}
                    <img src="/images/dumbbell.svg" className="h-20 w-20 mb-10 opacity-50"/>
                    <div className="opacity-50">开始今日份的练习!</div>
                </div>      
            </div>
        </RequireAuth>
    )
}

export default Training