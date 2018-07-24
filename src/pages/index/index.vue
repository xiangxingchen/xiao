<template>
<div class="content">
    <div class="product-list__topbar">
      <ul class="topbar-list">
        <li class="topbar-item" v-on:click="sortvisibility = !sortvisibility;bvisibility=false">排序<span class="topbar-item__icon hct-font-icon hct-font-icon-orderby"></span></li>
        <li class="topbar-item" v-on:click="bvisibility = !bvisibility;sortvisibility=false">
          特色保障<span v-bind:class="{'topbar-item__icon hct-font-icon hct-font-icon-arrow-down': true, 'hct-font-show': bvisibility }"></span>
        </li>
        <li class="topbar-item" v-on:click="fvisibility = !fvisibility;sortvisibility=false">筛选<span class="topbar-item__icon hct-font-icon hct-font-icon-filter"></span></li>
      </ul>
    </div>
    <!-- 排序 -->
      <ul v-bind:class="{'sort': true, 'sort-show': sortvisibility }">
        <li v-for="item in sort" :key="item.value" v-bind:class="{ 'sort-item': true, 'sort-item_active': item.selected }" v-on:click="selected(item.value)">
          <div class="sort-name">{{item.name}}</div>
          <div v-bind:class="{'sort-value': true,  'sort-value_active': item.selected }"><i class="hct-font-icon hct-font-icon-check"></i></div>
        </li>
      </ul>
    <!-- 特色保障 -->
    <div v-bind:class="{'im-win': true, 'im-win_show': bvisibility }">
      <ul>
    <!-- scroll-view小程序组件 -->
      <scroll-view scroll-y class="im-dropSelectCheckbox-target__scroll" bindscrolltoupper="upper" bindscrolltolower="lower" bindscroll="scroll">
        <li v-for="item in benefitFilter" :key="item.code" class="hct-form-item-box">
          <div class="hct-form-item">
            <div class="hct-form-item__label" @click="benefitClick(item.code)">
              <input type="checkbox" class="hct-form-item__label-checkbox" :ckecked="item.selected" />
              <label class="hct-form-item__label-txt">{{item.name}}</label>
            </div>
            <div class="hct-form-item-content">
              <i v-bind:class="{'hct-font-icon hct-font-icon-arrow-down': true, 'hct-font-show': item.explainvisibility }"
              v-on:click="item.explainvisibility = !item.explainvisibility"></i>
            </div>
          </div>
           <div v-bind:class="{'hct-form-item-toggle': true, 'hct-form-item-toggle-show': item.explainvisibility }">{{item.explain}}</div>
        </li>
      </scroll-view>

      </ul>
      <div class="im-win__ft">
        <button class="hct-button-hollow ">重置</button>
        <button class="hct-button-primary">完成</button>
      </div>
    </div>
    <!-- 筛选 -->
    <div v-bind:class="{'filter': true, 'filter-show': fvisibility }">
      <scroll-view scroll-y class="filter-scroll" bindscrolltoupper="upper" bindscrolltolower="lower" bindscroll="scroll">
        <filter v-for="item in tags" :key="item.code" :filterData="item" @selectChange="filterSelectChange"></filter>
      </scroll-view>
      <div class="filter-bottom">
        <button class="hct-button-hollow ">重置</button>
        <button class="hct-button-primary">完成</button>
      </div>
    </div>
    
    <ul v-for="item in packProd" :key="item.packIdEn">
      <productCard :product="item"></productCard>
    </ul>
    <!-- catchtouchmove小程序属性 -->
    <div v-bind:class="{'mask': true, 'mask-show': sortvisibility }" v-on:click.prevent="sortvisibility = !sortvisibility" catchtouchmove='true'></div>
    <div v-bind:class="{'mask': true, 'mask-show': bvisibility }" v-on:click="bvisibility = !bvisibility" catchtouchmove='true'></div>
    <div v-bind:class="{'mask': true, 'mask-show-filter': fvisibility }" v-on:click="fvisibility = !fvisibility" catchtouchmove='true'></div>
</div>

</template>

<script>
import productCard from '@/components/productCard';
import filter from '@/components/filter';

