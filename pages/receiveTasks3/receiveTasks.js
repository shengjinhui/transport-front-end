import tools from '../../tools.js'
const {appendZero} = tools
let app = getApp();
let store = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasks:[],
    tasksWithMode: [],
    mode: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '数据获取中'
    })
    if(options.userType==null||options.userType.trim()==''||options.userType==undefined){
      if (options.withMode == "false") {
        wx.setNavigationBarTitle({
          title: '任务领取',
        })
        wx.request({
          url: store.host + '/driver/findNoAcceptedTasks?userId=' + store.userId,
          header: { 'content-type': "json;charset=utf-8", 'Cookie': store.JSESSIONID },
          success: (res) => {
            let data = res.data.data;
            console.log(data)
            if (data == null||data.length==0) {
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '暂无记录',
                showCancel: false,
                success() {
                  wx.navigateTo({
                    url: '../drivePage12/drivePage?userType=' + store.userType,
                  })
                }
              })
            } else {
              data.forEach((item) => {
                let date = new Date(item.createTime)
                item.createTime = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + appendZero(date.getHours()) + ":" + appendZero(date.getMinutes())
                item.places.forEach((itemInner) => {
                  if (itemInner.type === 2) {
                    item.destination = itemInner.placeName.slice(4);
                  } else if (itemInner.type === 0) {
                    item.originLocation = itemInner.placeName.slice(4);
                  } else if (itemInner.type === 1) {
                    item.getStaffLocation = itemInner.placeName.slice(4);
                  }
                })
              })
              this.setData({ tasks: data });
              wx.hideLoading();
            }

          }
        })
      } else {
        console.log('its')
        wx.setNavigationBarTitle({
          title: '任务列表',
        })
        wx.request({
          url: store.host + '/driver/findAllTasks?userId=' + store.userId,
          header: { 'content-type': "json;charset=utf-8", 'Cookie': store.JSESSIONID },
          success: (res) => {
            let data = res.data.data;
            if (data === null) {
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '暂无记录',
                showCancel: false,
                success() {
                  wx.navigateTo({
                    url: '../drivePage12/drivePage?userType=' + store.userType,
                  })
                }
              })
            } else {
              data.forEach((item) => {
                let date = new Date(item.createTime)
                item.createTime = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + appendZero(date.getHours()) + ":" + appendZero(date.getMinutes())
                item.places.forEach((itemInner) => {
                  console.log(itemInner)
                  if (itemInner.type === 2) {
                    item.destination = itemInner.placeName;
                  } else if (itemInner.type === 0) {
                    item.originLocation = itemInner.placeName;
                  } else if (itemInner.type === 1) {
                    item.getStaffLocation = itemInner.placeName;
                    
                  }
                })
              })
              this.setData({ tasksWithMode: data });
              wx.hideLoading();
            }

          }
        })
      }
    }
   else if(options.userType == 1) {
      wx.request({
        url: store.host + '/boss/findTaskState',
        header: { 'content-type': "json;charset=utf-8", 'Cookie': store.JSESSIONID },
        success: (res) => {
          let data = res.data.data;
          if (data === null) {
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: '暂无记录',
              showCancel: false,
              success() {
                wx.navigateTo({
                  url: '../drivePage12/drivePage?userType=' + store.userType,
                })
              }
            })
          } else {
            data.forEach((item) => {
              let date = new Date(item.createTime)
              item.mode = item.state==0?"未进行":item.state==1?"正在进行":'已完成'
              item.createTime = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + appendZero(date.getHours()) + ":" + appendZero(date.getMinutes())
              item.places.forEach((itemInner) => {
                console.log(itemInner)
                if (itemInner.type === 2) {
                  // 卸货地址
                  item.destination = itemInner.placeName
                } else if (itemInner.type === 0) {
                  //出发地点
                  item.originLocation = itemInner.placeName
                } else if (itemInner.type === 1) {
                  //提货地点
                  item.getStaffLocation = itemInner.placeName
                }
              })
            })
            this.setData({ tasksWithMode: data });
            console.log(this.data.tasksWithMode)
            wx.hideLoading();
          }

        }
      })
   }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  showTaskDetail(e) {
    let temp = this.data.tasks
    temp=temp.filter((item)=> {
      return item.id === e.currentTarget.dataset.elementid
    });
    if(temp.length>1){
      wx.showModal({
        title: '提示',
        content: '服务器异常',
        showCancel: false
      })
      throw Error
    } 
    store.taskClicked = temp[0];
    wx.navigateTo({
      url: '../taskDetails49/taskDetails',
    })
    
  },
  showTaskDetailTmp (e) {
    let temp = this.data.tasksWithMode
    temp = temp.filter((item) => {
      console.log(item.id === e.currentTarget.dataset.elementid)
      return item.id === e.currentTarget.dataset.elementid
    });
    console.log(temp)
    if (temp.length > 1) {
      wx.showModal({
        title: '提示',
        content: '服务器异常',
        showCancel: false
      })
      throw Error
    }
    console.log(temp[0])
    store.taskClicked = temp[0];
    wx.navigateTo({
      url: '../allInfor/allInfor',
    })
  }
})