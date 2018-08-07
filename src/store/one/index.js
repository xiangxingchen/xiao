import { Commit } from 'vuex';
// import axios from 'axios';

const initState = {
    tenDayIdlist: [],
    today: {},
}

const getters = {
    content_list: state => state.today.content_list,
    menu: state => state.today.menu,
    weather: state => state.today.weather,
}

const actions = {
    // 要加context，直接传参commit会报错
    getList({ dispatch, commit }) {
        wx.request({
            url:"http://v3.wufazhuce.com:8000/api/onelist/idlist/?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android",
            success: function (res) {
                const list = res.data.data;
                commit('saveList', list);
                dispatch('getOneList', { id: list[0] });
            },
            fail: function (res) {
                console.log("fail", res);
            }
        });
    },
    getOneList({ commit }, { id }){
        wx.request({
            url:`http://v3.wufazhuce.com:8000/api/onelist/${id}/0?cchannel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`,
            success: function (res) {
                commit('saveToday', res.data.data);
            },
            fail: function (res) {
                console.log("fail", res);
            }
        });
        // 
    }

}

const mutations = {
    saveList(state, v) {
        this.state.one.tenDayIdlist = v;
    },
    saveToday(state, v) {
        this.state.one.today = v;
    }
}

export default {
    state: initState,
    getters,
    actions,
    mutations,
}