import {
    ajax
} from '../../../utils/util'

const app = getApp()

Page({
    data: {
        avatar: '',
        name: '',
        userCode: '',
        navs: [{
            name: '首页',
            icon: 'home',
            active: false,
            page: '/pages/product/list/list'
        }, {
            name: '订单',
            icon: 'order',
            active: false,
            page: '/pages/order/list/list'
        }, {
            name: '消息',
            icon: 'message',
            active: false,
            page: '/pages/message/list/list'
        }, {
            name: '服务',
            icon: 'service',
            active: true,
            page: '/pages/user/info/info'
        }]
    },
    onSetter() {
        wx.navigateTo({
            url: '/pages/user/setter/setter'
        })
    },
    onBill() {
        wx.navigateTo({
            url: '/pages/bill/list'
        })
    },
    onBank() {
        wx.navigateTo({
            url: '/pages/user/bank/bank'
        })
    },
    onGuidance() {
        wx.navigateTo({
            url: '/pages/user/guidance/list'
        })
    },
    // 底部导航
    onNav(e) {
        if (!e.currentTarget.dataset.isactive) {
            wx.navigateTo({
                url: e.currentTarget.dataset.page
            })
        }
    },
    onLoad: function(options) {
        const that = this
        let sessionId = wx.getStorageSync('sessionId')
        // 设置头像
        if (app.globalData.userInfo) {
            this.setData({
                avatar: app.globalData.userInfo.avatarUrl
            })
        }
        // 获取用户信息
        if (sessionId) getUserInfo()

        function getUserInfo() {
            ajax({
                url: '/userMerchant/user/getUserInfoSum.htm',
                method: 'POST',
                sessionId,
                param: {
                    isChoose: 1
                },
                callback: data => {
                    console.log(data)
                    that.setData({
                        userCode: data.data[0].userCode,
                        name: data.data[0].name
                    })
                }
            })
        }
    }
})