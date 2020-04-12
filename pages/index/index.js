let app = getApp()
let store = app.globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backgroundImg:'images/backgroundImg.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  toDriver() {
    store.userType = '0'
    wx.login({
      success: res => {
        wx.request({
          url: store.host + '/driver/login',
          data: {
            code: res.code
          },
          success: (res) => {
            console.log(res.data.data)
            store.JSESSIONID = "JSESSIONID=" + res.data.data.sessionId;
            store.userId = res.data.data.userId
            if (res.data.code !== 0) {
              store.hasLogin = false;
              wx.navigateTo({
                url: '../registry/registry?userType=0',
              })
            }
            else {
              store.userType = 0;
              wx.redirectTo({
                url: '../drivePage12/drivePage?userType=0',
              })
            }
          }, fail() {
            console.log('失败')
          }
        })
      }
    })
    
  },
  toBoss() {
    app.globalData.userType = '1'
    wx.login({
      success: res => {
        wx.request({
          url: store.host + '/boss/login',
          data: {
            code: res.code
          },
          success: (res) => {
            console.log(res.data.data)
            getApp().globalData.JSESSIONID = "JSESSIONID=" + res.data.data.sessionId;
            getApp().globalData.userId = res.data.data.userId
            if (res.data.code !== 0) {
              store.hasLogin = false;
              wx.navigateTo({
                url: '../registry/registry?userType=1',
              })
            }
            else {
              store.userType=1;
              wx.redirectTo({
                url: '../drivePage12/drivePage?userType=1',
              })
            }
          }, fail() {
            console.log('失败')
          }
        })
      }
    })
    
  }
})