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

// 验证身份证
const IDcardVailidate = card => {
    let num = card.toUpperCase().split(''),                              // 大写/格式化成数组
        ratio = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],  // 前17未对应的系数
        verification = [1, 0, 'X' , 9, 8, 7, 6, 5, 4, 3, 2],            // 最后一位对应值
        type,
        total = 0;

    if (num.length != 18 && num.length != 15) {
        // 位数不对，返回错误信息
        type = false;
    } else {
        if (num.length == 18) {
            for (var i = 0; i < ratio.length; i++) {
                total += Number(ratio[i]) * Number(num[i]);
            }
            // 计算方式：前17位身份证号乘以对应的系数再除以11取余，用余数为索引去取最后一位对应的值，把值与身份证最后一位做比较
            if (verification[total % 11] != num[num.length - 1]) {
                // 末尾验证不过，返回错误信息
               	type = false;
            } else {
            	// 通过
                type = true;
            }
        }
    }
    return type;
}

module.exports = {
	formatTime: formatTime,
	myToast,
	mobileValidate,
	pwdValidate,
	IDcardVailidate
}