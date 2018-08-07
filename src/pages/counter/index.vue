<template>
  <div>
    <oneTitle :title="content[0]" v-if="content.length > 0"></oneTitle>
  </div>
</template>

<script>
// Use Vuex
import store from "./store";
import oneTitle from '@/components/oneTitle';
// import WXBizDataCrypt from "@/utils/WXBizDataCrypt";

export default {
  components: {
    oneTitle,
  },
  data() {
    return {
      content: [],
      weather: {},
      menu: {},
      token: ""
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
    const appId = "wx8f0b61d64905354e";
    const secret = "c1928043cd38c537d94a53e7b9777881";
   
  },
  onLoad: function() {
    console.log(this.$store.getters);
    this.menu = this.$store.getters.menu;
    this.weather = this.$store.getters.weather;
    this.content = this.$store.getters.content_list;

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

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
