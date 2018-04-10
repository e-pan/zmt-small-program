// pages/product/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index: 1,
        imgUrls: [
            'http://prod.service.zjzmjr.com/images/test/pic-1.jpg',
            'http://prod.service.zjzmjr.com/images/test/pic-1.jpg',
            'http://prod.service.zjzmjr.com/images/test/pic-1.jpg'
        ],
        navs: [
            {
                name: '首页',
                icon: 'home',
                active: true,
                page: '/pages/product/list/list'
            },
            {
                name: '订单',
                icon: 'order',
                active: false,
                page: '/pages/order/order/'
            },
            {
                name: '消息',
                icon: 'message',
                active: false,
                page: '/pages/message/message/'
            },
            {
                name: '服务',
                icon: 'service',
                active: false,
                page: '/pages/servie/servie/'
            }
        ]
    },
    detail() {
        wx.navigateTo({
            url: '/pages/product/detail/detail'
        })
    },
    apply() {
        wx.navigateTo({
            url: '/pages/product/apply/apply'
        })
    },
    onNav(e) {
        if (!e.currentTarget.dataset.isactive) {
            wx.navigateTo({
                url: e.currentTarget.dataset.page
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

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