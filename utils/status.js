const webStatus = webStatus  => {
    var status = "";
    switch (webStatus) {
        case 10:
            status = "征信中";
            break;
        case 500:
            status = "草稿";
            break;
        case 510:
            status = "不符合要求";
            break;
        case 520:
            status = "再申请审核中";
            break;
        case 530:
            status = "征信通过, 审核中";
            break;
        case 540:
            status = "待更新";
            break;
        case 550:
            status = "待追加";
            break;
        case 560:
            status = "待确认";
            break;
        case 570:
            status = "待确认";
            break;
        case 80:
            status = "待确认";
            break;
        case 90:
            status = "待确认";
            break;
        case 580:
            status = "更换银行审核";
            break;
        case 130:
            status = "待放款";
            break;
        case 190:
            status = "待收费";
            break;
        case 140:
            status = "已放款";
            break;
        case 590:
            status = "待抵押";
            break;
        case 600:
            status = "还款中";
            break;
        case 610:
            status = "结清中";
            break;
        case 620:
            status = "还款完成";
            break;
        case 50:
            status = "征信未通过";
            break;
        case 110:
            status = "审核未通过";
            break;
        case 160:
            status = "已全额退资";
            break;
        case 630:
            status = "拒绝再申请";
            break;
        default:
            break;
    }
    return status;
}

module.exports = {
    webStatus
}