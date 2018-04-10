import {
    mobileValidate,
    myToast,
    pwdValidate
} from '../../utils/util'

const app = getApp()
Page({
    data: {
        mobile: '',
        password: '',
        againPwd: '',
        eye: '../../images/svg/eye.svg',
        inputType: 'password',
        message: '获取验证码',
        codeDisabled: false
    },
    getMobile(e) {
        this.setData({
            mobile: e.detail.value
        })
    },
    getCheckcode(e) {
        this.setData({
            checkcode: e.detail.value
        })
    },
    getPwd(e) {
        this.setData({
            password: e.detail.value
        })
    },
    getPwdAgain(e) {
        this.setData({
            againPwd: e.detail.value
        })
    },
    agreement() {
        wx.navigateTo({
            url: '/pages/agreement/agreement'
        })
    },
    // 显示密码为明文
    togglePwd() {
        if (this.data.inputType == 'password') {
            this.setData({
                eye: '../../images/svg/eye1.svg',
                inputType: 'text'
            })
        } else {
            this.setData({
                eye: '../../images/svg/eye.svg',
                inputType: 'password'
            })
        }
    },
    // 获取短信验证码
    getCode() {
        const that = this
        if (!this.data.mobile) {
            myToast('请输入手机号')
        } else {
            wx.showLoading()
            wx.request({
                url: app.globalData.API + '/findPassword/sendFindPwdCode.htm',
                method: 'POST',
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: {
                    mobile: this.data.mobile,
                    type: 2
                },
                success: res => {
                    const datas = res.data
                    if (datas && datas.success) {
                        myToast('验证码已发送到您的手机，请注意查收')
                        let time = 60,
                            i = 1,
                            start = setInterval(function() {
                                const countDownTime = time - i;
                                if (i > time - 1) {
                                    i = 1;
                                    that.setData({
                                        message: "获取验证码",
                                        codeDisabled: false
                                    })
                                    clearInterval(start);
                                } else {
                                    that.setData({
                                        message: countDownTime + "秒后重发",
                                        codeDisabled: true
                                    })
                                    i++
                                }
                            }, 1000);

                    } else {
                        myToast(datas.resultMsg)
                    }
                    wx.hideLoading()
                },
                complete: res => {}
            })
        }
    },
    reg() {
        if (!this.data.mobile || !mobileValidate(this.data.mobile)) {
            myToast('请输入正确的手机号')
        } else if (!this.data.checkcode) {
            myToast('请输入短信验证码')
        } else if (!pwdValidate(this.data.password)) {
            myToast('请输入正确的新密码')
        } else if (this.data.password != this.data.againPwd) {
            myToast('两次密码输入不一致')
        } else {
            wx.showLoading()
            wx.request({
                url: app.globalData.API + '/findPassword/repassword.htm',
                method: 'POST',
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: {
                    mobile: this.data.mobile,
                    password: this.data.password,
                    pwd: this.data.againPwd
                },
                success: res => {
                    const datas = res.data
                    if (datas.success) {
                        wx.navigateTo({
                            url: '/pages/login/login'
                        })
                    } else {
                        myToast(datas.resultMsg)
                    }
                    wx.hideLoading()
                },
                complete: res => {}
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})