//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
    data: {
      query: '',
      bookList: [],
      bannerList: [],
      personalized:[],
      type: 'newDish',
      typeList: {
        titleList: [
          { title: "新碟", type: "newDish", url: "/top/album", more: "更多新碟" },
          { title: "新歌", type: "newSong", url: "/top/song", more: "新歌推荐" },
        ],
        moreList: {
          newDish: { desc: "更多新碟", url: "" },
          newSong: { desc: "新歌推荐", url: "" },
        }
      },
      albums: [],
      titleList:[
        {icon:'../../image/home/calendar.png', title: "每日推荐"},
        {icon:'../../image/home/songSheet.png', title: "歌单"},
        {icon:'../../image/home/rankingList.png', title: "排行榜"},
        {icon:'../../image/home/radioStation.png', title: "电台"},
        {icon:'../../image/home/liveBroadcast.png', title: "直播"}
      ]
    },
    tapNewSong: function(e) {
      const { id } = e.currentTarget.dataset;
      this.setData({ type: id });
      this.getDishOrSong(id);
    },
    bindconfirm: function(e){
      const _this = this;
      const query = e.detail.value;
      this.setData({ query })
      qcloud.request({
        url: `http://api.zhuishushenqi.com/book/fuzzy-search?query=${query}&start=0&limit=10`,
        success(result) {
          let bookList = result.data.books;
          bookList.map(item => {
            item.cover = unescape(item.cover.slice(7));
          })
          console.log(result)
          _this.setData({ bookList })
        },
        fail(error) {
          util.showModel('请求失败', error)
          console.log('request fail', error)
        }
      })
    },
    onLoad: function() {
      const _this = this;
      qcloud.request({
        url: `http://127.0.0.1:3000/banner?type=2`,
        success(result) {
          _this.setData({ bannerList: result.data.banners })
        },
        fail(error) {
          util.showModel('请求失败', error)
          console.log('request fail', error)
        }
      })
      // playlist/detail?id=24381616
      qcloud.request({
        url: `http://127.0.0.1:3000/personalized`,
        success(result) {
          let personalized = result.data.result.slice(0,6);
          personalized.map((item) => {
            item.playCountStr = util.formatPlayCountToStr(item.playCount)
          })
          console.log(personalized);
          _this.setData({ personalized })
        },
        fail(error) {
          util.showModel('请求失败', error)
          console.log('request fail', error)
        }
      })
      this.getDishOrSong(this.data.type); 
    },
    // /top/song?type=96
    getDishOrSong: function(type) {
      const _this = this;
      const { url } = this.data.typeList.titleList.filter((item) => item.type == type)[0];
      qcloud.request({
        url: `http://127.0.0.1:3000${url}?offset=0&limit=3`,
        success(result) {
          _this.setData({ albums: result.data.albums })
        },
        fail(error) {
          util.showModel('请求失败', error)
          console.log('request fail', error)
        }
      })
    }
})
