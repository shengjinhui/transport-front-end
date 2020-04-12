// pages/allInfor/allInfor.js
const app = getApp();
let store = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskDetails: {
  
    },
    destinations: [1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tar = store.taskClicked;
    let arr = [];
    console.log(tar)
    tar.places.forEach((itemInner) => {
      if (itemInner.type === 2) {
        arr.push(itemInner)
      } else if (itemInner.type === 0) {
        tar.originLocation = itemInner.placeName;
      } else if (itemInner.type === 1) {
        tar.getStaffLocation = itemInner.placeName;
      }
    })
    this.setData({taskDetails: tar, destinations:arr})
    console.log(this.data.destinations)
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

  }
})