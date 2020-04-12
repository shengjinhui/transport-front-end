const app = getApp()
let store = app.globalData

Page({
  data: {
    index: 0,
    indexTemp: 0,
    arrayMain: [], 
    arrayTemp: [],
    dirvera:'',
    driverb:'',
    driveraName:'',
    driverbName:'',
    selected1: 'picker',
    selected2: 'picker',
    unloadLocation:[1],
    touch: '',
    peopleList:[],
    headStock: ['皖H09216', '皖HA1816','皖HB5530'],
    semitrailer: ['皖H2662' ,'皖H0868' ,'皖H0512' ,'浙HE761'],
    semitrailerIndex:0,
    headStockIndex:0,
    tonnages: [],
    staff: ['液氧', '液氮', '液氩'],
    staffIndex:0,
    getStaffLocation:'',
    weight: 0
  },
  getStaffLocation(e){
    this.setData({ getStaffLocation:e.detail.value})
    console.log(e.detail.value)
  },
  getWeight(e) {
    this.setData({ weight: Number(e.detail.value).toFixed(2)})
    console.log(this.data.weight)
  },
  formSubmit: function (e) {
    console.log(e);
    let _this = this;
    console.log(this.data.getStaffLocation)
    if (this.data.getStaffLocation.trim().length===0) {
      wx.showModal({
        title: '提示',
        content: '请填写提货地址',
        showCancel: false
      })
      return;
    }
    if(this.data.weight.trim().length===0){
      wx.showModal({
        title: '提示',
        content: '请填写吨数选项',
        showCancel: false
      })
      return;

    }
    
    this.data.unloadLocation.forEach((item)=>{
      if(item.trim().length==0){
        wx.showModal({
          title: '提示',
          content: '请将卸货地址完善',
          showCancel: false
        })
        return false;
      }
    })
    this.data.tonnages.forEach((item)=>{
      if(isNaN(Number(item))){
        wx.showModal({
          title: '提示',
          content: '请填写正确的卸货吨数',
          showCancel: false
        })
        return false;
      }
    })
    let flag=true
    return ( () => {
      console.log('ok')
      console.log(this.data.unloadLocation, this.data.tonnages)
      if(flag){
        flag=false
        wx.request({
          url: store.host + "/boss/releaseTask",
          method: 'GET',
          header: { 'content-type': "json;charset=utf-8", 'Cookie': store.JSESSIONID },
          data:{
            createdBy: store.userId,
            drivera: this.data.arrayMain[this.data.index].id,
            driveraName:this.data.arrayMain[this.data.index].username,
            driverb:this.data.arrayTemp[this.data.indexTemp].id,
            driverbName:this.data.arrayTemp[this.data.indexTemp].username,
            headstock:this.data.headStock[this.data.headStockIndex],
            semitrailer: this.data.semitrailer[this.data.semitrailerIndex],
            goods:this.data.staff[this.data.staffIndex],
            grossTonnage: this.data.weight,
            pickUpPlace: this.data.getStaffLocation,
            places: this.data.unloadLocation,
            tonnages: this.data.tonnages
          },
          success(res) {
            console.log(res.data)
            flag=true;
            if(res.data.code === 0) {
              wx.showModal({
                title: '提示',
                content: '提交成功',
                showCancel:false,
                success(){
                  wx.navigateBack({
                    url: '../driverPage12/driverPage'
                  })
                }
              })
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.msg,
                showCancel: false,
                success() {
                  
                }
              })
            }
          },fail(){
            wx.showModal({
              title: '提示',
              content: '由于网络原因，无法连接服务器',
              showCancel: false,
              success() {
                
              }
            })
          },
          complete(){
            flag = true;
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '正在请求数据中',
          showCancel:false
        })
      }
    })()
  },
  getUnloadWeight(e){
    this.data.tonnages[e.currentTarget.dataset.id] = Number(e.detail.value).toFixed(2);
    console.log(this.data.tonnages);
  },
  bindPickerChange(e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e)
    if(e.detail.value){
      let temp = this.data.peopleList;
      if (e.currentTarget.dataset.id == 0) {
        this.data.peopleList.forEach((item, index) => {
          if (item.id == this.data.arrayMain[e.detail.value].id) {
             /*temp=this.data.peopleList.slice(0, index).concat(this.data.peopleList.slice(index+1, this.data.peopleList.length))
             console.log(temp)*/
            this.setData({ drivera: this.data.arrayMain[e.detail.value].id, driveraName: this.data.arrayMain[e.detail.value].username})
          }
        })
       
        this.setData({
          index: e.detail.value, selected1:''
        })

       
        
      } else if (e.currentTarget.dataset.id == 1) {
        this.data.peopleList.forEach((item, index) => {
          if (item.id == this.data.arrayTemp[e.detail.value].id) {
            /*temp = this.data.peopleList.slice(0, index).concat(this.data.peopleList.slice(index+1, this.data.peopleList.length))*/
            console.log(temp)

            this.setData({ driverb: this.data.arrayTemp[e.detail.value].id,driverbName:this.data.arrayTemp[e.detail.value].username })
          }
        })
       /* if (this.data.arrayTemp[e.detail.value].id<this.data.drivera){
           let key = this.data.index;key++;
           this.setData({index:key})
        }*/

        this.setData({ indexTemp: e.detail.value,selected2: ''});
      } else if (e.currentTarget.dataset.id == 2) {
        console.log(e.detail.value)
        this.setData({ headStockIndex: e.detail.value})
      } else if (e.currentTarget.dataset.id == 3) {
        this.setData({ semitrailerIndex: e.detail.value })
      }
      else if (e.currentTarget.dataset.id == 4) {
        this.setData({ staffIndex: e.detail.value })
      }
    } else {
      this.setData({selected: 'picker'})
    }
    
   
  },
  onLoad: function() {
    console.log("onLoad");
    wx.request({
      url: store.host +"/boss/findDrivers",
      method: 'GET',
      header: { 'content-type': "json;charset=utf-8", 'Cookie': store.JSESSIONID },
      success: (res) => {
        let arr = this.data.arrayMain;
        let arrTemp = this.data.arrayTemp;
        arr.push(...res.data.data);
        arrTemp.push(...res.data.data);
        this.setData({arrayMain: arr, arrayTemp: arrTemp,peopleList: res.data.data})
        console.log(arr)
      }
    })
  },
  addLocation(){
    console.log(123)
    let tmp = this.data.unloadLocation;
    tmp.push(1);
    this.data.tonnages.push(1)
    this.setData({unloadLocation:tmp})
  },
  addClass(){
    this.setData({ touch: 'touch' })

  },
  removeClass(){
    this.setData({ touch: '' })
  },
  getUnloadLocation(e){
    let tmp = this.data.unloadLocation;
    tmp[e.currentTarget.dataset.id]=e.detail.value;
    this.setData({unloadLocation:tmp})
    console.log(tmp);
  },
  delete(e){ 
    let tmpunloadLocation = this.data.unloadLocation;
    let tmptonnages=this.data.tonnages;
    if(tmpunloadLocation.length<=1){
      wx.showModal({
        title: '提示',
        content: '卸货地点不能完全删除',
        showCancel:false
      })
    } else {
      tmpunloadLocation = tmpunloadLocation.slice(0, e.currentTarget.dataset.id).concat(tmpunloadLocation.slice(e.currentTarget.dataset.id + 1, tmpunloadLocation.length));
      console.log(tmptonnages)
      tmptonnages = tmptonnages.slice(0, e.currentTarget.dataset.id).concat(tmptonnages.slice(e.currentTarget.dataset.id + 1, tmptonnages.length));
      this.setData({ unloadLocation: tmpunloadLocation, tonnages: tmptonnages})
      console.log(tmpunloadLocation)
    }
  }
})