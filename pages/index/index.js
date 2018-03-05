//获取应用实例
const app = getApp()

Page({
	data: {
		status: true
	},
	onLoad: function () {
		console.log("index onload")
		console.log(app.globalData)
		console.log(app.globalData.userInfo)

		const param = {
			userName: '18257103327',
			password: 'a123456',
			checkCode: ''
		}
		let { userName, password, checkCode } = param;
		console.log(userName)
		console.log(password)
		console.log(checkCode)

		// 登录系统
		wx.request({
			url: 'https://service.zjzmjr.com/yztz_user_login_check.htm',
			data: {
				userName: userName,
				password: password,
				checkCode: checkCode
			},
			method: 'POST',
			complete: res => {
				console.log(res)
			}
		})

		// 中转
		if (this.data.status) {
			wx.redirectTo({
				url: '/pages/agent/agent'
			})
		}
	}
})
