let app = getApp();
let store = app.globalData;
import tools from '../../tools.js'
const { appendZero } = tools
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasks: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url:  store.host+'/boss/findCompletedTasks',
      header: { 'content-type': "json;charset=utf-8", 'Cookie': store.JSESSIONID },
      success(res){
        if (res.data&&res.data.data&&res.data.data.length>0){
          res.data.data.forEach((item) => {
            let date = new Date(item.createTime)
            console.log(date)
            item.createTime = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + appendZero(date.getHours()) + ":" + appendZero(date.getMinutes());
          })
          that.setData({ tasks: res.data.data })

        } else {
          wx.showModal({
            title: '提示',
            content: '暂无记录',
            showCancel: false,
            success() {
              wx.navigateBack({
                url: '../drivePage12/drivePage?userType=' + store.userType,
              })
            }
          })
        }
      },
      fail(){
        console.log('失败')
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
  showTaskDetail (e) {
    console.log(e.currentTarget.dataset.elementid)
    let temp = this.data.tasks
    temp = temp.filter((item) => {
      return item.id === e.currentTarget.dataset.elementid
    });
    if (temp.length > 1) {
      wx.showModal({
        title: '提示',
        content: '服务器异常',
        showCancel: false
      })
      throw Error
    }
    store.taskClicked = temp[0];
    
    wx.navigateTo({
      url: '../allInfor/allInfor',
    })
  }
})