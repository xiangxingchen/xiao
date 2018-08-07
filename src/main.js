import Vue from 'vue';
import App from './App';
import store from './store/index';

Vue.config.productionTip = false;
App.mpType = 'app';
Vue.prototype.$store = store;

const app = new Vue({ App });
app.$mount();

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/counter/main', 'pages/logs/main', 'pages/index/main', 'pages/detail/main', 'pages/evalution/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true,
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/index/main',
          text: '首页',
          iconPath: 'image/home.png',
          selectedIconPath: 'image/home-active.png',
        },
        {
          pagePath: 'pages/counter/main',
          text: '书架',
          iconPath: 'image/books.png',
          selectedIconPath: 'image/books-active.png',
        },
        {
          pagePath: 'pages/index/main',
          text: '分类',
          iconPath: 'image/search.png',
          selectedIconPath: 'image/search-active.png',
        },
        {
          pagePath: 'pages/logs/main',
          text: '我的',
          iconPath: 'image/mine.png',
          selectedIconPath: 'image/mine-active.png',
        },
      ],
    },
  },
};
