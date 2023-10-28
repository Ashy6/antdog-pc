import { configureStore } from '@reduxjs/toolkit';
import sourceStateReducer from './reducers/sourceState';
import userStateReducer from './reducers/userState';
import selectStateReducer from './reducers/selectState';

const store = configureStore({
  reducer: {
    // source：用于卡片跳转详情页面展示数据
    source: sourceStateReducer,
    // user: 用于商家积分信息管理
    userInfo: userStateReducer,
    // selectInfo: 用于管理 订单与积分状态 Sidebar 状态
    selectInfo: selectStateReducer,
  }
});

export default store;

