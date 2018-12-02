var app = getApp()
var _webviewUrl = null;
Page({
  data:{
    h5Url:'http://mall.justbon.com.cn/m/project.html?uid=1285858633&userToken=CA1FC79A7910241C1479B3ABADD1EB2B'
  },

  onLoad: function (options) {
    var that = this;
    that.setData({
      h5Url: options.h5url
    })
    _webviewUrl = options.webviewUrl;
  },

  goBack:function(){
    var pages = getCurrentPages(); // 当前页面  
    var beforePage = pages[pages.length - 2]; // 前一个页面 
    var url;
    if (_webviewUrl != null) {
      url = _webviewUrl; // 前一个页面当前url
    } else {
      url = beforePage.data.h5Url; // 前一个页面当前加载的url
    }
    beforePage.setData({
      h5Url: url + "?t=1"
    })
    // 两次setData，达到刷新bindUrl的目的
    wx.navigateBack({
      success: function () {
        // 返回前一个页面成功
      }
    });
  }
})