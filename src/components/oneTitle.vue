<template>
<div>
    <img :src="title.img_url" class="title_img"/>
    <div class="pic_info">{{title.title}} | {{title.pic_info}}</div>
    <div class="forward">{{title.forward}}</div>
    <div class="words_info">{{title.words_info}}</div>
    <div class="footer">
        sdfsdfsdfsdf
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
.title_img {
  width: 750rpx;
  height: 500rpx;
}
</style>

