import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import knowledge from '../../page/Knowledge'
import { clear } from '@testing-library/user-event/dist/clear'

const knowledgeStore = createSlice({
    name: 'knowledge',
    // 初始状态数据
    initialState: {
        knowledgeTree: {        //自己创建一个根节点，串联所有节点
            id: null,
            title: "root",
            content: null,
            children: []
        },
        ArticleId: [],
        expandedNodes: {}       // 用于存储每个节点的展开状态，缓存节点展开状态
    },
    // 修改数据同步方法
    reducers: {
        setknowledgeTree(state, action) {
            state.knowledgeTree.children = action.payload
        },
        clearknowledgeTree(state, action) {
            state.knowledgeTree.children = []
        },
        setArticleId(state, action) {
            state.ArticleId = action.payload;
        },
        toggleNode(state, action) {
            // action.payload 是节点的 id
            const nodeId = action.payload;
            state.expandedNodes[nodeId] = !state.expandedNodes[nodeId];  // 切换展开/收起状态
        },
        clearExpandedNodes(state, action) {
            state.expandedNodes = {};
        }
    }
})

// 解构出创建action对象的函数
const { setknowledgeTree,clearknowledgeTree,setArticleId, toggleNode,clearExpandedNodes } = knowledgeStore.actions
const fetchknowledgeTree = () => {
    const array = []
    return async (dispatch) => {
        const res = await axios.get('http://127.0.0.1:5000/api/knowledge')
        if (Array.isArray(res.data)){
            for (const i of res.data) {
                array.push(i)
            }
        }else{
            array.push(res.data)
        }
        dispatch(setknowledgeTree(array));
        // 提取并设置 ArticleId
        const articleIds = fetchArticleId(res.data);
        dispatch(setArticleId(articleIds));  // 触发 setArticleId action
    }
}

const fetchArticleId = (treeList) => {
    const processTreeData = (data) => {
        const routes = [];
        // 处理单个节点的逻辑
        const processNode = (node) => {
        if (node.index) {
            routes.push({ id: node._id, url: "/knowledge/"+node.index });       // 为每个叶子节点绑定一个从唯一id到url的映射
        } else {
            routes.push(...processTreeData(node.children));  // 递归处理子节点
        }
        };
    
        // 如果 data 是一个数组，则遍历每个元素
        if (Array.isArray(data)) {
            data.forEach(processNode);
        } else {
        // 如果 data 只是一个对象
            processNode(data);
        }
        console.log(2,routes)
        return routes;
    };
    return processTreeData(treeList)
}

// 获取reducer函数
const reducer = knowledgeStore.reducer
// 导出创建action对象的函数和reducer函数
export { fetchknowledgeTree,clearknowledgeTree,fetchArticleId,toggleNode,clearExpandedNodes }
export default reducer