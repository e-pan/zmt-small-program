import {
    myToast,
    mobileValidate,
    ajax
} from '../../../utils/util'

const app = getApp()
const sessionId = wx.getStorageSync('sessionId')
Page({
    data: {
        mobile: '',
        checkcode: '',
        password: '',
        repassword1: '',
        repassword2: '',
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
    getOldPwd(e) {
        this.setData({
            password: e.detail.value
        })
    },
    getPwd(e) {
        this.setData({
            repassword1: e.detail.value
        })
    },
    getPwdAgain(e) {
        this.setData({
            repassword2: e.detail.value
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
                url: '/user/sendcode.htm',
                method: 'POST',
                sessionId,
                param: {
                    type: 2
                },
                callback: res => {
                    const datas = res.data
                    if (datas.success) {
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
                }
            })
        }
    },
    submit() {
        if (!this.data.mobile || !mobileValidate(this.data.mobile)) {
            myToast('请输入正确的手机号')
        } else if (!this.data.checkcode) {
            myToast('请输入短信验证码')
        } else if (!this.data.password) {
            myToast('请输入原交易密码')
        }  else if (!this.data.repassword1 || !this.data.repassword2) {
            myToast('请输入新交易密码')
        } else if (this.data.repassword1 != this.data.repassword2) {
            myToast('您输入的两次密码不一致')
        } else {
            ajax({
                url: '/user/resetpaypwd.htm',
                method: 'POST',
                sessionId,
                data: {
                    step: 2,
                    password: this.data.password,
                    repassword1: this.data.repassword1,
                    repassword2: this.data.repassword2
                },
                success: res => {
                    const datas = res.data
                    if (datas.success) {
                        myToast('修改成功')
                        setTimeout(() => {
                            wx.navigateBack()
                        }, 1000) 
                    } else {
                        myToast(datas.resultMsg)
                    }
                }
            })
        }
    }
})