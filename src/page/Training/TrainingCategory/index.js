import { useState,useEffect } from 'react'
import { useLocation, Outlet, useSearchParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import ChallengeDirectory from '@components/ChallengeDirectory';
import Challenge from '@page/Challenge';
const TrainingCategory = () =>{
    const [searchParams] = useSearchParams();
    const challengeId = searchParams.get('challengeId');
    return(
        <div className="flex flex-1 flex-row">
            {/* 分为左右两个容器横向排列 */}
            <div className="sticky shrink-0 w-1/5 top-0 left-0 min-w-[16rem] max-w-[32rem] 
            customed-bg-color border-r border-r-layer-content/10 print:hidden">
            {/* 左侧导航栏 */}                    
                {/* 左侧导航栏内容 */}
                <ChallengeDirectory />
            </div>

            <div className="flex flex-1 flex-col overflow-auto bg-customed-color">
                {/* 右侧内容 */}
                {challengeId ? <Challenge /> : 
                <div className="flex flex-1 flex-col overflow-auto justify-center items-center bg-customed-color">
                    <img src="/images/dumbbell.svg" className="h-20 w-20 mb-10 opacity-50"/>
                    <div className="opacity-50">开始今日份的练习!</div>
                </div>
                }
            </div>
            
            
        </div>
        
    )
}

export default TrainingCategory