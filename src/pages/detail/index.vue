<template>
    <div class="detail">
      <!-- 产品信息 -->
      <div class="intro" id="info">
          <span class="intro__brand">
            <img :src="dd" class="j-brandImg">
          </span>
          <div class="intro__photo">
            <img :src="dfgf" class="j-bannerImg">
            <div class="product-intro__image-tag hc-clearFix">
              <span class="product-intro__image-tag-text j-prodDiscountTag"></span>
              <span class="product-intro__image-tag-icon"></span>
            </div>
          </div>
          <div class="intro__info">
            <div class="intro__info-list"></div>
                <div class="intro__info-advances">
                  <ul class="intro__info-advances-list">
                      <!-- <li class="hct-button-inline" v-for="item in packDTO.suitablePeople" :key="item">
                          {{item}}
                      </li> -->
                  </ul>
                </div>
              <ul class="hc-info">
                  <li class="hc-info__item">
                    <span class="hc-info__label">适用人群：</span>
                    <span class="hc-info__text text">{{packDTO.suitablePeople}}</span>
                  </li>
                  <li class="hc-info__item">
                    <span class="hc-info__label">承保年龄：</span>
                    <span class="hc-info__text text">{{packDTO.agePeriods}}</span>
                  </li>
                  <li class="hc-info__item">
                    <span class="hc-info__label">保险期间：</span>
                    <span class="hc-info__text text">{{packDTO.insurePeriods}}</span>
                  </li>
                  <li class="hc-info__item">
                    <span class="hc-info__label">投保份数：</span>
                    <span class="hc-info__text text"> 每名被保险人最多可购买{{packDTO.limitInsuredBuyNum}}份</span>
                  </li>
                  <li class="hc-info__item">
                    <span class="hc-info__label">产品销量：</span>
                    <span class="hc-info__text text"> {{packDTO.saleNum}}</span>
                  </li>
                  <li class="hc-info__item">
                    <span class="hc-info__label">特别约定：</span>
                      <a href="javascript:void(0)" class="hc-link--normal j-insuredOccupational" target="_blank">
                            该产品适合“1-4级职业”人士投保
                      </a>
                  </li>   
              </ul>
            </div>
      </div>
      <!-- 相关产品 -->
      <div v-if="relateItem.length > 0">
         <scroll-view class="scroll-view_H" scroll-x style="width: 100%">
           <ul class="nav">
             <li v-for="item in relateItem" :key="item.itemId" v-bind:class="{ 'active': id == item.packId }">
              <a v-bind:href="'/pages/detail/main?id=' + item.packId">
                {{item.planName}}
              </a>
            </li>
           </ul>
        </scroll-view>
      </div>
      <!-- 保障项目 -->
      <div id="benefits">
        <div v-if="packDTO.benefits.length > 0" class="benefits">
          <benefit :benefits="packDTO.benefits"></benefit>
        </div>
      </div>
      <!-- 用户评价 -->
      <div id="evaluate">
        <div v-if="planEvalution.length > 0" class="evaluate">
          <h3 class="evaluate_title">用户评价</h3>
          <planEvalution :planEva="planEva"></planEvalution>
          <div v-if="planEvalution.length > 2" class="evaluate_more">
            <a :href="'/pages/evalution/main?id=' + id">更多评论</a>
          </div>
        </div>
      </div>
      <!-- 头部浮动导航 -->
      <div>
        <ul v-bind:class="{'product-tab': true, 'hct-fixed-tab': showTap }">
            <li v-bind:class="{'hc-tab__item': true, 'hc-tab__item_active': item.select }" v-for="(item, index) in navTap" :key="item.value" @click="scrollToIndex(index)">{{item.name}}</li>
          </ul>
      </div>

      <!-- 底部悬浮按钮 -->
      <div class="fixed-button-wrap">
        <div class="sold-out__tip">该产品已经下架啦~</div>
        <div class="fixed-button">
        <div class="fixed-button__tool fixed-button__service onlineServiceBtn">
          <span class="im-svg-service-normal fixed-button__tool-icon"></span>
          <span class="fixed-button__tool-text">客服</span>
        </div>
        <div class="fixed-button__tool fixed-button__collect j-collect ">
          <span class="im-svg-star-normal fixed-button__tool-icon fixed-button__collect-not-collect"></span>
          <span class="im-svg-star-active fixed-button__tool-icon fixed-button__collect-collect"></span>
          <span class="fixed-button__tool-text fixed-button__collect-not-collect">收藏</span>
          <span class="fixed-button__tool-text fixed-button__collect-collect">已收藏</span>
        </div>
          <div class="fixed-button__price">
            <span class="fixed-button__price-num">
              <dfn class="field-price-symbol fixed-button__price-symbol">¥</dfn>
              <em class="field-price-num">{{packDTO.discountPrice}}</em>
              <em class="field-price-extra"></em>
              </span>
            <div class="field-price-trial hct-color--gray" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">点击试算价格</div>
          </div>
          <button type="button" class="hct-button hct-button--noBorderRadius fixed-button__button">
            立即投保
          </button>
      </div>
      </div>
    </div>
