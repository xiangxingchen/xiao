<template>
<div class="acticle">
    <div class="acticle_tag">- {{tag}} - </div>
    <div class="acticle_title">{{acticle.title}}</div>
    <div class="acticle_author">文 / {{acticle.author.user_name}}</div>
    <img :src="acticle.img_url" class="acticle_img"/>
    <div class="acticle_forward">{{acticle.forward}}</div>
    <div class="acticle_footer">
        <div class="acticle_time">{{time}}</div>
        <div class="acticle_share">
            <span class="hct-font-icon hct-font-icon-share"></span>
        </div>
    </div>
</div>
</template>
<script>
import moment from 'moment';
export default {
  props: {
    acticle: {
      type: Object,
    },
    tag: {
      type: String,
    }
  },
  data() {
    return {
      acticle: this.acticle,
    };
  },
  computed:{
    time() {
      const post_date = moment(this.acticle.post_date).format('MM-DD');
      const today_date = moment().format('MM-DD');
      return post_date == today_date ? '今天' : post_date;
    },
  }
};
</script>

<style lang="less" scoped>
.acticle {
    background: #fff;
    margin: 20rpx 0;
    padding: 20rpx 40rpx;
    &_tag{
        text-align: center;
        color: #666;
        font-size: 26rpx;
    }
    &_title{
        color: #333;
        font-size: 36rpx;
        margin-top: 20rpx;
    }
    &_author{
        font-size: 26rpx;
        color: #666;
        margin: 30rpx 0 20rpx 0;
    }
    &_img{
        width: 670rpx;
        height: 400rpx;
    }
    &_forward{
        color: #666;
        font-size: 26rpx;
        margin-top: 15rpx;
    }
    &_footer{
        margin-top: 60rpx;
        font-size: 28rpx;
        color: #666;
        margin-top: 30rpx;
        display: flex;
        align-items: center;
    }
    &_time{
        width: 100rpx;
    }
    &_share{
        flex: 1;
        text-align: right;
    }
}
</style>