export default {
  data() {
    return {
      userInfo: {},
      packProd: [],
      tags: [],
      sort: [
        { name: '智能排序', value: 1, selected: true },
        { name: '销量由高到低排序', value: 2, selected: false },
        { name: '价格由低到高排序', value: 3, selected: false },
        { name: '价格由高到低排序', value: 4, selected: false },
      ],
      sortvisibility: false,
      bvisibility: false,
      fvisibility: false,
      benefitFilter: [],
      filters: {
        a: 1,
        b: [],
        c: '',
        d: '',
      },
    };
  },

  components: {
    productCard,
    filter,
  },
  methods: {
    selected(key) {
      const sort = this.sort.map((item) => {
        if (key === item.value) {
          return { ...item, selected: true };
        }
        return { ...item, selected: false };
      });
      this.sort = sort;
      this.filters.a = key;
      console.log(this.filters);
      this.sortvisibility = !this.sortvisibility;
    },
    benefitClick(code) {
      const benefitFilter = this.benefitFilter.map((item) => {
        if (code === item.value) {
          return { ...item, selected: true };
        }
        return { ...item, selected: false };
      });
      this.benefitFilter = benefitFilter;
    },
    filterSelectChange(data) {
      console.log('-----', data);
    },
  },


  beforeCreate() {
    console.log(this.$store);
    wx.request({
      url: `http://cx.xyz.cn/api/product/packs/search?cid=101&tags=101-03&pageNo=1&platform=iOS$time=${new Date().getTime()}`, // 仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json',
      },
      success: (res) => {
        const { packProdDTO, tags } = res.data;
        const prod = [];
        packProdDTO.map((pack) => {
          const { packBaseInfoDTO, simplePropDtos, insComCode } = pack;
          const url = `http://www.xyz.cn/p/prodpic.do?xcase=showPic&logoType=23&prodId=${
            packBaseInfoDTO.packIdEn
          }`;
          const logo = `http://www.xyz.cn/p/brand.do?xcase=showLogoImg&comCode=${insComCode}&comId=${
            packBaseInfoDTO.packDTO.insComId
          }&picLink=5`;
          prod.push({
            packName: packBaseInfoDTO.packDTO.packName,
            defaultPrice: packBaseInfoDTO.defaultPrice,
            discountPrice: packBaseInfoDTO.discountPrice,
            age: simplePropDtos.filter(i => i.type === 9)[0],
            timelimit: simplePropDtos.filter(i => i.type === 1)[0],
            benefit: simplePropDtos.filter(i => i.type === 2),
            showBenefit: simplePropDtos.filter(i => i.type === 2).slice(0, 2),
            logo,
            url,
            packIdEn: packBaseInfoDTO.packIdEn,
            packId: packBaseInfoDTO.packDTO.packId,
          });
          return pack;
        });
        const benefitFilter = tags.filter(item => item.code === '104')[0].values.map(benefit => ({ ...benefit, selected: false, explainvisibility: false }));
        this.packProd = prod;
        this.benefitFilter = benefitFilter;
        this.tags = tags.filter(item => item.code !== '104');
      },
    });
  },
};
</script>

<style scoped lang="less">
.content {
  background: #f5f5f5;
}
.product-list__topbar {
    position: relative;
    z-index: 1000;
    line-height: 1.09375rem;
    border-bottom: 1px solid #d9d9d9;
    background: #fff;
}
.topbar-list {
    display: flex;
    justify-content: space-around;
}
.topbar-item {
    display: flex;
    align-items: center;
    font-size: 0.375rem;
    color: #666;
}

.topbar-item__icon {
    display: flex;
    align-items: center;
    margin-left: 0.1875rem;
    vertical-align: middle;
}
.hct-font-icon:before {
    font-family: hct-font-icon;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    text-decoration: none;
    text-transform: none;
}
.topbar-item__icon::before {
    transform: rotate(0deg);
    transition: all 0.3s ease;
}
.sort-item {
  margin:0 40rpx;
  overflow: hidden;
  font-size: 28rpx;
  line-height: 70rpx;
  height: 70rpx;
  word-wrap: break-word;
  word-break: break-all;
  border-bottom: 1px solid #d9d9d9;
}
.sort{
  height: 0;
  position: absolute;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  opacity: 0;
  overflow: hidden;
  z-index: 999;
  width: 750rpx;
  background: #fff;
  border-bottom: 1px solid #d9d9d9;
  &-name {
    float: left;
  }
  &-show {
    height: 280rpx;
    opacity: 1;
    transform: translateY(0);
  }
}

