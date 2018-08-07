<template>
  <div>
    <div @click="saveImage" class="save">保存图片</div>
    <canvas canvas-id="shareCanvas" class="canvas"></canvas>
    <div class="mask"></div>
  </div>
</template>

<script>
import { formatTime } from "@/utils/index";

export default {
  data() {
    return {
      logs: []
    };
  },
  methods: {
    saveImage() {
      console.log("saveImage");
      const ctx = wx.createCanvasContext("shareCanvas");
      //把画板内容绘制成图片，并回调 画板图片路径
      //绘制之后加一个延时去生成图片，如果直接生成可能没有绘制完成，导出图片会有问题。
      setTimeout(function() {
        wx.canvasToTempFilePath(
          {
            x: 0,
            y: 0,
            width: 620,
            height: 900,
            destWidth: 620,
            destHeight: 900,
            quality: 1,
            canvasId: "shareCanvas",
            success: function(res) {
              console.log("画板路径保存成功", res);
              /* that.setData({
                              shareImgPath: res.tempFilePath
                          }) */
              if (!res.tempFilePath) {
                wx.showModal({
                  title: "提示",
                  content: "图片绘制中，请稍后重试",
                  showCancel: false
                });
              }
              // console.log(that.data.shareImgPath)
              //画板路径保存成功后，调用方法吧图片保存到用户相册
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                //保存成功失败之后，都要隐藏画板，否则影响界面显示。
                success: res => {
                  console.log("保存图片成功", res);
                  // wx.hideLoading()
                  /* hat.setData({
                                      canvasHidden: true
                                  }) */
                },
                fail: err => {
                  console.log(err);
                  wx.hideLoading();
                  /* that.setData({
                                      canvasHidden: true
                                  }) */
                }
              });
            }
          },
          ctx
        );
      }, 200);
    }
  },

  onLoad() {
    const that = this;
    const TITLE = "弘康多倍保重大疾病保险";
    const DESC = "105种重疾+55种轻症重疾赔付3次轻症赔付2次";
    const PRICE = "￥570.00";
    const QRDESC = "长按识别小程序  立即购买";
    const SHARESOURCE = "分享自新一站保险网";
    const IMGWIDTH = 350;
    // https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx8f0b61d64905354e&secret=c1928043cd38c537d94a53e7b9777881
    // https://api.weixin.qq.com/wxa/getwxacode?access_token=ACCESS_TOKEN
    wx.request({
      url:
        "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx8f0b61d64905354e&secret=c1928043cd38c537d94a53e7b9777881", //仅为示例，并非真实的接口地址
      header: {
        "content-type": "application/json" // 默认值
      },
      success: function(resp) {
        // console.log(res.data.access_token);
        wx.getImageInfo({
          src: "../../image/bg.jpg",
          success: function(res) {
            let yOffset = 20;
            console.log(
              "---------------img1-----------succ",
              resp.data.access_token
            );
            const ctx = wx.createCanvasContext("shareCanvas");
            ctx.drawImage(res.path, yOffset, yOffset, IMGWIDTH, IMGWIDTH);
            ctx.stroke();
            //绘制标题文字
            yOffset = yOffset + IMGWIDTH;
            ctx.setFontSize(18);
            ctx.setFillStyle("#333333");
            ctx.fillText(TITLE, 20, 400);
            //绘制副标题
            ctx.setFontSize(16);
            ctx.setFillStyle("#666");
            ctx.fillText(DESC, 20, 420);
            //绘制虚线
            ctx.setFillStyle("#000");
            ctx.setLineDash([5, 10], 5);
            ctx.moveTo(10, 440);
            ctx.lineTo(550, 440);
            // 绘制小程序描述
            ctx.setFontSize(16);
            ctx.setFillStyle("#000");
            ctx.fillText(QRDESC, 100, 470);
            // 绘制分享来源文案
            ctx.setFontSize(14);
            ctx.setFillStyle("#666");
            ctx.fillText(SHARESOURCE, 100, 490);
            ctx.stroke();
            ctx.draw();

            /* wx.request({
              method: 'POST',
              url: `https://api.weixin.qq.com/wxa/getwxacode?access_token=${resp.data.access_token}`,
              data: {
                path: 'pages/index/main' ,
              },
              success: function (resx) {
                console.log('---------------img2-----------succ', resx);
                // 小程序码
                const qrImgSize = 180;
                ctx.drawImage(resx.data, (600 - qrImgSize) / 2, 530, qrImgSize, qrImgSize);
                ctx.stroke()
                ctx.draw()
              },
              fail: function(resf) {
                console.log('---------------img2-----------fail', resf);
              }
            }) */
          },
          fail: function(res) {
            console.log("---------------img1-----------fail");
          }
        });
      }
    });
  }
};
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
.canvas {
  z-index: 999;
  margin: 60rpx auto 0;
  padding: 40rpx;
  width: 620rpx;
  height: 900rpx;
  border-radius: 3%;
  background: #fff;
}
.mask {
  /* position: fixed; */
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#0f000000, 0, endColorstr=#0f000000, 0);
  background: rgba(0, 0, 0, 0.3);
  z-index: 998;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease;
  opacity: 1;
  visibility: visible;
  transition: all 0.3s ease;
}
.save {
  z-index: 999;
}
</style>
