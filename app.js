//app.js
import config from './config.js'
const {host} = config
console.log(host)
App({
  onLaunch: function () {
    
  },
  globalData: {
    userInfo: null,
    host,
    JSESSIONID: null,
    userType: 0,
    userId: null,
    hasLogin: true,
    taskClicked:{},    //用户查看详情的task
    processingTask:{}  //司机准备完成的task

  }
})