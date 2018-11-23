const app = getApp()

Page({
   data:{
       kwidth:0,
       kheight:0,
       headImgUrl: '../../images/my_bg.png',
   },

   onLoad:function(e){
      wx.getSystemInfo({
        success: function(res) {
           kwidth:res.windowWidth;
           kheight:res.windowHeight;
        },
      })
   },

  headImgClick:function(e){
    wx.showToast({
      title: '头像被点击',
    })
  }
 
})