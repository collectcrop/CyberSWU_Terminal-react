import { configureStore } from "@reduxjs/toolkit"
import knowledgeReducer from "./modules/knowledgeStore"
import selectReducer from "./modules/selectStore"

// 创建根store组合子模块
const store = configureStore({
  reducer: {
    knowledge: knowledgeReducer,
    select: selectReducer
  }
})

export default store