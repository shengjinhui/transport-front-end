//index.js
//获取应用实例
import tools from '../../tools.js'
const {testPhone, testName} = tools;
const app = getApp()
const store=app.globalData
console.log(testPhone)
Page({
  data: {
    phone: '',
    name: '',
    url: ''
  },
  onLoad: function (options) {
    console.log(store.host)
    this.data.url = options.userType == 0 ? store.host+'/driver/register' :store.host+'/boss/register'
  },
  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  // 登录 
  login: function () {
    if (!testPhone(this.data.phone)||!testName(this.data.name)) {
      wx.showModal({
        title: '提示',
        content: '个人信息填写不正确',
        showCancel: false
      })
    }
    else {
      var that = this;
      wx.showModal({
        title: '提示',
        content: '是否确认提交',
        success:  (s)=>{
          if (s.confirm) {
            wx.request({                               //将数据发送至后台进行绑定或者校验
              url: this.data.url,
              data: {
                phone: that.data.phone,
                username: that.data.name
              },          //获得学生信息
              method: 'GET',
              header: { 'content-type': "json;charset=utf-8", 'Cookie': store.JSESSIONID },
              fail: function (res) {            //
                wx.showToast({
                  icon: 'none',
                  title: '发送失败',
                })
              },
              success(res){
                if(res.data.data==1){
                  store.hasLogin = true;
                  wx.showModal({
                    title: '提示',
                    content: '注册成功',
                    showCancel: false,
                    success() {
                      wx.navigateBack({
                        url: '../index/index',
                      })
                    }
                  })   
                }
              }
            })
          }
        }
      })
    }
  }
})