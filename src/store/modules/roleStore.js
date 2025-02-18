import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const roleStore = createSlice({
    name: 'role',
    // 初始状态数据
    initialState: {
        // 0、管理员；1、普通用户
        role: 0
    },
    // 修改数据同步方法
    reducers: {
        setRole(state, action) {
            state.role = action.payload
        }
    }
})

// 解构出创建action对象的函数
const { setRole } = roleStore.actions

export { setRole }
// 获取reducer函数
const reducer = roleStore.reducer
export default reducer