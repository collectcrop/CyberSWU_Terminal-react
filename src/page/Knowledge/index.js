import TreeView from "@components/Tree"
import { useState,useEffect } from 'react'
import { fetchknowledgeTree,clearknowledgeTree } from "@/store/modules/knowledgeStore"
import { useDispatch,useSelector } from 'react-redux'
const Knowledge = () =>{
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchknowledgeTree())
        return () => {
            dispatch(clearknowledgeTree())
        }
    },[dispatch])

    const treeList = useSelector(state => state.knowledge).knowledgeTree.children[0]
    console.log(treeList)
    return(
        <div className="flex flex-1 flex-row">
            {/* 分为左右两个容器横向排列 */}
            <div className="sticky shrink-0 w-1/5 top-0 left-0 min-w-[16rem] max-w-[32rem] 
            customed-bg-color border-r border-r-layer-content/10 print:hidden">
            {/* 左侧导航栏 */}
                <div data-overlayscrollbars-initialize="" className="relative w-full h-full print:h-auto print:overflow-auto" data-overlayscrollbars="host">
                    {/* 自定义OverlayScrollbars组件实现，左侧导航栏滚动条效果 */}
                    <div className="p-3 lg:p-6 flex flex-col space-y-2 flex-1 min-h-[calc(100%-4rem)]">
                        {/* 左侧导航栏内容 */}
                        {treeList && <TreeView treeList={treeList} />}
                    </div>
                </div>
            </div>
            <div className="flex flex-1 flex-col overflow-auto justify-center items-center bg-customed-color">
                {/* 右侧内容 */}
                <img src="/images/book.svg" className="h-20 w-20 mb-10 opacity-50"/>
                <div className="opacity-50">今天想学些什么?</div>
            </div>
        </div>
        
    )
}

export default Knowledge