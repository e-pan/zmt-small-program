Page({
	data: {},
	onLoad: function() {
		setTimeout(() => {
			if (wx.getStorageSync('userInfo')) {
				wx.redirectTo({
					url: '/pages/product/list/list'
				})
			} else {
				wx.redirectTo({
					url: '/pages/login/login'
				})
			}
		}, 1500)
	}
})