.sort-value {
  float: right;
  display: none;
}
.sort-value_active {
  display: block;
}
.sort-item_active {
  color: #f75730
}
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#0f000000, 0, endColorstr=#0f000000, 0);
  background: rgba(0,0,0,.3);
  z-index: 998;
  visibility: hidden;
  opacity: 0;
  transition: all .3s ease;
}
.mask-show {
  opacity: 1;
  visibility: visible;
  transition: all .3s ease;
  &-filter{
    opacity: 1;
    visibility: visible;
    transition: all .3s ease;
    z-index: 1000;
  }
}
.show{
  display: block;
}
.im-win {
  height: 0;
  position: absolute;
  transform: translateY(-50%);
  transition: all 0.3s ease-in-out;
  opacity: 0;
  overflow: hidden;
  z-index: 999;
  display: flex;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -webkit-box-direction: normal;
  -moz-box-direction: normal;
  flex-direction: column;
  background: #fff;
  &_show {
    height: 570rpx;
    opacity: 1;
    transform: translateY(0);
  }
}
.im-dropSelectCheckbox-target__scroll {
    height: 500rpx;
    overflow: scroll;
    background-color: #fff;
    font-size: 28rpx;
    transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);
    transition-duration: 0ms;
    transform: translate(0px, 0px) translateZ(0px);
}
.hct-form-item {
  display: flex;
  flex: 1;
  box-align: center;
  align-items: center;
  position: relative;
  padding-top: 15rpx;
  padding-bottom: 15rpx;
  &-box {
    border-bottom: 1px solid #d9d9d9;
    padding-left: 24rpx;
  }
  &-content{
    flex: 1;
    display: flex;
    padding-right: 35rpx;
    margin-left: 24rpx;
    text-align: right;
    word-wrap: break-word;
    word-break: break-all;
    box-align: flex-end;
    justify-content: flex-end;
    box-pack: end;
  }
  &__label {
    color: #333;
    font-size: 28rpx;
    line-height: normal;
    align-items: center;
    box-align: center;
    display: flex;
    flex: 1;
    &-checkbox {
      width: 40rpx;
      height: 40rpx;
      line-height: 40rpx;
      text-align: center;
      background-color: #fff;
      font-size: 0;
      box-sizing: border-box;
      padding: 0;
    }
    &-txt{
      flex: 1;
      padding-left: 24rpx;
    }
  }
  &-toggle {
    height: 0;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    transition: all .3s ease;
    transform: rotateX(90deg);
    backface-visibility: hidden;
    transform-origin: 50% 0;
    padding-top: 0;
    padding-bottom: 0;
    color: #999;
    padding-left: 90rpx;
    margin-left: -24rpx;
    font-size: 24rpx;
    background: #f5f5f5;
    &-show {
      visibility: visible;
      transition: all .3s ease;
      height: auto;
      overflow: hidden;
      opacity: 1;
      transform: rotateX(0);
      transform-origin: 50% 0;
      padding-top: 24rpx;
      padding-bottom: 24rpx;
    }
  }
}

.hct-font-icon-arrow-down {
  transition: all .3s ease;
}
.hct-font-show {
  transform: rotateZ(180deg);
  transition: all .3s ease;
}
.hct-button-hollow {
    color: #333;
    border-color: #999;
    background: 0 0;
    font-size: 26rpx;
    height: 50rpx;
    line-height: 50rpx;
    border: 1px solid transparent;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    width: auto;
    padding-left: 24rpx;
    padding-right: 24rpx;
    border-radius: 0;
}
.hct-button-primary {
    color: #f75730;
    border-color: #f75730;
    background: 0 0;
    font-size: 26rpx;
    height: 50rpx;
    line-height: 50rpx;
    border: 1px solid transparent;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    border-radius: 0;
}
.im-win__ft {
    display: flex;
    align-items: center;
    justify-content: space-between;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -webkit-box-direction: normal;
    -moz-box-direction: normal;
    flex-direction: row;
    -webkit-flex-direction: row;
    padding: 0 46rpx;
    height: 70rpx;
    border-top: 1px solid #d9d9d9;
}

.filter {
  width: 632rpx;
  height: 100%;
  background: #fff;
  position: fixed;
  z-index: 9999;
  top: 0;
  right: -632rpx;
  left: auto;
  font-size: .34375rem;
  transition: all .3s ease;
  &-show{
    right: 0;
  }
  &-scroll {
    height: 92%;
    margin: 20rpx 40rpx 0;
  }
  &-bottom {
    position: relative;
    bottom: 0;
    left: 0;
    height: 6%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -webkit-box-direction: normal;
    -moz-box-direction: normal;
    flex-direction: row;
    -webkit-flex-direction: row;
    border-top: 1px solid #d9d9d9;
  }
}
</style>
