import {
	mobileValidate,
	myToast
} from '../../utils/util'

const app = getApp()
Page({
	data: {
		mobile: '',
		password: '',
		eye: '../../images/svg/eye.svg',
		inputType: 'password'
	},
	getMobile(e) {
		this.setData({
			mobile: e.detail.value
		})
	},
	getPwd(e) {
		this.setData({
			password: e.detail.value
		})
	},
	togglePwd() {
		if (this.data.inputType == 'password') {
			this.setData({
				eye: '../../images/svg/eye1.svg',
				inputType: 'text'
			})
		} else {
			this.setData({
				eye: '../../images/svg/eye.svg',
				inputType: 'password'
			})
		}
	},
	onReg() {
		wx.navigateTo({
			url: '/pages/reg/reg'
		})
	},
	onFindPwd() {
		wx.navigateTo({
			url: '/pages/password/login/find'
		})
	},
	submit() {
		if (!this.data.mobile || !mobileValidate(this.data.mobile)) {
			myToast('请输入正确的手机号')
		} else if (!this.data.password) {
			myToast('请输入密码')
		} else {
			wx.showLoading()
			wx.request({
				url: app.globalData.API + '/yztz_user_login_check.htm',
				method: 'POST',
				header: {
					"content-type": "application/x-www-form-urlencoded"
				},
				data: {
					username: this.data.mobile,
					password: this.data.password
				},
				success: res => {
					if (res.statusCode != 200) {
						myToast('请输入正确的用户名和密码')
					} else {
						// 存入sessionId到本地
						wx.setStorageSync('sessionId', res.data.sessionId)
						wx.redirectTo({
							url: '/pages/product/list/list'
						})
					}
				},
				complete: res => wx.hideLoading()
			})
		}
	}
})