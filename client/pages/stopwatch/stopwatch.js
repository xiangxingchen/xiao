// pages/stopwatch/stopwatch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    minute: "00",
    second: "00",
    millisecond: "00",
    restart: "复位",
    start: "启动",
    isStart: false,
    timeArray: [],
  },
  start: function() {
    const that = this;
    const { isStart, count } = this.data;
    if (!isStart) {
      this.setData({
        start: "停止",
        restart: "计次",
        isStart: !isStart,
      })
      setInterval(() => {
        let { count } = that.data;
        count++;
        const value = that.getValue(count);
        this.setData({ ...value, count });
        console.log(count)
      },10)
    } else {
      this.setData({
        start: "启动",
        restart: "复位",
        isStart: !isStart,
      })
    }
  },
  reatsrt: function() {
    const { isStart, count, timeArray } = this.data;
    if (isStart) {
      const value = this.getValue(count);
      this.setData({ timeArray: [...timeArray, { ...value }]});
    } else {

    }
  },
  getValue: function(count) {
    const minute = parseInt((count % (100 * 60 * 60)) / (100 * 60));
    const second = parseInt((count % (100 * 60)) / 100);
    const millisecond = count % 100;
    return { minute, second, millisecond };
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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