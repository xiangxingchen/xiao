<template>
<div class="title">
    <img :src="title.img_url" class="title_img"/>
    <div class="pic_info">{{title.title}} | {{title.pic_info}}</div>
    <div class="forward">{{title.forward}}</div>
    <div class="words_info">{{title.words_info}}</div>
    <div class="footer">
    </div>
</div>
</template>
<script>
export default {
  props: {
    title: {
      type: Object,
    },
  },
  data() {
      console.log(this.title);
    return {
      title: this.title,
    };
  },
};
</script>

<style lang="less" scoped>
.title{
  background: #fff;
  &_img{
  width: 750rpx;
  height: 500rpx;
  }
}
.pic_info{
  font-size: 24rpx;
  color: #999;
  text-align: center;
}
.forward {
  font-size: 28rpx;
  margin: 80rpx 60rpx;
}
.words_info {
  font-size: 24rpx;
  color: #999;
  text-align: center;
}
</style>

