import { configureStore } from '@reduxjs/toolkit';
import sourceStateReducer from './reducers/sourceState';
import userStateReducer from './reducers/userState';

const store = configureStore({
  reducer: {
    // source：用于卡片跳转详情页面展示数据
    source: sourceStateReducer,
    // user: 用于商家积分信息管理
    userInfo: userStateReducer,
  }
});

export default store;

