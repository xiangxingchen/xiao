<template>
<div class="filter-item">
    <h2 class="filter-title">{{filterData.name}}</h2>
    <div class="filter-wrap">
        <div v-for="item in filters" :key="item.code" v-bind:class="{ 'wx-radio': true, 'wx-radio-active': item.select }" v-on:click="onclick(item.code)">{{item.name}}</div>
    </div>
</div>
</template>
<script>
export default {
  props: {
    filterData: {
      type: Object,
      default: {
        name: '',
        values: [],
      },
    },
    selctedCode: {
      type: Array,
      default: [],
    },
  },
  data() {
    let count = 0;
    const selectFilters = this.filterData.values.map((filter) => {
      if (this.selctedCode.includes(filter.code)) {
        count += 1;
        return { ...filter, select: true };
      }
      return { ...filter, select: false };
    });
    const noRequire = count > 0 ? { name: '不限', code: '' } : { name: '不限', code: '', select: true };
    selectFilters.unshift(noRequire);
    return {
      filters: selectFilters,
    };
  },
  methods: {
    onclick(code) {
      const filters = this.filters.map((item) => {
        if (code === item.code) {
          return { ...item, select: true };
        }
        return { ...item, select: false };
      });
      this.filters = filters;
      this.$emit('selectChange', { code: this.filterData.code, value: code });
    },
  },
};
</script>

<style lang="less">
.filter-item {
    margin:20rpx 10rpx;
}
.filter-title {
    color: #666;
    font-size: 26rpx;
    line-height: 28rpx;
}
.filter-wrap {
    display: -webkit-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-flow: row wrap;
    margin-left: -24rpx;
}
.wx-radio{
    font-size: 26rpx;
    margin-top: 24rpx;
    width: 164rpx;
    height: 83rpx;
    line-height: 28rpx;
    border-width: 1px;
    display: -webkit-box;
    display: flex;
    box-sizing: border-box;
    border: 1rpx solid #ccc;
    color:#ccc;
    padding: 0rem 10rpx;
    text-align: center;
    margin-left: 24rpx;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    box-pack: center;
    box-align: center;
    border-radius: 0;
    background-color: #fff;
    &-active {
        color: #f75730;
        border-color: #f75730;
    }
}
</style>

