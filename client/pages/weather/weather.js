// pages/weather/weather.js
// 24MBZ- KEHWF - FYNJ2 - N3CA2 - US6TV - BIFZJ
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');

var order = ['red', 'yellow', 'blue', 'green', 'red'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aqi: {},                // 空气相关 
    current: {},            // 当前天气状况
    forecastDaily: {},      // 今日预测
    yesterday: {},          // 昨日信息
    forecastHourly: {},     // 今日小时预警
    weather: [
      {
        "code": 0,
        "wea": "晴"
      },
      {
        "code": 1,
        "wea": "多云"
      },
      {
        "code": 2,
        "wea": "阴"
      },
      {
        "code": 3,
        "wea": "阵雨"
      },
      {
        "code": 4,
        "wea": "雷阵雨"
      },
      {
        "code": 5,
        "wea": "雷阵雨并伴有冰雹"
      },
      {
        "code": 6,
        "wea": "雨夹雪"
      },
      {
        "code": 7,
        "wea": "小雨"
      },
      {
        "code": 8,
        "wea": "中雨"
      },
      {
        "code": 9,
        "wea": "大雨"
      },
      {
        "code": 10,
        "wea": "暴雨"
      },
      {
        "code": 11,
        "wea": "大暴雨"
      },
      {
        "code": 12,
        "wea": "特大暴雨"
      },
      {
        "code": 13,
        "wea": "阵雪"
      },
      {
        "code": 14,
        "wea": "小雪"
      },
      {
        "code": 15,
        "wea": "中雪"
      },
      {
        "code": 16,
        "wea": "大雪"
      },
      {
        "code": 17,
        "wea": "暴雪"
      },
      {
        "code": 18,
        "wea": "雾"
      },
      {
        "code": 19,
        "wea": "冻雨"
      },
      {
        "code": 20,
        "wea": "沙尘暴"
      },
      {
        "code": 21,
        "wea": "小雨-中雨"
      },
      {
        "code": 22,
        "wea": "中雨-大雨"
      },
      {
        "code": 23,
        "wea": "大雨-暴雨"
      },
      {
        "code": 24,
        "wea": "暴雨-大暴雨"
      },
      {
        "code": 25,
        "wea": "大暴雨-特大暴雨"
      },
      {
        "code": 26,
        "wea": "小雪-中雪"
      },
      {
        "code": 27,
        "wea": "中雪-大雪"
      },
      {
        "code": 28,
        "wea": "大雪-暴雪"
      },
      {
        "code": 29,
        "wea": "浮沉"
      },
      {
        "code": 30,
        "wea": "扬沙"
      },
      {
        "code": 31,
        "wea": "强沙尘暴"
      },
      {
        "code": 32,
        "wea": "飑"
      },
      {
        "code": 33,
        "wea": "龙卷风"
      },
      {
        "code": 34,
        "wea": "若高吹雪"
      },
      {
        "code": 35,
        "wea": "轻雾"
      },
      {
        "code": 53,
        "wea": "霾"
      },
      {
        "code": 99,
        "wea": "未知"
      }
    ],
    address: '',
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实例化API核心类
    this.qqmapsdk = new QQMapWX({
      key: '24MBZ-KEHWF-FYNJ2-N3CA2-US6TV-BIFZJ'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const _this = this;
    wx.getLocation({
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        var speed = res.speed;
        var accuracy = res.accuracy;
        // 调用接口
        _this.qqmapsdk.reverseGeocoder({
          location: {
            latitude: 39.984060,
            longitude: 116.307520
          },
          success: function (res) {
            console.log(res);
            _this.setData({ address: res.result.address_component.city });
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        });
        wx.request({
          url: `https://weatherapi.market.xiaomi.com/wtr-v3/weather/all?latitude=${latitude}&longitude=${longitude}&locationKey=weathercn%3A101010100&days=15&appKey=weather20151024&sign=zUFJoAR2ZVrDy1vF3D07&isGlobal=false&locale=zh_cn`,
          success: function (res) {
            _this.setData({ ...res.data });
          }
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})