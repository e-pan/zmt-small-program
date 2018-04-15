import {
    myToast,
    ajax
} from '../../../utils/util'

const app = getApp()
const sessionId = wx.getStorageSync('sessionId')
Page({
    data: {
        status: 0,
        lists: []
    },
    onList(e) {
        this.setData({
            status: e.currentTarget.dataset.status
        })
        this.getList(e.currentTarget.dataset.status)
    },
    // 获取代办事项列表
    getList(id) {
        ajax({
            url: '/message/user/getMessage.htm',
            method: 'POST',
            sessionId,
            param: {
                type: 1,
                sourceTypeId: 0,
                handleResult: id
            },
            callback: data => {
                if (data.success) {
                    this.setData({
                        lists: data.data
                    })
                } else {
                    if (data.code == 'record_not_exsist') {
                        this.setData({
                            lists: []
                        })
                    } else {
                        myToast(data.resultMsg)
                    }
                }
            }
        })
    },
    //下拉刷新
    onPullDownRefresh() {
        wx.showNavigationBarLoading()
        wx.showLoading({
            title: '加载中...'
        })
        this.getList(this.data.status)
        //模拟加载
        setTimeout(function(){
            // complete
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
            wx.hideLoading()
        },1500);
    },
    onLoad: function (option) {
        this.getList(this.data.status)
    }
})