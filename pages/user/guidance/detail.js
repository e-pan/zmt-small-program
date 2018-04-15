Page({
    data: {
        question: '',
        answer: ''
    },
    onLoad: function (options) {
        this.setData({
            question: options.question,
            answer: options.answer
        })
    }
})