</template>
<script>
import benefit from '@/components/benefit';
import planEvalution from '@/components/planEvalution';

export default {
  components: {
    benefit,
    planEvalution,
  },
  data() {
    return {
      id: this.id,
      packDTO: {
        suitablePeople: [],
        benefits: [],
      },
      relateItem: [],
      planEvalution: [],
      showTap: false,
      scrollTo: [],
      navTap: [
        { name: '保障内容', value: 'benefits', select: false },
        { name: '用户评价', value: 'evaluate', select: false },
      ],
    };
  },
  computed: {
    // 计算属性的 getter
    planEva() {
      return this.planEvalution.slice(0, 2);
    },
  },
  methods: {
    scrollToIndex(index) {
      wx.pageScrollTo({
        scrollTop: this.scrollTo[index],
        duration: 300,
      });
    },
  },
  mounted() {
    const query = wx.createSelectorQuery();
    query.select('#benefits').boundingClientRect();
    query.select('#evaluate').boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec((res) => {
      this.scrollTo[0] = res[0].top;
      this.scrollTo[1] = res[1].top;
    });
  },
  onPageScroll() {
    const query = wx.createSelectorQuery();
    query.select('#benefits').boundingClientRect();
    query.select('#evaluate').boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec((res) => {
      if (res[0].top > 0) {
        this.showTap = false;
      } else {
        this.showTap = true;
        if (res[1].top - 70 > 0) {
          this.navTap[0].select = true;
          this.navTap[1].select = false;
        } else {
          this.navTap[0].select = false;
          this.navTap[1].select = true;
        }
      }
    });
  },
  // 小程序方法
  onLoad(options) {
    this.id = options.id;
  },
  beforeMount() {
    wx.request({
      url: `http://cx.xyz.cn/api/evaluation/plans/get?planId=${this.id}&platform=iOS`,
      header: {
        'content-type': 'application/json',
      },
      success: (res) => {
        const { planEvalutionDetails } = res.data.planEvalution;
        this.planEvalution = planEvalutionDetails;
      },
    });
    wx.request({
      url: `http://cx.xyz.cn/api/product/v2/plan/get?planId=${this.id}&platform=iOS`,
      header: {
        'content-type': 'application/json',
      },
      success: (res) => {
        const { prodBaseDTO, packPropDTO, packRelateDTO } = res.data.pack;
        const packData = {
          suitablePeople: prodBaseDTO.packDTO.suitablePeople,
          agePeriods: packPropDTO.agePeriodsDto.explanation,
          insurePeriods: packPropDTO.insurePeriodsDto.explanation,
          saleNum: prodBaseDTO.packDTO.saleNum,
          limitInsuredBuyNum: prodBaseDTO.prodDTO.limitInsuredBuyNum,
          benefits: packPropDTO.benefitesCategoryDtos,
          discountPrice: prodBaseDTO.discountPrice,
        };
        wx.setNavigationBarTitle({ title: prodBaseDTO.packDTO.packName });
        this.packDTO = packData;
        this.relateItem = packRelateDTO.relateItemDTOs;
      },
    });
  },
};
</script>
<style scoped lang="less">
.detail {
  background: #f5f5f5;
  padding-bottom:10rpx;
}
.benefits {
  background: #fff;
}
.intro {
  position: relative;
  margin-bottom: 24rpx;
    &__photo {
      position: relative;
      img{
        display: block;
        width: 100%;
      }
    }
    &__brand {
      position: absolute;
      right: 0;
      width: 164rpx;
      height: 58rpx;
      top: 352rpx;
      background: #fff;
      border-radius: 58rpx 0 0 58rpx;
      text-align: center;
      overflow: hidden;
      z-index: 1;
      img {
        width: 164rpx;
      }
    }
    &__info {
      background: #fff;
      padding: 24rpx;
    }
}
.hc-info {
  font-size: 26rpx;
  margin-top: 10rpx;
  &__item{
    margin: 11rpx 0 0;
    display: flex;
  }
  &__label{
    color: #999;
  }
  &__text {
    flex: 1;
  }
}
.hct-button-inline {
  height: auto;
  padding: 4rpx 9rpx;
  line-height: 1;
  font-size: 26rpx;
  margin-bottom: 6rpx;
  color: #333;
  display: inline-block;
  vertical-align: middle;
  border: 1rpx solid transparent;
  border-color: #999;
  box-sizing: border-box;
  width: auto;
  margin: 0 2rpx;
}
.scroll-view_H{
  white-space: nowrap;
}
.nav {
  background: #fff;
  border: 1rpx solid #f5f5f5;
  li {
    display: inline-block;
    padding: 20rpx 30rpx;
    font-size: 32rpx;
    background: #fff;
  }
  .active {
    border-bottom: 4rpx solid #f75730;
    color: #f75730;
  }
}
.evaluate {
    margin: 24rpx 0;
    font-size: 26rpx;
    padding: 0 24rpx 24rpx;
    line-height: 1.5;
    background: #fff;
    word-wrap: break-word;
    word-break: break-all;
    &_title {
      display: block;
      border-width: 1rpx 0;
      border: 0 none;
      border-top: 0;
      background: #fff;
      text-align: center;
      font-size: 32rpx;
      line-height: 1;
      padding-top: 38rpx;
      padding-bottom: 38rpx;
      border-bottom: 1px solid #eaeaea;
    }
    &_more {
      padding: 46rpx 0;
      border-top: 1px solid #d9d9d9;
      display: flex;
      align-items: center;
      justify-content:center;
      a {
        color: #333;
        font-size: 26rpx;
        height: 50rpx;
        line-height: 50rpx;
        border: 1px solid #999;
        display: inline-block;
        vertical-align: middle;
        box-sizing: border-box;
        text-align: center;
        padding-left: 24rpx;
        padding-right: 24rpx;
        width: auto;
      }
    }
}
.fixed-button-wrap {
    margin-bottom: 118rpx;
}
.sold-out__tip {
    display: none;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 88rpx;
    height: 70rpx;
    text-align: center;
    line-height: 70rpx;
    background: #999;
    color: #fff;
    font-size: 26rpx;
    z-index: 99999999999;
}
.fixed-button {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateZ(0);
    width: 750rpx;
    margin: auto;
    z-index: 101;
    background: #fff;
    text-align: center;
    height: 88rpx;
    line-height: 88rpx;
    border-top: 1px solid #eee;
    display: flex;
}
.fixed-button__tool {
    width: 106rpx;
    border-right: 1px solid #d9d9d9;
    text-align: center;
}
.im-svg-service-normal {
    display: inline-block;
    width: 52rpx;
    height: 52rpx;
    background: url(../../image/customer-service-normal.svg) 0 0 no-repeat;
    background-size: 52rpx 52rpx;
}
.im-svg-star-normal {
    display: inline-block;
    width: 52rpx;
    height: 52rpx;
    background: url(../../image/star-normal.svg) 0 0 no-repeat;
    background-size: 52rpx 52rpx;
}
.fixed-button__tool-icon {
    display: block;
    background-position: center center;
    width: 100%;
    margin-top: 7rpx;
}
.fixed-button__tool-text {
    display: block;
    color: #999;
    font-size: 22rpx;
    line-height: 1.3;
}
.fixed-button__price {
    position: relative;
    color: #f75730;
    font-size: 46rpx;
    text-align: center;
    align-items: center;
    justify-content: center;
    flex: 1;
}
.fixed-button__price-num {
  display: flex;
  justify-content: center;
}
.fixed-button__price {
  justify-content: center;
  display: flex;
}
.fixed-button__price-symbol {
    font-size: 26rpx;
    align-items: flex-end;
    margin-top: 8rpx;
    display: flex;
    font-style: normal;
}
.field-price-extra {
    color: #999;
    font-size: 26rpx;
    margin-top: 10rpx;
    margin-left: 12rpx;
    text-decoration: line-through;
}
.field-price-trial {
    display: none;
    font-size: 22rpx;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -30rpx;
    margin: auto;
    color: #ccc!important;
    &_show {
      display: block;
      transform-origin: 0px 0px 0px;
      opacity: 1;
      transform: scale(1, 1);
    }
}
.fixed-button__button {
    line-height: 84rpx;
    text-align: center;
    background: -webkit-gradient(linear,0 0,100% 0,from(#fc704e),to(#ff9547));
    box-sizing: border-box;
    width: 100%;
    display: inline-block;
    vertical-align: middle;
    user-select: none;
    appearance: none;
    border-radius: 0;
    border: none;
    color: #fff;
    font-size: 32rpx;
    font-weight: normal;
    height: auto;
    flex: 1;
    -webkit-align-items: center;
    align-items: center;
    justify-content: center;
}
.product-tab {
  opacity: 0;
  visibility: hidden;
  z-index: -1;
  height: 0;
  overflow: hidden;
}
.hct-fixed-tab {
  position: fixed;
  visibility: visible;
  opacity: 1;
  top: 0;
  z-index: 5;
  height: auto;
  display: flex;
  background: #fff;
  overflow: hidden;
  left: 0;
  width: 750rpx;
}
.hc-tab__item {
  flex: 1;
  text-align: center;
  line-height: 70rpx;
  border-left: 2rpx solid #d9d9d9;
  border-bottom: 2rpx solid #d9d9d9;
  box-sizing: border-box;
  font-size: 28rpx;
  &_active {
    color: #f75730;
    border-bottom: 4rpx solid #f75730;
  }
}
</style>

