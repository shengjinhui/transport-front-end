// pages/success[11]/success.js
let app = getApp();
let store = app.globalData;
let lengthArr = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstLength: '',
    secondLength: [],
    totalLength: '',
    taskId:null,
    originLocation:'',
    getStaffLocation:'',
    totalLength:'',
    destinations:[1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({taskId:options.taskId});
    let destinations = [];

    wx.request({
      url: store.host +'/driver/findPlaceInfo',
      header: { 'content-type': "json;charset=utf-8", 'Cookie': store.JSESSIONID },
      data:{taskId:options.taskId},
      success:(res)=>{
        console.log(res);
        res.data.data.forEach((item)=>{
          if(item.type == 0) {
            this.setData({ originLocation:item.placeName})
          } else if (item.type == 1) {
            this.setData({ getStaffLocation: item.placeName })
          }
          else if (item.type == 2) {
            destinations.push(item);
            this.setData({destinations: destinations })
          }
        })
      },
      fail:(res)=>{
        wx.showModal({
          title: '提示',
          content: '和服务器失去联系',
          showCancel:false
        })
      }
    })
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
  getFirstLength (e) {
    console.log(e.detail.value);
    this.setData({firstLength: Number(e.detail.value)})
  },
  getSecondLength (e) {
    console.log(typeof Number(e.detail.value))
    if (typeof Number(e.detail.value) == 'number' && !isNaN(Number(e.detail.value))) {
      lengthArr[e.currentTarget.dataset.index] = Number(e.detail.value);
      this.setData({ secondLength: lengthArr })
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写数字',
        showCancel: false
      })
    }
    console.log(lengthArr)

  },
  getTotalLength (e){
    this.setData({totalLength:Number(e.detail.value)})
  },
  sendMessage () {
    let arr = []
    arr.push(this.data.firstLength, ...this.data.secondLength)
    let sum = arr.reduce((total, val) => {
      if (typeof val == 'number') {
        return Number(total) + val
      }
    })
    this.setData({totalLength: sum})
    let reg = /[\u4e00-\u9fa50-9]{2,32}/;
    if (reg.test(this.data.originLocation)) {
    } else {
      wx.showModal({
        title: '提示',
        content: '出发地点请控制在2-32字',
        showCancel: false
      })
      return false;
    }
    if(this.data.firstLength >0){
      
      wx.request({
        url: store.host + '/driver/completeTask',
        header: { 'content-type': "json;charset=utf-8", 'Cookie': store.JSESSIONID },
        data: {
          id: this.data.taskId,
          userId: store.userId,
          totalKilometer: this.data.totalLength,
          kilometers: arr,
          departurePlace: this.data.originLocation
        },
        success: (res) => {
          if (res.data.code == 0) {
            wx.showModal({
              title: '提示',
              content: '已完成当前任务',
              showCancel: false,
              success() {
                wx.redirectTo({
                  url: '../drivePage12/drivePage?userType=0',
                })
              }
            })
          } else if (res.data.code == 10) {
            wx.showModal({
              title: '提示',
              content: '您必须是主驾驶才能完成当前任务',
              showCancel: false
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '操作失败',
              showCancel: false
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '填写数据错误',
        showCancel: false
      })
    }
    
  },
  addLocation () {
    let temp = this.data.destinations;
    temp[temp.length] = undefined;
    this.setData({destinations: temp}) 
  },
  getOriginalLocation (e) {
    this.setData({ originLocation: e.detail.value })
  }
})