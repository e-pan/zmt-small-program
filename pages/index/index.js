//获取应用实例
const app = getApp()

Page({
	data: {
		status: true
	},
	onLoad: function () {
		// 中转
		if (this.data.status) {
			wx.redirectTo({
				url: '/pages/login/login'
			})
		}
	}
})
