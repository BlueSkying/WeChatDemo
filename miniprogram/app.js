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
      userJiadouUrl: 'http://openapi.justbon.cn/api/scarlettBean/queryScarlettBeam',
      userInfoUrl: 'http://openapi.justbon.cn:8392/members/member',       
      userBtnUrl: 'http://weblink.justbon.com/getPicByRoleIdAndType.action?roleid=role_30',
      userProjectAds: 'https://jcp.justbon.com/api/ads',
      userProjectHotAds: 'https://jcp.justbon.com/api/frontAd',
      weatherUrl: 'http://api.justbon.com/weather/queryWeatherInfo.json',
      houseInfoUrl:'https://jcp.justbon.com/api/commons/getBindHouseInfo',
      h5Url: 'http://mall.justbon.com.cn/m/project.html?uid=1285858633&userToken=CA1FC79A7910241C1479B3ABADD1EB2B'
    }
  }
})
