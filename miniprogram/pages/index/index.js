//index.js
const app = getApp()
var network = require('../utils/network.js')
var longtitude = ''
var latitude = ''
Page({
  data: {
    navTitle:'生活家',
    avatarUrl: './user-unlogin.png',
    index:1,
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    city:'',
    weather:'',
    limit:'',
    isShowModal:false,
    bnrUrl:[{
      "imgUrl":"../../images/homebannerd@2x.png"
      }, {
        "imgUrl": "../../images/homebannerd@2x.png"
      }, {
        "imgUrl": "../../images/homebannerd@2x.png"
      }, {
        "imgUrl": "../../images/homebannerd@2x.png"
      }],
    btnUpArray:[{
        "funcName":"一键开门","realName": "../../images/homebannerd@2x.png"
    }, {
        "funcName": "一键开门", "realName": "../../images/homebannerd@2x.png"
      }, {
        "funcName": "一键开门","realName": "../../images/homebannerd@2x.png"
      }, {
        "funcName": "一键开门", "realName": "../../images/homebannerd@2x.png"
      }],
    btnDownArray:[{
          "funcName": "一键开门", "realName": "../../images/homebannerd@2x.png"
        }, {
          "funcName": "一键开门", "realName": "../../images/homebannerd@2x.png"
        }, {
        "funcName": "一键开门", "realName": "../../images/homebannerd@2x.png"
        }, {
          "funcName": "一键开门", "realName": "../../images/homebannerd@2x.png"
      }],
    shopMailArray:[],
    houseInfoArray:[],  
  },
  
  onSlideChangeEnd: function (e) {
    var that = this;
    that.setData({
      index: e.detail.current + 1
    })
  },

  scanClick: function (e) {
    wx.navigateTo({
      url: '../scan/scan',
    })
  },

  showModal: function(e){
    this.getBindHouse()
  },
  
  hide: function(e){
    this.setData({
      isShowModal:false
    })
  },
  
  houseClick: function(e){
    var index = parseInt(e.currentTarget.dataset.key);
    let title = this.data.houseInfoArray[index].projectName;
    this.setData({
      navTitle:title
    })
  },

  onSwiperTap: function(e){
    let h5url = this.data.bnrUrl[this.data.index].url;
    app.globalData.h5Url = h5url;
    wx.navigateTo({
      url: '../shopMailDetail/shopMailDetail',
    })
  },

  onReady:function(){
    let thas = this;
    wx.getLocation({
      success: function (res) {
        console.log(res)
        longtitude = String(res.longitude);
        console.log(longtitude)
        latitude = String(res.latitude)
        console.log(latitude)
        thas.getWeather()
      },
    })
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    this.getProjectAds()
    this.getUserBtn()
    this.getProjectHotAds()
  },
  
  getProjectAds:function(){
    let thas = this;
    network.request(app.globalData.userProjectAds, 'post', {'type': 'index', 'projectId':'38562569'}, function (res) {
      // console.log(res)
      thas.setData({
        bnrUrl : res['ads']
      })
    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  },
  
  getUserBtn:function(){
    let thas = this;
    network.request(app.globalData.userBtnUrl, 'get','', function (res) {
      var dataArray = res['top']
      thas.setData({
        btnUpArray : dataArray.slice(0,4),
        btnDownArray: dataArray.slice(4,8),
      })
    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  },
  
  getWeather:function(){
    let thas = this;
    var location = longtitude + ',' + latitude
    console.log(location)
    network.request(app.globalData.weatherUrl, 'post', { 'location': (longtitude + ',' + latitude)}, function (res) {
      console.log(res)
      thas.setData({
        city:res['city'],
        weather: res['weather'] + res['temperature'],
        limit:'今日限行  ' + res['xx']['xxnum']
      })
    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  },

  getProjectHotAds: function () {
    let thas = this;
    network.request(app.globalData.userProjectHotAds, 'post', {'projectId': '38562569'}, function (res) {
      console.log(res)
      thas.setData({
        shopMailArray: res['ad']
      })
    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  }, 

  getBindHouse: function(){
    let thas = this;
    network.request(app.globalData.houseInfoUrl, 'post', { 'contactid': '1285858633' }, function (res) {
      console.log(res)
      thas.setData({
        isShowModal: true,
        houseInfoArray: res['data']
      })
    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
