//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
    data: {
      query: '',
      bookList: [],
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
})
