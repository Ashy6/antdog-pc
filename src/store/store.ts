import { configureStore } from '@reduxjs/toolkit';
import sourceStateReducer from './reducers/sourceState';

const store = configureStore({
  reducer: {
    // source：用于卡片跳转详情页面展示数据
    source: sourceStateReducer
  }
});

export default store;

