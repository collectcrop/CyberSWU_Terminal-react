import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const selectStore = createSlice({
    name: 'role',
    // 初始状态数据
    initialState: {
        // 0、管理员；1、普通用户
        selectedKnowledgeItemId: 0
    },
    // 修改数据同步方法
    reducers: {
        setKnowledgeItemId(state, action) {
            state.selectedKnowledgeItemId = action.payload
        }
    }
})

// 解构出创建action对象的函数
const { setKnowledgeItemId } = selectStore.actions

export { setKnowledgeItemId }
// 获取reducer函数
const reducer = selectStore.reducer
export default reducer