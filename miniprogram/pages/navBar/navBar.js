const app = getApp()
Component({
  options:{
    addGlobalClass:true,
  },
  // 组件的属性列表
  properties:{
    pageName:String,
    isShopMail:{
       type:Boolean,
       value:false
    },

     showScan:{
       type:Boolean,
       value:false
     },

    showBack:{
      type:Boolean,
      value:false
    }
  },

  methods:{
    // 标题弹出选择
    showModal: function () {
       this.triggerEvent('show');
    },
    // 扫描
    scanClick: function(){
       this.triggerEvent("action");
    },
    //  返回
    backClick: function(){
      wx.navigateBack({
        delta:1
      })
    },
  }

})