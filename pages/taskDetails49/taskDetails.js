let app = getApp();
let store = app.globalData;
import tools from '../../tools.js'
const { appendZero } = tools
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task:null,
    flag: 0//标识当前页面是正在进行任务的页面还是尚未进行任务的页面，0：还没开始进行，1：已经进行
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.hasStart){
      wx.request({
        url: store.host +'/driver/findInProgressTasks',
        header: { 'content-type': "json;charset=utf-8", 'Cookie': store.JSESSIONID },
        data:{
          userId: store.userId
        },
        success:(res)=>{
          console.log(res.data)
          console.log("data:"+res.data.data)
          let date = new Date(res.data.data[0].createTime)
          res.data.data[0].createTime = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + appendZero(date.getHours()) + ":" + appendZero(date.getMinutes()) ;
          res.data.data[0].places.forEach((item) => {
            if (item.type === 1) {
              res.data.data[0].getStaffLocation=item.placeName
            }
            else if (item.type === 2) {
              res.data.data[0].destination = item.placeName
            }
          })
          this.setData({ flag: 1,task:res.data.data[0] })
        }
      })
    }
    else{
      console.log(store.taskClicked)
      this.setData({ task: store.taskClicked })
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
  taskStart() {
    wx.request({
      url: store.host +'/driver/acceptTask',
      header: { 'content-type': "json;charset=utf-8", 'Cookie': store.JSESSIONID },
      data: {
        userId: store.userId,
        taskId: this.data.task.id
      },
      success: (res) => {
        if(res.data.code===0){
          wx.showModal({
            title: '提示',
            content: '成功接取任务！请记录当前仪表盘行驶公里数',
            showCancel:false,
            success(){
              console.log("ok")
              wx.redirectTo({
                url: '../drivePage12/drivePage',
              })
            }
          });
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel:false
          })
        }
      }
    })
  },
  taskFinish(){
     wx.navigateTo({
       url: '../success[11]/success?taskId='+this.data.task.id,
     })
  }
})