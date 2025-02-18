import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import knowledge from '../../page/Knowledge'
import { clear } from '@testing-library/user-event/dist/clear'

const knowledgeStore = createSlice({
    name: 'knowledge',
    // 初始状态数据
    initialState: {
        knowledgeTree: {        //自己创建一个根节点，串联所有节点
            title: "root",
            content: null,
            children: []
        }
    },
    // 修改数据同步方法
    reducers: {
        setknowledgeTree(state, action) {
            state.knowledgeTree.children.push(action.payload)
        },
        clearknowledgeTree(state, action) {
            state.knowledgeTree.children = []
        }
    }
})

// 解构出创建action对象的函数
const { setknowledgeTree,clearknowledgeTree } = knowledgeStore.actions
const fetchknowledgeTree = () => {
    return async (dispatch) => {
        const res = await axios.get('http://127.0.0.1:5000/api/knowledge')
        if (Array.isArray(res.data)){
            for (const i of res.data) {
                setknowledgeTree(i)
            }
        }else{
            setknowledgeTree(res.data)
        }
        dispatch(setknowledgeTree(res.data))
    }
}


// 获取reducer函数
const reducer = knowledgeStore.reducer
// 导出创建action对象的函数和reducer函数
export { fetchknowledgeTree,clearknowledgeTree }
export default reducer