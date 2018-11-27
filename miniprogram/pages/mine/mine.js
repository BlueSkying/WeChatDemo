var app = getApp()
var network = require('../utils/network.js')
Page({
   data:{
       kwidth:0,
       kheight:0,
       headBgUrl: '../../images/my_bg.png',
       headImgUrl: '../../images/my_head.png',
       jiadouBgUrl: '../../images/filter40.png',
       jiadouUrl:'../../images/jiadou_icon.png',
       jiadouArrowUrl:'../../images/jiadou_arrow.png',
       itemArrowUrl:'../../images/ic_next.png',
       nikeName: '生活家',
       resourceName: '生活家,让生活更美好～',
       jiadouCount:'0个',
       mineListInfo:[{
         icon:'../../images/my_icon_01.png',
         text:'我的商场',
       }, {
           icon: '../../images/my_icon_02.png',
           text: '我的嘉豆',
         }, {
           icon: '../../images/my_icon_03.png',
           text: '我的邮包',
         }, {
           icon: '../../images/my_icon_04.png',
           text: '商务合作',
         }, {
           icon: '../../images/my_icon_05.png',
           text: '我的消息',
         }, {
           icon: '../../images/my_icon_06.png',
           text: '我的帖子',
         }, {
           icon: '../../images/my_icon_07.png',
           text: '参加的活动',
         }, {
           icon: '../../images/my_icon_08.png',
           text: '中奖记录',
         }, {
           icon: '../../images/my_icon_09.png',
           text: '房屋管理',
         }, {
           icon: '../../images/my_icon_10.png',
           text: '我的房源',
         }, {
           icon: '../../images/my_icon_11.png',
           text: '意见反馈',
         }, {
           icon: '../../images/my_icon_12.png',
           text: '关于生活家',
         }]
   },

   onLoad:function(e){
      wx.getSystemInfo({
        success: function(res) {
           kwidth:res.windowWidth;
           kheight:res.windowHeight;
        },
      })
     
     this.getUserInfo()
     this.getJiadouInfo()
   },

  getUserInfo:function(){
    let thas = this;
    network.request(app.globalData.userInfoUrl,'post',{'sCommandName': 'getMember', 'sInput': {'ID':'1285858633'}},function(res){
      console.log(res)
      thas.setData({
        nikeName: res['Item']['sNickName'],
        headImgUrl: res['Item']['sHeadImg']
      })
    },function(){
      wx.showToast({
        title: '加载数据失败',
      })
    })
  },
  
  getJiadouInfo: function () {
    let thas = this;
    network.request(app.globalData.userJiadouUrl,'post',{ 'requestData': { 'userId': '1285858633' } }, function (res) {
      console.log(res)
      thas.setData({
        jiadouCount: res['resultData']['total'] + '个',
      })
    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  }, 
  
  cellClick:function(e){
    var index = parseInt(e.currentTarget.dataset.key);
    let title = this.data.mineListInfo[index].text;
    wx.showToast({
      title: title,
    })
  },

  headImgClick:function(e){
    wx.showToast({
      title: '头像被点击',
    })
  }
 
})