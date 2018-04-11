import {
    myToast
} from '../../../utils/util'

const app = getApp()
Page({
    data: {
        avatar: ''
    },
    onCertify() {
        wx.navigateTo({
            url: '/pages/user/certify/certify'
        })
    },
    onLoginPwd() {
        wx.navigateTo({
            url: '/pages/password/login/find'
        })
    },
    onSetPayPwd() {
        wx.navigateTo({
            url: '/pages/password/pay/set'
        })
    },
    onModifyPayPwd() {
        wx.navigateTo({
            url: '/pages/password/pay/modify'
        })
    },
    onAbout() {
        wx.navigateTo({
            url: '/pages/user/about/about'
        })
    },
    // 退出登录
    loginOut() {
        wx.showModal({
            title: '',
            content: '您确认退出?',
            success: (res) => {
                if (res.confirm) {
                    wx.showLoading()
                    wx.request({
                        url: app.globalData.API + '/j_spring_security_logout',
                        method: 'GET',
                        data: {},
                        success: res => {
                            const datas = res.data
                            console.log(datas)
                            if (datas.success) {
                                wx.navigateTo({
                                    url: '/pages/login/login'
                                })
                            } else {
                                myToast(datas.resultMsg);
                            }
                        },
                        complete: res => {
                            wx.hideLoading()
                        }
                    })
                }
            }
        })
    },
    onLoad: function(options) {
        // 设置头像
        this.setData({
            avatar: app.globalData.userInfo.avatarUrl
        })
        // 获取用户信息
        wx.showLoading()
        wx.request({
            url: app.globalData.API + '/userMerchant/user/getUserInfoSum.htm',
            method: 'POST',
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            data: {
                isChoose: 1
            },
            success: res => {
                const datas = res.data
                console.log(datas)
            },
            complete: res => {
                wx.hideLoading()
            }
        })
    }
})