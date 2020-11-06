Page({
  data: {
    "selected": 0,
    "list": [{
        "pagePath": "/pages/index/index",
        "iconPath": "/images/icon_component.png",
        "selectedIconPath": "/images/icon_component_HL.png",
        "text": "嗷嗷sdsds"
      },
      {
        "pagePath": "/pages/im/im",
        "iconPath": "/images/icon_API.png",
        "selectedIconPath": "/images/icon_API_HL.png",
        "text": "口"
      }
    ]
  },
  
    tabChange(e) {

      console.log(e.currentTarget);
      
      const data = e.detail;
      const url = data.item.pagePath

      console.log(data.index);

     
      wx.switchTab({
        url
      })

      this.setData({
        selected: data.index
      })

    }
  

});