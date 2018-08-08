<template>
  <div class="one">

    <!-- title -->
    <oneTitle :title="title" v-if="title"></oneTitle>

    <!-- menu -->
    <div class="menu">
      <div class="menu_title" @click="menuVisiable = !menuVisiable">
        一个 VOL.{{menu.vol}} <span v-bind:class="{'hct-font-icon hct-font-icon-arrow-down': true}"></span>
      </div>
      <div :class="{'menu_wrap': true, 'menu_show' : menuVisiable}">
        <div v-for="(item, index) in menu.list" :key="index">
          <div v-if="item.content_type == 1" class="menu_item">
            <div class="menu_icon">
              <span v-bind:class="{'hct-font-icon hct-font-icon-arrow-right': true}"></span>
              </div>
            <div class="menu_content">
              <div>{{item.tag.title}}</div>
              <div>{{item.title}}</div>
            </div>
          </div>
          <div v-else class="menu_item">
            <div class="menu_icon">
              <span v-bind:class="{'hct-font-icon hct-font-icon-arrow-right': true}"></span>
            </div>
            <div class="menu_content">
              <div>{{contentType[item.content_type]}}</div>
              <div>{{item.title}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="content_list.length > 0">
      <div v-for="(item, index) in content_list" :key="index">
        <div v-if="item.content_type == 1">
          <acticle :acticle="item" :tag="menu.list[index].tag.title"></acticle>
        </div>
        <div v-else>
          <acticle :acticle="item" :tag="contentType[item.content_type]"></acticle>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Use Vuex
import store from "./store";
import oneTitle from '@/components/oneTitle';
import acticle from '@/components/acticle';

export default {
  components: {
    oneTitle,
    acticle,
  },
  data() {
    return {
      contentType:{
        2: '连载',
        3: '问答',
        4: '音乐',
        5: '视频',
        6: '电台'
      },
      title: {},
      weather: {},
      menu: {},
      content_list: [],
      menuVisiable: false,
    };
  },
  onShareAppMessage(options) {
    console.log(111111111, options);
    return {
      title: "新贝网",
      path: "pages/counter/main",
      success: function(res) {
        console.log(res);
      }
    };
  },
  mounted() {
    this.$store.dispatch('getList');
  },
  onReady: function() {
    console.log(this.$store.getters);
    this.menu = this.$store.getters.menu;
    this.weather = this.$store.getters.weather;
    this.title = this.$store.getters.content_list[0];
    this.content_list = this.$store.getters.content_list.splice(1);

  },
  methods: {
    increment() {
      store.commit("increment");
    },
    decrement() {
      store.commit("decrement");
    },
    message() {}
  }
};
</script>

<style scoped lang="less">
.one{
  background: #f5f5f5;
}
.menu{
  background: #fff;
  margin: 20rpx 0;
  &_title{
    text-align: center;
    font-size: 28rpx;
    color: #333;
    height: 60rpx;
    line-height: 60rpx;
  }
  &_wrap{
    height: 0;
    opacity: 0;
    transition: all .3s ease;
  }
  &_show{
    opacity: 1;
    height:610rpx;
  }
  &_item{
    display: flex;
    align-items: center;
    font-size: 24rpx;
    padding-bottom:40rpx;
    color: #666;
  }
  &_icon{
    width:40rpx;
    padding-left:50rpx;
    color: #333;
  }
  &_content{
    flex: 1;
  }
}
.acticle{
  background: #fff;
}
</style>
