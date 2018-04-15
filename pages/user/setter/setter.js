import {
    myToast,
    ajax
} from '../../../utils/util'

const app = getApp()
const sessionId = wx.getStorageSync('sessionId')
Page({
    data: {
        avatar: '',
        name: '',
        userCode: '',
        identityNo: '',
        payPwd: ''
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
                    ajax({
                        url: '/j_spring_security_logout',
                        method: 'GET',
                        sessionId: sessionId,
                        param: {},
                        callback: data => {
                            if (data.success) {
                                console.log(data)
                                // TODO 接口请求不成功
                                wx.navigateTo({
                                    url: '/pages/login/login'
                                })
                            } else {
                                myToast(data.resultMsg)
                            }
                        }
                    })
                }
            }
        })
    },
    onLoad: function(options) {
        const that = this
        // 设置头像
        if (app.globalData.userInfo) {
            this.setData({
                avatar: app.globalData.userInfo.avatarUrl
            })
        }
        // 获取用户信息
        if (sessionId) {
            ajax({
                url: '/userMerchant/user/getUserInfoSum.htm',
                method: 'POST',
                sessionId: sessionId,
                param: {
                    isChoose: 1
                },
                callback: data => {
                    if (data.success) {
                        console.log(data)
                        that.setData({
                            name: data.data[0].name,
                            userCode: data.data[0].userCode,
                            identityNo: data.data[0].identityNo,
                            payPwd: data.data[0].payPwd
                        })
                    } else {
                        myToast(data.resultMsg)
                    }
                }
            })
        }
    }
})