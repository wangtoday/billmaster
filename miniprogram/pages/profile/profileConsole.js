const app = getApp();

Page({
  data: {},
  onLoad: function() {
    //  进入的时候, 获取用户的数据,
    // 包含

  },
  logout: function() {
    app.globalData.userInfo = {}; // 清空 global 中的 userInfo 信息
    wx.navigateBack();
    return;
  },
});
