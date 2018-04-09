//app.js
App({
	onLaunch: function () {
		// 获取系统信息
		wx.getSystemInfo({
			success: res => this.globalData.systemInfo = res
		})
		// 登录 发送 res.code 到后台换取 openId, sessionKey, unionId
		wx.login({
			success: res => {
				let { code } = res;
				if(res.code) {
					console.log("code:          " +code)
					
					// wx.request({
					// 	url: 'http://service.zjzmjr.com/loan/products.htm',
					// 	method: 'POST',
					// 	data: {
					// 		page: 1
					// 	},
					// 	success: res => console.log(res)
					// })
					// wx.request({
					// 	url: 'http://service.zjzmjr.com/yztz_user_login_check.htm',
					// 	method: 'GET',
					// 	data: {
					// 		username : code,
					// 		password : '*****'
					// 	},
					// 	success: res => console.log(res)
					// })
					// wx.request({
					// 	url: 'https://api.weixin.qq.com/sns/jscode2session',
					// 	method: 'GET',
					// 	data: {
					// 		appid: 'wx9844c9cdfb60b20b',
					// 		secret: '5e2a8ad503d865c7c1e52aa09fb17c49',
					// 		js_code: code,
					// 		grant_type: 'authorization_code'
					// 	},
					// 	success: res => console.log(res)
					// })
				}
			}
		})
		// 获取用户信息
		wx.getUserInfo({
			success: res => this.globalData.userInfo = res.userInfo
		})
		// 返回用户已经授权的列表
		wx.getSetting({
			success: res => console.log("返回用户已经授权的列表:" + res.authSetting) 
		})
	},
	globalData: {
		// 全局变量
		userInfo: null,
		systemInfo: null
	}
})