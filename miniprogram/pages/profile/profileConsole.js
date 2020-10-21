const app = getApp();

Page({
  data: {},
  onLoad: function() {
    console.log('page loaded');
  },
  logout: function() {
    console.log('登出了');
    app.globalData.openid = null;

    wx.redirectTo({
      url: '../index/index',
    });
    return;
  },
});
