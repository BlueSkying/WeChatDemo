//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {
      userInfoUrl: 'http://openapi.justbon.cn:8392/members/member',     userJiadouUrl:'http://openapi.justbon.cn/api/scarlettBean/queryScarlettBeam',
    }
  }
})
