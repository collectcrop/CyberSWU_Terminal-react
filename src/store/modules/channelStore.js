import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const channelStore = createSlice({
    name: 'channel',
    // 初始状态数据
    initialState: {
        channelList: []
    },
    // 修改数据同步方法
    reducers: {
        setChannelList(state, action) {
            state.channelList = action.payload
        }
    }
})

// 解构出创建action对象的函数
const { setChannelList } = channelStore.actions
const fetchChannelList = () => {
    return async (dispatch) => {
        const res = await axios.get('http://geek.itheima.net/v1_0/channels')
        dispatch(setChannelList(res.data.data.channels))
    }
}


// 获取reducer函数
const reducer = channelStore.reducer
// 导出创建action对象的函数和reducer函数
export { fetchChannelList }
export default reducer