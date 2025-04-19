import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const flagsStore = createSlice({
    name: 'flags',
    // 初始状态数据
    initialState: {
        isKnowledgeLoaded: false,
    },
    // 修改数据同步方法
    reducers: {
        setKnowledgeLoaded(state, action) {
            state.isKnowledgeLoaded = action.payload
        }
    }
})

// 解构出创建action对象的函数
const { setKnowledgeLoaded } = flagsStore.actions
// 获取reducer函数
const reducer = flagsStore.reducer
// 导出创建action对象的函数和reducer函数
export { setKnowledgeLoaded }
export default reducer