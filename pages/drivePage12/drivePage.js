// pages/drivePage/drivePage.js
const app = getApp();
let store = app.globalData;
let flag = null;
let i = true;                

Page({

  /**
   * 页面的初始数据
   */
  data: {
    task:'开始任务',
    state:'正在进行'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if ( options.userType === "1" ) {
      this.setData({task: '发布任务', state: '任务状态'})
    }
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
  task () {
    return  (() => {
      clearTimeout(flag);
      flag = setTimeout(() => {
        let i = 0;
        console.log(i++)
        if (store.userType == 0) {
          wx.navigateTo({
            url: '../receiveTasks3/receiveTasks?withMode=' + false,
          })
        } else {
          wx.navigateTo({
            url: '../releaseTask6/releaseTask',
          })
        }
      }, 20)
    })()
  },
  state () {
    if (store.userType==0) {
      wx.navigateTo({
        url: '../taskDetails49/taskDetails?hasStart=1',
      })
    } else {
      wx.navigateTo({
        url: '../receiveTasks3/receiveTasks?withMode='+true+"&&userType=1",
      })
    }
  },
  record () {
    wx.navigateTo({
      url: '../taskRecord5/taskRecord'
    })
  }
})