import {
    myToast,
    mobileValidate,
    pwdValidate,
    IDcardVailidate,
    ajax
} from '../../../utils/util'

const app = getApp()
const sessionId = wx.getStorageSync('sessionId')
Page({
    data: {
        IDcard: '',
        mobile: '',
        checkcode: '',
        paypassword: '',
        repaypassword: '',
        message: '获取验证码',
        codeDisabled: false
    },
    getIDcard(e) {
        this.setData({
            IDcard: e.detail.value
        })
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
            paypassword: e.detail.value
        })
    },
    getPwdAgain(e) {
        this.setData({
            repaypassword: e.detail.value
        })
    },
    // 获取短信验证码
    getCode() {
        const that = this
        if (!this.data.mobile) {
            myToast('请输入手机号')
        } else if (!mobileValidate(this.data.mobile)) {
            myToast('请输入正确的手机号')
        } else {
            ajax({
                url: '/user/paycode.htm',
                method: 'POST',
                param: {
                    type : 2
                },
                sessionId,
                callback: data => {
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
                }
            })
        }
    },
    submit() {
        if (!this.data.IDcard || !IDcardVailidate(this.data.IDcard)) {
            myToast('请输入正确的身份证号')
        } else if (!this.data.mobile || !mobileValidate(this.data.mobile)) {
            myToast('请输入正确的手机号')
        } else if (!this.data.checkcode) {
            myToast('请输入短信验证码')
        } else if (!this.data.paypassword || !this.data.repaypassword) {
            myToast('请输入交易密码')
        } else if (this.data.paypassword != this.data.repaypassword) {
            myToast('您输入的两次密码不一致')
        } else {
            ajax({
                url: '/user/setpaypwd.htm',
                method: 'POST',
                sessionId,
                param: {
                    step: 1,
                    IDcard: this.data.IDcard,
                    checkcode: this.data.checkcode
                },
                callback: data => {
                    console.log(data)
                    if (data.success) {
                        myToast('设置成功')
                        setTimeout(() => {
                            wx.navigateBack()
                        }, 1000)                        
                    } else {
                        myToast(data.resultMsg)
                    }
                }
            });
        }
    }
})