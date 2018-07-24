<template>
  <div class="product-list__item ">
        <a v-bind:href="url" class="product-list-link">
            <h3 class="product-list__product-title">{{prod.packName}}</h3>
            <div class="product-list__product-description">
                <span class="product-list__product-age">年龄: {{prod.age.propName}}</span>
                <span class="product-list__product-timelimit"> | 保险期间: {{prod.timelimit.propName}}</span>
            </div>
            <div class="product-list__product-infomation">
                <div class="product-list__product-price">
                    <span class="product-price-normall">
                        <span>¥</span>
                        <span class="product-price-big">{{prod.discountPrice}}<span style="font-size:0.75em">.00</span></span>
                        <span class="product-price-text">起</span>
                    </span>
                </div>
                <div class="product-list__product-discount">￥{{prod.defaultPrice}}</div>
                <div class="product-list__logo"><img :src="prod.logo" alt=" " class="brandLogo"/></div>
            </div>
        </a>

            <div class="product-terms-lists">
                <ul class="product-terms-list">
                    <li class="product-terms-item" v-for="item in showBenefit" :key="item.optionId">
                        <span class="benefitItem-name">{{item.propName}}</span>
                        <span class="benefitItem-value">{{item.optionName}}</span>
                    </li>
                </ul>
                <span v-bind:class="{ show: show, 'product-terms-mark': true, 'product-terms-mark_show': showMore }" v-on:click="greet"></span>
            </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  data() {
    return {
      prod: this.product,
      show: this.product.benefit.length > 2,
      showMore: this.product.showBenefit.length > 2,
      showBenefit: this.product.showBenefit,
      url: `/pages/detail/main?id=${this.product.packId}`,
    };
  },
  methods: {
    greet() {
      this.showBenefit = this.showMore ? this.product.benefit.slice(0, 2) : this.product.benefit;
      this.showMore = !this.showMore;
    },
  },
};
</script>

<style scoped>
.product-list__item {
    padding: 35rpx 0 30rpx;
    background: #fff;
    margin-top: 21rpx;
}
.product-list-link {
    padding: 0 24rpx;
}
.product-list__product-infomation {
    overflow: hidden;
}
.product-list__product-title {
    margin: 0 0 23.4375rpx;
    font-size: 32.8125rpx;
    font-weight: normal;
    color: #333;
    font-family: "PingFangSC";
}
.product-list__product-description {
    color: #999;
    font-size: 26rpx;
    margin-top: 21rpx;
    margin-bottom: 32rpx;
}
.product-list__logo {
    float: right;
    color: #999;
}
.brandLogo {
    display: block;
    width: 164rpx;
    height: 58rpx;
    border: none;
}
.product-list__product-price{
    float: left;
}
.product-price-normall {
    margin-left: 6rpx;
    font-size: 26rpx;
    color: #f75730;
}
.product-price-big {
    font-size: 46rpx;
    font-family: Arial;
}
.product-price-text {
    color: #999;
}
.product-list__product-discount {
    float: left;
    font-size: 26rpx;
    margin-top: 16rpx;
    text-decoration: line-through;
    color: #999;
}
.product-terms-list {
    margin-top: 35rpx;
    border-top: 1px solid #d9d9d9;
    padding: 30rpx 20rpx 0;
}
.product-terms-lists {
    position: relative;
    padding: 0 24rpx;
}
.product-terms-mark {
    display: none;
    position: absolute;
    top: -22rpx;
    right: 20rpx;
    width: 44rpx;
    height: 44rpx;
    background: url(../image/arrow.png) no-repeat left center;
    background-size: 100%;
    z-index: 1;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}
.product-terms-mark_show {
    -webkit-transform: rotateZ(180deg);
    transform: rotateZ(180deg);
}
.product-terms-item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    font-size: 28rpx;
    line-height: 40rpx;
    color: #333;
}
.show {
    display: block;
}
</style>
