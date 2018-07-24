<template>
<div>
    <div class="evaluate_item" v-for="(eva, index) in planEva" :key="eva.detailId">
        <div class="evaluate_user">
            <img :src="'http://www.xyz.cn' + eva.loginImage" class="evaluate_photo" />
        </div>
        <div v-bind:class="{ 'evaluate_content': true, 'evaluate_content_first': index === 0}">
            <div class="evaluate_tip">
                <div class="evaluate_info">
                    <span class="evaluate_name">{{eva.loginName}}</span>
                    <time class="evaluate_time">{{eva.evaluateTime}}</time>
                </div>
                <div class="evaluate_grade">
                    <span class="hc-star_group">
                        <span class="hc-star_item hct-font-icon hct-font-icon-star-solid hc-active" v-for="(score, i) in eva.serviceScore" :key="i"></span>
                    </span>
                </div>
            </div>
            <p class="evaluate_message">{{eva.evaluationContent}}</p>
            <div class="evaluate_reply" v-if="eva.replyContent">新一站回复：{{eva.replyContent}}</div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  props: {
    planEva: {
      type: Object,
    },
  },
};
</script>

<style lang="less">
.evaluate {
    &_item {
        display: flex;
        padding-bottom: 35rpx;
        font-size:26rpx;
    }
    &_user {
        margin-right: 24rpx;;
        padding-top: 35rpx;
        img {
            width: 70rpx;
            height: 70rpx;
            border-radius: 70rpx;
        }
    }
    &_content {
        flex: 1;
        padding-top: 44rpx;
        border-top: 1px solid #d9d9d9;
        &_first {
            border: none;
        }
    }
    &_info {
        display: flex;
        align-items: center;
    }
    &_name {
        flex: 1;
    }
    &_time {
        color: #999;
        font-size: 26rpx;
    }
    &_grade {
        margin: 26rpx 0;
    }
    &_message {
        margin: 26rpx 0;
        font-size: 26rpx;
        color: #999;
        word-wrap: break-word;
        word-break: break-all;
    }
    &_reply {
        background: #f5f5f5;
        font-size: 26rpx;
        padding: 24rpx;
        color: #f69641;
        word-wrap: break-word;
        word-break: break-all;
    }
}
.hc-star {
    &_group{
        color: #d9d9d9;
        .hc-active {
            color: #ffbf2f;
        }
    }
    &_item {
        margin: 0 2rpx;
    }
}
</style>

