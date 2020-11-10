const app = getApp();
Page({
  data: {
    'selected': 1,
    'list': [
      {
        'text': '流水',
        'pagePath': '/pages/records/index',
        'iconPath': '/images/icon_component.png',
        'selectedIconPath': '/images/icon_component_HL.png',
      },
      {
        'text': '记一笔',
        'pagePath': '/pages/addBill/addBill',
        'iconPath': '/images/icon_component.png',
        'selectedIconPath': '/images/icon_component_HL.png',
      },
      {
        'text': '个人中心',
        'pagePath': '/pages/index/index',
        'iconPath': '/images/icon_API.png',
        'selectedIconPath': '/images/icon_API_HL.png',

      },
    ],
  },

  tabChange(e) {
    const data = e.detail;
    const url = data.item.pagePath;
    wx.switchTab({
      url,
    });
    // 设置选中页面
    // 这部分添加的原因防止在切换了tab时候的抖动
    this.setData({
      selected: data.index,
    });

  },
  onGetUserInfo: function(e) {
    console.log(e);
  },

});
