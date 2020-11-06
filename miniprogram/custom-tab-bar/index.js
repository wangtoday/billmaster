Page({
  data: {
    'selected': 0,
    'list': [
      {
        'text': '嗷嗷sdsds',
        'pagePath': '/pages/index/index',
        'iconPath': '/images/icon_component.png',
        'selectedIconPath': '/images/icon_component_HL.png',
        badge: 'New',
      },
      {
        'pagePath': '/pages/im/im',
        'iconPath': '/images/icon_API.png',
        'selectedIconPath': '/images/icon_API_HL.png',
        'text': '口',
        dot: true,
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

});
