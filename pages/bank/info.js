import { myToast } from '../../utils/util'

const app = getApp()
Page({
    data: {
        name: '',
        bankCard: '',
        type: ''  // edit编辑  add添加
    },
    getName(e) {
        this.setData({
            name: e.detail.value
        })
    },
    getBandCadr(e) {
        this.setData({
            bankCard: e.detail.value
        })
    },
    formSubmit(e) {
        console.log(e.detail.value)
        const that = this
        if (!e.detail.value.name) {
            myToast('请输入持卡人姓名')
        } else if (!e.detail.value.bandCard) {
            myToast('请输入银行卡号')
        } else {
            wx.showLoading()
            wx.request({
                url: app.globalData.API + '/repayment/user/bindBank.htm',
                method: 'POST',
                data: {
                    bankCard: e.detail.value.bandCard,
                    transactionType: 15
                },
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: res => {
                    console.log(res)
                    const datas = res.data
                    if (datas.success) {
                        that.bindCard(datas)
                    } else {
                        myToast(datas.resultMsg)
                    }
                },
                complate: res => {
                    wx.hideLoading()
                }
            })
        }
    },
    // 跳转到连连进行银行卡验证绑定
    bindCard(data) {
        console.log(data)
        const formData = data.value
        wx.request({
            url: data.url,
            data: formData,
            method: 'POST',
            head: {
                'Content-Type': 'application/json'
            },
            success: res => {
                console.log(res);
            }
        })
    },
    onLoad: options => {
        console.log(options)
        this.data.type = options.type
    }
})