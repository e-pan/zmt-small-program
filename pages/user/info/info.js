const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: ''
  },
  onSetter() {
    wx.navigateTo({
        url: '/pages/user/setter/setter'
    })
  },
  onBill() {
    wx.navigateTo({
        url: '/pages/user/bill/bill'
    })
  },
  onBank() {
    wx.navigateTo({
        url: '/pages/user/bank/bank'
    })
  },
  onGuidance() {
    wx.navigateTo({
        url: '/pages/user/guidance/guidance'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置头像
    this.setData({
        avatar: app.globalData.userInfo.avatarUrl
    })
    // 获取用户信息
    // getUserInfo() {

    // }
    wx.showLoading()
    wx.request({
        url: app.globalData.API + '/userMerchant/user/getUserInfoSum.htm',
        method: 'POST',
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        data: {
            isChoose : 1
        },
        success: res => {
            const datas = res.data
            console.log(datas)
            // if (!res.data.code) {
            //     myToast(data)
            // } else {
            //     wx.redirectTo({url: '/pages/product/list/list'})
            // }
        },
        complete: res => {
            wx.hideLoading()
        }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})