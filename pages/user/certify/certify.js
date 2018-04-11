import {
    myToast,
    IDcardVailidate
} from '../../../utils/util'

const app = getApp()
Page({
    data: {
        name: '',
        IDcard: ''
    },
    getName(e) {
        this.setData({
            name: e.detail.value
        })
    },
    getIDcard(e) {
        this.setData({
            name: e.detail.IDcard
        })
    },
    onSubmit() {
        if (!this.data.name) {
            myToast('请输入您的姓名')
        } else if (!this.data.IDcard || !IDcardVailidate(this.data.IDcard)) {
            myToast('请输入正确的身份证号')
        } else {
            wx.showLoading()
            wx.request({
                url: app.globalData.API + '/user/setuser.htm',
                method: 'POST',
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: {
                    name: this.data.name,
                    IDcard: this.data.IDcard
                },
                success: res => {
                    const datas = res.data
                    if (datas.success) {
                        wx.showModal({
                            title: '提示',
                            content: '实名认证成功',
                            success: () => wx.navigateBack()
                        })
                    } else {
                        myToast(datas.resultMsg)
                    }
                },
                complate: res => {
                    wx.hideLoading()
                }
            })
        }
    }
})