Page({
    data: {
        phoneNum: '0571-85831036'
    },
    // 注册协议
    onAgreement() {
        wx.navigateTo({
            url: '/pages/agreement/agreement'
        })
    },
    // 拨打电话
    phoneCall() {
        wx.makePhoneCall({
            phoneNumber: this.data.phoneNum,
            complete: res => console.log(res)
        })
    }
})