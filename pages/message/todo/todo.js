import {
    myToast
} from '../../../utils/util'

const app = getApp()
Page({
    data: {
        status: 1,
        lists: [
            1, 2, 3,1, 2, 3,1, 2, 31, 2, 31, 2, 3
        ]
    },
    onList(e) {
        this.setData({
            status: e.currentTarget.dataset.status
        })
        this.getList(e.currentTarget.dataset.status)
    },
    getList: id => {
        console.log(id)
    },
    //下拉刷新
    onPullDownRefresh: () => {
        wx.showNavigationBarLoading()
        wx.showLoading({
            title: '加载中...'
        })
        //模拟加载
        setTimeout(function(){
            // complete
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
            wx.hideLoading()
        },1500);
    }
})