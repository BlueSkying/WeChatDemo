var app = getApp()
var _webviewUrl = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    h5Url: app.globalData.h5Url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _webviewUrl = options.webviewUrl;
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
  goBack: function () {
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
      delta: 1,
      success: function () {
        // 返回前一个页面成功
      }
    });
  } 
})