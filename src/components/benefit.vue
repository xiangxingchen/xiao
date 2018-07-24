<template>
<div class="benefit">
    <ul>
        <li v-for="benefit in benefitArray" :key="benefit.createId">
            <h4 class="title">{{benefit.categoryName}}</h4>
            <ul class="benefit-item">
                <li v-for="(item, pi) in benefit.protectPropDTOs" :key="pi">
                    <h5 class="sub-title">
                        <div class="name">{{item.name}}</div>
                        <span class="value">{{item.optionDTOs[0].explanation}}</span>
                        <b class="hct-font-icon hct-font-icon-arrow-up expanded" @click="item.selected= !item.selected"></b>
                    </h5>
                    <div v-bind:class="{'content': true, 'content-active': item.selected }">
                        {{item.explanation}}
                    </div>
                </li>
            </ul>
        </li>
    </ul>
</div>
</template>
<script>
export default {
  props: {
    benefits: {
      type: Array,
      default: [],
    },
  },
  data() {
    const benefits = this.benefits.map((benefit) => {
      const protectPropDTOs = [];
      benefit.protectPropDTOs.map((p) => {
        protectPropDTOs.push({ ...p, selected: false });
        return p;
      });
      return { ...benefit, protectPropDTOs };
    });
    return {
      benefitArray: benefits,
    };
  },
};
</script>

<style lang="less">
.benefit {
    padding: 0 24rpx;
    .title {
        background: #fff;
        border-bottom: dashed #d9d9d9;
        border-width: 1px 0;
        font-size: 28rpx;
        color: #333;
        padding:20rpx 0;
    }
    &-item {
        padding: 0 24rpx;
    }
    .sub-title{
        border-bottom: 1px dashed #d9d9d9;
        display: flex;
        line-height: 70rpx;
        font-size: 28rpx;
        .name{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #666;
            flex: 1;
        }
        .value {
            color: #f75730;
        }
        .expanded{
            color: #ccc;
            transition: all 0.3s ease-in-out;
            padding: 0 0.3125rem;
            margin: 0 -0.3125rem 0 -0.078125rem;
            text-align: center;
            transform: rotateZ(180deg);
        }
        .active{
            transform: none;
            height: auto;
            opacity: 1;
        }
    }
    .content{
        height: 0;
        overflow: hidden;
        border-bottom: 1px dashed #ccc;
        opacity: 0;
        transform: scale(1, 0.5);
        transform-origin: top;
        transition: all 0.3s ease-out;
        font-size: 0.34375rem;
        color: #999;
        padding: 10rpx 0;
        &-active{
            transition: all 0.3s ease-in-out;
            transform: none;
            height: auto;
            opacity: 1;
        }
    }
}
</style>

