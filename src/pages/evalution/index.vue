<template>
    <!-- 用户评价 -->
    <div id="evaluate">
        <div class="evaluate">
            <planEvalution :planEva="planEvalution" ></planEvalution>
        </div>
    </div>
</template>
<script>
import planEvalution from '@/components/planEvalution';

export default {
  components: {
    planEvalution,
  },
  data() {
    return {
      id: this.id,
      planEvalution: [],
    };
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
  },
};
</script>
<style scoped lang="less">
.evaluate {
    margin: 10rpx 26rpx;
}
</style>

