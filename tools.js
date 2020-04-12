const toolsFunction = {
  testPhone: (phone) => {
    phone = phone.trim()
    var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (phone.length===0){
      wx.showModal({
        title: '提示',
        content: '请填写用户电话',
        showCancel: false
      })
      return false;
    }
    if (!myreg.test(phone)) {
      return false;
    } else {
      return true;
    }
  },
  testName: (name) => {
    name = name.trim();
    var reg = /[\u4e00-\u9fa5]{2,4}/;
    if(name.length===0){
      wx.showModal({
        title: '提示',
        content: '请填写用户姓名',
        showCancel: false
      })
      return false
    }
    if(!reg.test(name)){
      return false;
    } else {
      return true;
    }
  },
  appendZero(str) {
    if (typeof str ==='string') {
      return str.length === 1 ? '0' + str : str
    }
    return str.toString().length === 1 ? '0' + str : str
  }
}
export default toolsFunction