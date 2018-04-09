const global = {
	mobileReg: /^1[3|4|5|7|8|][0-9]{9}$/,
	emailReg: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
	pwdReg: /^([0-9a-zA-Z_]|[~!@#$%^&*\(\)\_\+\=\{\}\[\]\?\/\,\.]){6,20}$/,
	cardReg: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
}

const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

Array.prototype.baoremove = function (index) {
	if (isNaN(index) || index > this.length) {
		return false;
	}
	this.splice(index, 1);
}

// toast 提醒框
const myToast = title => {
	wx.showToast({
		title: title,
		icon: 'none',
		duration: 2000
	})
}

// 验证手机号
const mobileValidate = mobile => {
	return global.mobileReg.test(mobile) ? true : false;
}

// 验证密码
const pwdValidate = pwd => {
	return global.pwdReg.test(pwd) ? true : false;
}

module.exports = {
	formatTime: formatTime,
	myToast,
	mobileValidate,
	pwdValidate
}